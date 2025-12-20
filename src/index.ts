import type { GitExtension, Repository } from './types/vscode.git'
import { commands, env, extensions, StatusBarAlignment, Uri, window, workspace } from 'vscode'
import { convertSshToHttp } from './utils'

/**
 * Get status bar alignment from configuration
 */
function getAlignment(): StatusBarAlignment {
  const config = workspace.getConfiguration('git-open.statusBar')
  const alignment = config.get<string>('alignment', 'left')
  return alignment === 'right' ? StatusBarAlignment.Right : StatusBarAlignment.Left
}

/**
 * Get status bar priority from configuration
 */
function getPriority(): number {
  const config = workspace.getConfiguration('git-open.statusBar')
  return config.get<number>('priority', 0)
}

/**
 * Check if status bar is enabled
 */
function isStatusBarEnabled(): boolean {
  const config = workspace.getConfiguration('git-open.statusBar')
  return config.get<boolean>('enabled', true)
}

/**
 * Get HTTPS preference from configuration
 */
function preferHttps(): boolean {
  const config = workspace.getConfiguration('git-open')
  return config.get<boolean>('preferHttps', true)
}

/**
 * Get Git extension API
 */
function getGitExtension(): GitExtension | undefined {
  return extensions.getExtension<GitExtension>('vscode.git')?.exports
}

/**
 * Get remote URL from repository
 */
function getRemoteUrl(repo: Repository): string | undefined {
  if (repo.state.remotes.length === 0) {
    return undefined
  }

  // Prefer 'origin' remote, fallback to first remote
  const origin = repo.state.remotes.find(r => r.name === 'origin')
  const remote = origin || repo.state.remotes[0]

  return remote.fetchUrl || remote.pushUrl
}

/**
 * Open repository in browser
 */
async function openRepository(): Promise<void> {
  try {
    const gitExtension = getGitExtension()

    if (!gitExtension) {
      window.showErrorMessage('Git Open: Git extension not found')
      return
    }

    const api = gitExtension.getAPI(1)

    if (api.repositories.length === 0) {
      window.showWarningMessage('Git Open: No Git repository found')
      return
    }

    // If multiple repos, let user choose
    let repo: Repository
    if (api.repositories.length === 1) {
      repo = api.repositories[0]
    }
    else {
      const items = api.repositories.map(r => ({
        label: r.rootUri.fsPath.split('/').pop() || r.rootUri.fsPath,
        description: r.rootUri.fsPath,
        repo: r,
      }))

      const selected = await window.showQuickPick(items, {
        placeHolder: 'Select repository to open',
      })

      if (!selected)
        return
      repo = selected.repo
    }

    const remoteUrl = getRemoteUrl(repo)

    if (!remoteUrl) {
      window.showWarningMessage('Git Open: No remote found')
      return
    }

    const httpUrl = convertSshToHttp(remoteUrl, preferHttps())
    await env.openExternal(Uri.parse(httpUrl))
  }
  catch (error) {
    window.showErrorMessage(`Git Open: ${(error as Error).message}`)
  }
}

/**
 * Open current file in browser
 */
async function openFile(): Promise<void> {
  try {
    const editor = window.activeTextEditor
    if (!editor) {
      window.showWarningMessage('Git Open: No active file')
      return
    }

    const gitExtension = getGitExtension()
    if (!gitExtension) {
      window.showErrorMessage('Git Open: Git extension not found')
      return
    }

    const api = gitExtension.getAPI(1)
    const fileUri = editor.document.uri

    // Find repository for current file
    const repo = api.repositories.find(r =>
      fileUri.fsPath.startsWith(r.rootUri.fsPath),
    )

    if (!repo) {
      window.showWarningMessage('Git Open: File is not in a Git repository')
      return
    }

    const remoteUrl = getRemoteUrl(repo)
    if (!remoteUrl) {
      window.showWarningMessage('Git Open: No remote found')
      return
    }

    // Get relative path
    const relativePath = fileUri.fsPath.replace(`${repo.rootUri.fsPath}/`, '')

    // Get current branch
    const branch = repo.state.HEAD?.name || 'main'

    // Build file URL
    let baseUrl = convertSshToHttp(remoteUrl, preferHttps())
    // Remove .git suffix if present
    baseUrl = baseUrl.replace(/\.git$/, '')

    // Construct file URL (works for GitHub, GitLab, Gitea, etc.)
    const fileUrl = `${baseUrl}/blob/${branch}/${relativePath}`

    // Add line number if there's a selection
    const line = editor.selection.active.line + 1
    const urlWithLine = `${fileUrl}#L${line}`

    await env.openExternal(Uri.parse(urlWithLine))
  }
  catch (error) {
    window.showErrorMessage(`Git Open: ${(error as Error).message}`)
  }
}

export function activate() {
  // Register commands
  commands.registerCommand('git-open.openRepo', openRepository)
  commands.registerCommand('git-open.openFile', openFile)

  // Create status bar item if enabled
  if (isStatusBarEnabled()) {
    const statusBar = window.createStatusBarItem(getAlignment(), getPriority())
    statusBar.command = 'git-open.openRepo'
    statusBar.text = '$(link-external)'
    statusBar.color = '#F96C4B'
    statusBar.tooltip = 'Git Opener: Open repository in browser'
    statusBar.show()
  }
}

export function deactivate() {}
