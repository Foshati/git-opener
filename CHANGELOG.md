# Changelog

All notable changes to the "Git Opener" extension will be documented in this file.

## [1.1.2] - 2025-12-20

### Fixed
- ⌨️ Fixed keyboard shortcuts (were conflicting with VS Code defaults):
  - **Windows/Linux**: `Ctrl+Alt+G` (repo), `Ctrl+Alt+O` (file)
  - **macOS**: `Ctrl+Cmd+G` (repo), `Ctrl+Cmd+O` (file)

## [1.1.1] - 2025-12-20

### Changed
- 📁 Reorganized project structure:
  - Moved types to `src/types/`
  - Renamed `res/` to `public/`
- 🧹 Optimized `.vscodeignore` for smaller package size

## [1.1.0] - 2025-12-20

### Added
- ⌨️ Built-in keyboard shortcuts
- 📝 CHANGELOG.md for tracking version history

## [1.0.1] - 2025-12-20

### Changed
- Updated status bar icon from `$(git-branch)` to `$(link-external)`
- Added orange color (`#F96C4B`) to status bar icon

## [1.0.0] - 2025-12-20

### Added
- 🔗 Open any Git repository in browser with one click
- 📁 Support for multiple Git remotes
- 📄 Open current file at specific line in browser
- ⚙️ Configurable status bar
- 🔒 HTTPS preference option
