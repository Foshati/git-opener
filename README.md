<p align="center">
  <img src="./res/icon.png" height="128"/>
</p>

<h1 align="center">Git Opener</h1>

<p align="center">
  <strong>Open any Git repository in browser with one click</strong>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=Foshati.git-opener">
    <img src="https://img.shields.io/visual-studio-marketplace/v/Foshati.git-opener.svg?color=blue&label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="VS Code Marketplace"/>
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=Foshati.git-opener">
    <img src="https://img.shields.io/visual-studio-marketplace/d/Foshati.git-opener.svg?color=green" alt="Downloads"/>
  </a>
  <a href="https://github.com/Foshati/git-opener/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-orange.svg" alt="License"/>
  </a>
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔗 **Multi-Platform** | GitHub, GitLab, Gitea, Bitbucket, Codeberg, SourceHut & more |
| ⚡ **Self-Contained** | No dependencies on other extensions |
| 🔍 **Auto-Detect** | Automatically detects remote type and platform |
| 🖱️ **Status Bar Button** | One-click to open repository in browser |
| 📁 **Multi-Repo** | Supports projects with multiple Git remotes |
| 📄 **Open File** | Open current file at specific line in browser |

## 📦 Installation

1. Open **VS Code**
2. Go to **Extensions** (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for **"Git Open"**
4. Click **Install**

Or install via command palette:
```
ext install fa.git-open
```

## 🚀 Usage

### Status Bar
Click the **Git branch icon** in the status bar to open the repository in your browser.

### Command Palette
- `Git Open: Open Repository in Browser` - Opens the repository
- `Git Open: Open Current File in Browser` - Opens current file with line number

### Keyboard Shortcuts
You can add custom keybindings in `keybindings.json`:
```json
{
  "key": "ctrl+shift+g o",
  "command": "git-open.openRepo"
}
```

## ⚙️ Configuration

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `git-open.statusBar.enabled` | boolean | `true` | Show button in status bar |
| `git-open.statusBar.alignment` | string | `"left"` | Button alignment (`left` or `right`) |
| `git-open.statusBar.priority` | number | `0` | Button priority (higher = more left) |
| `git-open.preferHttps` | boolean | `true` | Use HTTPS instead of HTTP |

## 🌐 Supported Platforms

- ✅ GitHub
- ✅ GitLab (including self-hosted)
- ✅ Gitea / Forgejo
- ✅ Bitbucket
- ✅ Codeberg
- ✅ SourceHut
- ✅ Azure DevOps
- ✅ Any Git server with web interface

## 📸 Demo

![Git Open Demo](./res/demo.png)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

[MIT](./LICENSE) License © 2024

---

<p align="center">
  Made with ❤️ for developers
</p>
