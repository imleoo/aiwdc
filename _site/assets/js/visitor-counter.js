# Visitor Counter for GitHub Pages

This script provides a simple visitor counter that works with GitHub Pages.

## Features

- Page view counting
- Unique visitor tracking
- Local storage fallback
- External API support
- Privacy-friendly (no personal data collection)

## Usage

Include this script in your HTML:

```html
<div id="visitor-counter">
    <span id="page-views">Loading...</span> views
</div>

<script src="/assets/js/visitor-counter.js"></script>
```

## Configuration

Edit the `counterConfig` object in the script to:
- Enable/disable API tracking
- Set custom API endpoints
- Configure local storage settings
- Customize display format