# Visitor Counter Configuration and Usage

## What's Included

1. **Visitor Counter Script** (`_includes/visitor-counter.html`)
   - Tracks page views and unique visitors
   - Uses localStorage for client-side tracking
   - Supports external API integration
   - Responsive design with mobile support

2. **Documentation** (`assets/js/visitor-counter.js`)
   - Complete setup guide
   - Configuration options
   - Usage examples

## Features

- **Page Views**: Total number of page visits
- **Unique Visitors**: Tracks unique visitors by day
- **Last Visit**: Shows when the user last visited
- **Privacy-Friendly**: No personal data collection
- **Offline Support**: Works with localStorage fallback
- **API Integration**: Optional external tracking

## Usage

The counter is automatically included on all pages. To disable on specific pages, add to front matter:

```yaml
---
show_visitor_counter: false
---
```

## Customization

Edit `_includes/visitor-counter.html` to:
- Change colors and styling
- Modify counter behavior
- Add/remove statistics
- Configure API endpoints