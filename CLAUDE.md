# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Local Development
```bash
# Install Ruby dependencies
bundle install

# Start development server with live reload
bundle exec jekyll serve --livereload

# Start development server (basic)
bundle exec jekyll serve

# Build for production
bundle exec jekyll build

# Clean build artifacts
bundle exec jekyll clean
```

### Testing and Validation
```bash
# Primary testing method - run local development server
bundle exec jekyll serve

# Check site health and validate configuration
bundle exec jekyll doctor

# Validate generated site structure
ls -la _site/
```

## Architecture Overview

This is a Jekyll 4.3 static site for AiWDC.com - an AI content automation platform. The architecture includes:

### Core Structure
- **Jekyll Static Site Generator**: Ruby-based SSG with liquid templating
- **GitHub Pages Hosting**: Automated deployment via GitHub Actions
- **Multi-page Layout**: Homepage, resources, articles, authentication pages
- **Collections**: Two main collections - `resources` and `articles`

### Key Components
1. **Homepage (`index.html`)**: Features hero section, interactive connection diagram, pricing toggle
2. **Connection Diagram**: Dynamic SVG-based visualization showing data flow from sources through AI processing to destinations
3. **Pricing System**: Monthly/annual billing toggle with JavaScript state management
4. **Analytics Integration**: Google Analytics 4 + GitHub Insights + custom visitor tracking

### Frontend Architecture
- **Styling**: Custom CSS with CSS variables for theming, responsive design
- **JavaScript**: Vanilla JS with modular functions, error handling, and safe DOM querying
- **Accessibility**: Semantic HTML5, ARIA labels, keyboard navigation support
- **Performance**: Optimized assets, minimal JS footprint, fast loading

### Content Management
- **Markdown-based**: Articles and resources stored as Markdown files with front matter
- **Liquid Templates**: Layout system in `_layouts/` with reusable components in `_includes/`
- **Front Matter**: Standardized metadata structure (title, category, date, description, etc.)

### Build Process
1. **Source**: Markdown files + Liquid templates
2. **Jekyll Build**: Processes templates, generates static HTML
3. **GitHub Actions**: Automated build/deployment on push to main
4. **Output**: Static files in `_site/` directory

### Notable Technical Details
- **Connection Diagram**: Dynamic positioning with `getBoundingClientRect()`, animated data particles
- **Pricing Toggle**: Accessible form controls with proper ARIA labeling
- **Visitor Counter**: Custom JavaScript implementation with LocalStorage fallback, privacy-friendly tracking with external API support
- **Mobile Responsive**: Hamburger menu, touch-friendly interactions

### File Organization Patterns
- `_layouts/`: Page templates (default, resource, article)
- `_includes/`: Reusable components (analytics, visitor counter)
- `assets/`: Static assets (CSS, JS, images)
- `_articles/` & `_resources/`: Content collections
- `.github/workflows/`: CI/CD configuration

### Development Workflow
1. Edit source files (Markdown, HTML, CSS, JS)
2. Test locally with `jekyll serve`
3. Commit to main branch
4. GitHub Actions auto-deploys to GitHub Pages

### Configuration
- `_config.yml`: Main Jekyll settings, navigation, collections
- `Gemfile`: Ruby dependencies
- Analytics IDs and site URLs managed in config

## Important Notes
- No build step required for CSS/JS (edited directly in `assets/` directory)
- All interactive elements have proper error handling and safe DOM querying
- Accessibility features implemented (ARIA labels, form associations, keyboard navigation)
- Test both mobile and desktop breakpoints when making UI changes
- Monitor browser console for safe query warnings during development
- GitHub Actions automatically deploys on push to main branch
- Site uses Google Analytics (G-50PGBTRWFQ) and custom visitor tracking
- All JavaScript uses vanilla JS with error handling - avoid external dependencies

## Content Management Patterns
- Articles use front matter: `title`, `category`, `featured`, `date`, `description`, `read_time`, `image`
- Resources organized by categories: Documentation, Tutorials, Templates, Blog
- Use existing layout templates: `default.html`, `article.html`, `resource.html`
- Images stored in `assets/images/` - reference with `/assets/images/filename`
- Site navigation managed in `_config.yml` under `navigation` section

## Development Workflow
1. Make changes to source files (Markdown, HTML, CSS, JS)
2. Test locally with `bundle exec jekyll serve --livereload`
3. Verify responsive design on mobile and desktop
4. Check browser console for errors
5. Commit to main branch for automatic GitHub Pages deployment