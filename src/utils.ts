/**
 * Convert Git SSH URL to HTTP(S) URL
 * Supports GitHub, GitLab, Gitea, Bitbucket, Codeberg, SourceHut and more
 *
 * @param sshUrl - SSH format Git remote URL
 * @param useHttps - Whether to use HTTPS protocol, defaults to true
 * @returns HTTP(S) format URL
 *
 * @example
 * // GitHub
 * convertSshToHttp('git@github.com:user/repo.git')
 * // Returns: 'https://github.com/user/repo'
 *
 * // GitLab
 * convertSshToHttp('git@gitlab.com:user/repo.git')
 * // Returns: 'https://gitlab.com/user/repo'
 *
 * // Custom domain (Gitea, etc.)
 * convertSshToHttp('git@git.example.com:user/repo.git')
 * // Returns: 'https://git.example.com/user/repo'
 *
 * // With port
 * convertSshToHttp('ssh://git@github.com:22/user/repo.git')
 * // Returns: 'https://github.com/user/repo'
 */
export function convertSshToHttp(sshUrl: string, useHttps: boolean = true): string {
  // Trim whitespace
  sshUrl = sshUrl.trim()

  // Handle already HTTP(S) URLs
  if (sshUrl.startsWith('http://') || sshUrl.startsWith('https://')) {
    // Remove .git suffix for cleaner URLs
    return sshUrl.replace(/\.git$/, '')
  }

  const protocol = useHttps ? 'https' : 'http'
  let host: string
  let path: string

  // Match ssh:// protocol format: ssh://git@host:port/path
  const sshProtocolMatch = sshUrl.match(/^ssh:\/\/(?:[^@]+@)?([^:/]+)(?::\d+)?\/(.*)$/)
  if (sshProtocolMatch) {
    host = sshProtocolMatch[1]
    path = sshProtocolMatch[2]
    // Remove .git suffix
    path = path.replace(/\.git$/, '')
    return `${protocol}://${host}/${path}`
  }

  // Match standard SCP format: git@host:path or user@host:path
  const scpMatch = sshUrl.match(/^(?:[^@]+@)?([^:]+):(.+)$/)
  if (scpMatch) {
    host = scpMatch[1]
    path = scpMatch[2]

    // Remove leading slashes
    path = path.replace(/^\/+/, '')
    // Remove .git suffix
    path = path.replace(/\.git$/, '')

    return `${protocol}://${host}/${path}`
  }

  // If nothing matches, throw error
  throw new Error(`Unable to parse SSH URL: ${sshUrl}`)
}

/**
 * Detect Git platform from URL
 * 
 * @param url - Git remote URL
 * @returns Platform name or 'unknown'
 */
export function detectPlatform(url: string): string {
  const lowerUrl = url.toLowerCase()
  
  if (lowerUrl.includes('github.com')) return 'github'
  if (lowerUrl.includes('gitlab.com') || lowerUrl.includes('gitlab')) return 'gitlab'
  if (lowerUrl.includes('bitbucket.org') || lowerUrl.includes('bitbucket')) return 'bitbucket'
  if (lowerUrl.includes('gitea') || lowerUrl.includes('forgejo')) return 'gitea'
  if (lowerUrl.includes('codeberg.org')) return 'codeberg'
  if (lowerUrl.includes('sr.ht') || lowerUrl.includes('sourcehut')) return 'sourcehut'
  if (lowerUrl.includes('azure.com') || lowerUrl.includes('visualstudio.com')) return 'azure'
  
  return 'unknown'
}
