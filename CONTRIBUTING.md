# Contributing to Radian UI

Thank you for your interest in contributing to Radian UI! We welcome contributions from the software community to help improve and enhance this modern UI component library.

By contributing, you can help make Radian UI a more valuable resource for developers and contribute to the growth of the open-source community.

## Table of Contents

- [📙 How to Contribute](#how-to-contribute)
- [䷫ Commit Message Format](#commit-message-format)
- [👨🏻‍⚖️ Guidelines for Contribution](#guidelines-for-contribution)
- [🧪 Development Setup](#development-setup)

## How to Contribute

To contribute to Radian UI, please follow these guidelines:

1. **Fork the repository** on GitHub
2. **Clone your forked repository** to your local machine
3. **Create a new branch** for your feature or bug fix:
   - `git checkout -b feat/your-feature-name` for new features
   - `git checkout -b fix/your-bug-fix-name` for bug fixes
   - `git checkout -b docs/your-docs-update` for documentation
4. **Install dependencies**: `pnpm install`
5. **Run all tests** before committing changes and ensure all tests pass
6. **Commit your changes** with a descriptive message following our commit format
7. **Push your changes** to your forked repository
8. **Submit a pull request** to the main repository

## Commit Message Format

We follow the conventional commit message format to provide a clear and standardized history of our project's changes. Each commit message should consist of a type, scope, and a descriptive message.

| Type       | Heading  | Rule                     | Description                                                 |
| ---------- | -------- | ------------------------ | ----------------------------------------------------------- |
| `ci`       | CI       | Continuous Integration   | Changes related to continuous integration                   |
| `chore`    | Chore    | Maintenance tasks        | Other changes that don't affect production                  |
| `docs`     | Docs     | Documentation            | Changes related to documentation                            |
| `feat`     | Feature  | New Feature              | New feature implementations or additions                    |
| `fix`      | Fix      | Bug Fixes                | Bug fixes or corrections                                    |
| `perf`     | Perf     | Performance Improvements | Performance-related improvements                            |
| `refactor` | Refactor | Code Refactoring         | Code changes that improve structure without adding features |
| `revert`   | Revert   | Revert Previous Commits  | Reverting previous commits                                  |
| `style`    | Style    | Code Formatting or Style | Changes related to code formatting or style                 |
| `test`     | Test     | Testing                  | Adding or updating tests                                    |

### Format

The commit message should follow this structure: `type(scope): description`

- **Type**: The kind of change (feat, fix, docs, etc.)
- **Scope**: The area of the project being changed (website, cli, ci, etc.)
- **Description**: A clear, concise description of the change in present tense

**Examples:**

```
feat(website): add new button component with variants
fix(cli): resolve dependency installation issue
docs(website): update component usage examples
feat(cli): add new utility functions
fix(website): correct accessibility issue in dropdown component
chore(ci): update GitHub Actions workflow
```

## Guidelines for Contribution

Here's a guide on how you can effectively contribute to our UI component library:

### ✅ What We Welcome

- **New Components**: Create new, accessible UI components that follow our design system
- **Component Improvements**: Enhance existing components with new variants, better accessibility, or performance optimizations
- **Bug Fixes**: Fix issues in existing components or the build system
- **Documentation**: Improve component documentation, examples, and usage guides
- **Testing**: Add comprehensive tests for components and utilities
- **Performance**: Optimize component rendering and bundle size
- **Accessibility**: Improve ARIA attributes, keyboard navigation, and screen reader support

### ❌ What We Discourage

- **README-only Updates**: Please refrain from sending pull requests solely for updating the project's readme file
- **Minor Grammar Fixes**: While we value clear communication, focus on substantial contributions
- **Breaking Changes to Public APIs**: Maintain stability by avoiding breaking changes to existing component APIs
- **Style-only Changes**: Unless fixing accessibility or functionality issues, avoid purely cosmetic changes

### 🎯 Best Practices

- **Follow Design System**: Ensure new components align with our existing design patterns
- **Accessibility First**: All components must meet WCAG guidelines and work with screen readers
- **Responsive Design**: Components should work across all device sizes
- **Performance**: Keep bundle size minimal and rendering efficient
- **Testing**: Include unit tests and visual regression tests for new components
- **Documentation**: Provide clear examples and usage guidelines

## Development Setup

### Prerequisites

- Node.js >= 18
- pnpm >= 10.14.0

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/Radian UI.git
cd Radian UI

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build the project
pnpm build

# Run tests
pnpm test

# Format code
pnpm format:write

# Lint code
pnpm lint
```

## 🤝 Community Guidelines

- **Be Respectful**: Treat all contributors with respect and kindness
- **Ask Questions**: Don't hesitate to ask questions if something isn't clear
- **Provide Feedback**: Give constructive feedback on others' contributions
- **Follow Standards**: Adhere to our coding standards and commit message format
- **Test Thoroughly**: Ensure your contributions work across different environments

## 📞 Need Help?

- 💬 [GitHub Discussions](https://github.com/Radian-os/Radian UI/discussions)
- 🐛 [Report Issues](https://github.com/Radian-os/Radian UI/issues/new)
- 📧 [Contact the Team](mailto:team@Radian UI.com)

We appreciate your enthusiasm and look forward to your valuable contributions to our open-source UI component library!

Together, we can foster a collaborative environment and make a significant impact in the modern web development landscape.
