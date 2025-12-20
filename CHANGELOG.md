# Changelog

All notable changes to the "Git Opener" extension will be documented in this file.

## [1.1.5] - 2025-12-20

### Fixed
- ⌨️ **Keyboard shortcuts now work everywhere** (removed `editorTextFocus` restriction)
  - Previously only worked when editor was focused
  - Now works in sidebar, explorer, terminal, etc.

## [1.1.4] - 2025-12-20

### Added
- 🚀 Automatic publishing to VS Code Marketplace and Open VSX
- 📦 GitHub Releases with downloadable VSIX files

### Changed
- ⚙️ Improved CI/CD pipeline with full automation

## [1.1.3] - 2025-12-20

### Fixed
- ⌨️ Keyboard shortcuts updated:
  - `Ctrl+Alt+G` / `Ctrl+Cmd+G` → Open Repository
  - `Ctrl+Alt+F` / `Ctrl+Cmd+F` → Open File

### Changed
- 📁 Project restructured (src/types/, public/)
- 📖 Added manual installation instructions

## [1.1.2] - 2025-12-20

### Fixed
- ⌨️ Fixed keyboard shortcuts (were conflicting with VS Code defaults)

## [1.1.1] - 2025-12-20

### Changed
- 📁 Reorganized project structure (src/types/, public/)

## [1.1.0] - 2025-12-20

### Added
- ⌨️ Built-in keyboard shortcuts
- 📝 CHANGELOG.md

## [1.0.1] - 2025-12-20

### Changed
- Updated status bar icon to `$(link-external)` with orange color

## [1.0.0] - 2025-12-20

### Added
- 🔗 Open any Git repository in browser
- 📁 Multi-remote support
- 📄 Open file at specific line
- ⚙️ Configurable status bar
