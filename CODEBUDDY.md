# CODEBUDDY.md

This file provides guidance to CodeBuddy Code when working with the AiWDC.com repository.

## Development Commands

### Local Development
```bash
# Install Ruby dependencies
bundle install

# Start development server with live reload
bundle exec jekyll serve --livereload

# Build for production
bundle exec jekyll build

# Clean build artifacts
bundle exec jekyll clean

# Check site health
bundle exec jekyll doctor
```

### Testing
```bash
# Run local development server (primary testing method)
bundle exec jekyll serve

# Check for broken links and site issues
bundle exec jekyll doctor
```

## Architecture Overview

This is a Jekyll 4.3 static site for AiWDC.com - an AI content automation platform marketing website. The architecture follows Jekyll conventions with some key customizations:

### Core Structure
- **Jekyll Static Site Generator**: Ruby-based SSG with Liquid templating
- **GitHub Pages Hosting**: Automated deployment via GitHub Actions
- **Collections-based Content**: Two main collections - `articles` and `resources`
- **Responsive Design**: Mobile-first CSS with custom styling

### Key Components

#### 1. Homepage Interactive Elements (`index.html`)
- **Connection Diagram**: Dynamic SVG-based visualization showing data flow from sources through AI processing to destinations
- **Pricing Toggle**: JavaScript-powered monthly/annual billing toggle with accessibility features
- **Hero Section**: Features animated connection lines between data sources and destinations

#### 2. Layout System (`_layouts/`)
- **default.html**: Base template with navigation, footer, analytics integration
- **article.html**: Template for blog articles with metadata display
- **resource.html**: Template for documentation and resources

#### 3. Content Collections
- **Articles** (`_articles/`): Blog posts and guides with front matter (category, featured, date, read_time)
- **Resources** (`_resources/`): Documentation and tutorials organized by category

#### 4. Frontend Architecture
- **Styling**: Custom CSS in `assets/css/styles.css` with CSS variables for theming
- **JavaScript**: Vanilla JS in `assets/js/script.js` with error handling and safe DOM querying
- **Fonts**: Inter and JetBrains Mono from Google Fonts
- **Icons**: Mix of custom SVGs and external icon services

### Technical Implementation Details

#### Connection Diagram System
- Dynamic positioning using `getBoundingClientRect()`
- Animated data particles flowing between connectors
- Responsive layout that adapts to screen sizes
- Error handling for missing elements

#### Content Management
- **Front Matter Structure**: Standardized metadata (title, category, date, description, read_time, image, featured)
- **Liquid Templates**: Dynamic content rendering with loops and conditionals
- **SEO Integration**: jekyll-seo-tag plugin with custom meta tags

#### Analytics Integration
- **Google Analytics 4**: Configured via `_config.yml` (G-50PGBTRWFQ)
- **GitHub Analytics**: Custom tracking in `_includes/github-analytics.html`
- **Visitor Counter**: LocalStorage-based tracking with Counter.dev integration

### Build Process
1. **Source Processing**: Markdown files + Liquid templates → HTML
2. **Asset Pipeline**: CSS/JS files copied to `_site/`
3. **Jekyll Build**: Generates static site in `_site/` directory
4. **GitHub Actions**: Automated deployment to GitHub Pages on push to main

### Configuration Files
- **_config.yml**: Main Jekyll settings, collections, navigation, SEO metadata
- **Gemfile**: Ruby dependencies (Jekyll 4.3, plugins)
- **Front Matter Defaults**: Automatic layout assignment for collections

### Content Categories
- **Articles**: Documentation, Tutorials, Templates, Blog
- **Resources**: Technical guides and references
- **Navigation**: Features, Pricing, Resources, Community (configured in `_config.yml`)

### Development Patterns
- **Safe DOM Querying**: All JavaScript uses null checks and error handling
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Accessibility**: ARIA labels, semantic HTML5, keyboard navigation support
- **Performance**: Optimized assets, minimal JavaScript footprint

### Important Technical Notes
- No Node.js build process - CSS/JS edited directly
- All interactive elements include proper error handling
- Mobile menu toggle functionality for responsive navigation
- Pricing toggle updates both display text and button labels
- Connection diagram recalculates positions on window resize

### File Organization
```
├── _config.yml              # Jekyll configuration
├── _layouts/                # Page templates
├── _includes/               # Reusable components (analytics)
├── _articles/               # Blog posts and guides
├── _resources/              # Documentation content
├── assets/                  # Static assets (CSS, JS, images)
├── index.html               # Homepage with interactive elements
├── login.html               # Authentication pages
├── register.html
└── .github/workflows/       # CI/CD (if present)
```

### Content Workflow
1. Create Markdown files in appropriate collection directory
2. Add proper front matter with required fields
3. Test locally with `bundle exec jekyll serve --livereload`
4. Commit to main branch for automatic deployment

### Styling Conventions
- CSS variables for consistent theming
- BEM-like naming for component styles
- Responsive breakpoints handled with media queries
- Custom properties for colors, spacing, and typography