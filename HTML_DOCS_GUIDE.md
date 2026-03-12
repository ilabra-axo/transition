# HTML Documentation Guide

This guide explains how to use and maintain the HTML documentation system for this project.

## Overview

All markdown (`.md`) files in this project are automatically converted to beautiful, responsive HTML pages with:
- 📄 **Export as MD** buttons for editing source files
- 🔗 **Automatic hyperlinks** between documents
- 📱 **Responsive design** that works on all devices
- 🎨 **Professional styling** based on GitHub markdown standards

## Quick Start

### Viewing Documentation

1. Open `html_output/index.html` in your web browser
2. Browse through the organized list of all documentation
3. Click any document to view it
4. Use the "Export as MD" button to download/view the original markdown source

### Rebuilding Documentation

After editing any markdown files, rebuild the HTML documentation:

```bash
node build-docs.js
```

This single command will:
- Convert all `.md` files to `.html`
- Update all internal links
- Rebuild the index page
- Preserve directory structure

## Features

### 1. Export as MD Button

Every HTML page includes an "Export as MD" button in the top-right corner that:
- Links directly to the original markdown source file
- Allows you to download the `.md` file
- Makes it easy to find and edit the source documentation

### 2. Automatic Hyperlinking

All markdown links are automatically converted:
- Links to `.md` files → converted to `.html` links
- Internal navigation works seamlessly
- External links remain unchanged

**Example:**
```markdown
[See the Guide](DEPLOYMENT_GUIDE.md)
```
Becomes a working link to `DEPLOYMENT_GUIDE.html`

### 3. Responsive Design

All HTML pages feature:
- Clean, readable typography
- Mobile-friendly layouts
- Syntax-highlighted code blocks
- Properly formatted tables and lists
- Professional color scheme

### 4. Index Page

`html_output/index.html` provides:
- Organized view of all documents
- Grouping by directory/category
- Document count statistics
- Visual icons for different document types
- Quick navigation to any page

## Directory Structure

```
transition/
├── build-docs.js              # Main build script (runs both steps)
├── convert-md.js              # Converts .md to .html
├── create-index.js            # Creates index.html
│
└── html_output/               # Generated HTML documentation
    ├── index.html             # Main navigation page
    ├── README.html            # Project readme
    ├── *.html                 # All root-level documents
    └── agents/                # Subdirectory structure preserved
        ├── INDEX.html
        ├── QUICK_REFERENCE.html
        └── sdv-suite/
            └── *.html
```

## Individual Scripts

### convert-md.js

Converts all markdown files to HTML:

```bash
node convert-md.js
```

**What it does:**
- Finds all `.md` files in the project
- Converts markdown syntax to HTML
- Adds "Export as MD" buttons
- Updates internal links
- Applies professional styling
- Preserves directory structure

### create-index.js

Creates the main index/navigation page:

```bash
node create-index.js
```

**What it does:**
- Scans the `html_output` directory
- Groups documents by category
- Creates an organized index page
- Adds statistics and visual icons

### build-docs.js

Runs both scripts in sequence:

```bash
node build-docs.js
```

**Recommended:** Use this for normal rebuilds after editing markdown files.

## Workflow

### Editing Documentation

1. Edit any `.md` file in the project
2. Run `node build-docs.js`
3. Refresh your browser to see changes
4. Share the HTML files as needed

### Adding New Documents

1. Create a new `.md` file anywhere in the project
2. Run `node build-docs.js`
3. The new document will automatically appear in the index

### Sharing Documentation

The `html_output` folder is self-contained and can be:
- Opened directly in any web browser
- Hosted on a web server
- Shared as a zip file
- Committed to version control

## Tips & Best Practices

### ✅ Do's

- Run `build-docs.js` after editing any markdown files
- Use relative links in markdown (e.g., `./other-doc.md`)
- Keep the original markdown files as the source of truth
- Use the "Export as MD" button to navigate to source files

### ❌ Don'ts

- Don't edit HTML files directly (they'll be overwritten)
- Don't manually create links to `.html` files in markdown
- Don't delete the `html_output` folder (it will be recreated)

## Technical Details

### Markdown Features Supported

- Headers (H1-H6)
- Bold and italic text
- Code blocks with syntax highlighting
- Inline code
- Links and images
- Lists (ordered and unordered)
- Blockquotes
- Horizontal rules
- Tables

### Browser Compatibility

The generated HTML works in all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Opera

### Dependencies

- **Node.js** (v12 or higher)
- No external npm packages required (uses built-in modules)

## Troubleshooting

### HTML files not updating

1. Make sure you saved your markdown file
2. Run `node build-docs.js` again
3. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

### Links not working

- Ensure markdown links use relative paths
- Check that linked files exist
- Rebuild with `node build-docs.js`

### Index page missing documents

- Verify HTML files were generated in `html_output/`
- Run `node create-index.js` again
- Check for errors in the console output

## Maintenance

The HTML documentation system requires no regular maintenance. Simply rebuild when markdown files change:

```bash
node build-docs.js
```

That's it! The system automatically handles:
- Finding new files
- Updating changed files
- Removing deleted files (on next build)
- Updating the index
- Fixing all links

## Questions?

For more information about the documentation content itself, see:
- `README.md` - Project overview
- `QUICK_START.md` - Getting started guide
- `DEPLOYMENT_GUIDE.md` - Deployment instructions