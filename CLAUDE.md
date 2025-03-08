# Jekyll Blog Commands and Guidelines

## Build Commands
- `bundle exec jekyll serve` - Run local development server
- `bundle exec jekyll build` - Build site without serving
- `bundle exec jekyll clean` - Clean generated files
- `bundle exec jekyll doctor` - Check for configuration issues

## Style Guidelines
- **Markdown**: Use standard Markdown for posts in `_posts/` directory
- **YAML Front Matter**: Required at top of posts (title, date, layout, categories)
- **Naming**: Posts must follow `YYYY-MM-DD-title.markdown` format
- **SCSS**: Follow BEM methodology for CSS classes
- **HTML**: Use semantic tags and include appropriate accessibility attributes
- **Images**: Store in `/assets/` directory, use relative paths
- **Code Snippets**: Use triple backticks with language identifier
- **Responsive Design**: All pages should be responsive and mobile-friendly

## Content Organization
- Use `/_posts/` for blog entries
- Use `/_drafts/` for unpublished content
- Custom pages go in root directory with `.markdown` extension