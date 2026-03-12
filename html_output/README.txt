================================================================================
HTML DOCUMENTATION LIBRARY
================================================================================

This directory contains HTML versions of all markdown documentation files
from the project, automatically generated for easy viewing and navigation.

================================================================================
GETTING STARTED
================================================================================

1. OPEN THE INDEX PAGE
   - Open "index.html" in your web browser to see all available documents
   - The index page provides an organized view of all documentation
   - Documents are grouped by category for easy browsing

2. VIEW ANY DOCUMENT
   - Click on any document link from the index
   - Each HTML page has been styled for optimal readability
   - All markdown formatting has been converted to HTML

================================================================================
FEATURES
================================================================================

📄 EXPORT AS MD
   - Each HTML page has an "Export as MD" button in the top-right corner
   - Click this button to download/view the original markdown file
   - Use this to edit the source documentation

🔗 HYPERLINKS
   - All internal markdown links have been converted to work with HTML files
   - Links to other .md files automatically point to their .html equivalents
   - Navigation between documents works seamlessly

📱 RESPONSIVE DESIGN
   - All pages are mobile-friendly and adapt to different screen sizes
   - Clean, professional styling based on GitHub markdown standards

================================================================================
REGENERATING HTML FILES
================================================================================

To regenerate the HTML documentation after editing markdown files:

   node convert-md.js

This will:
   - Find all .md files in the project
   - Convert them to HTML with proper styling
   - Preserve directory structure
   - Update all internal links
   - Add "Export as MD" buttons

To rebuild the index page:

   node create-index.js

================================================================================
DIRECTORY STRUCTURE
================================================================================

html_output/
├── index.html                    (Main navigation page)
├── README.html                   (Project readme)
├── *.html                        (Root-level documents)
└── agents/                       (Agent documentation)
    ├── INDEX.html
    ├── QUICK_REFERENCE.html
    └── sdv-suite/
        └── *.html

================================================================================
TIPS
================================================================================

✓ Bookmark the index.html page for quick access to all documentation
✓ Use your browser's search (Ctrl+F / Cmd+F) to find content within pages
✓ The footer of each page shows the source markdown file path
✓ All code blocks are syntax-highlighted and formatted
✓ Tables, lists, and blockquotes are properly styled

================================================================================
TECHNICAL DETAILS
================================================================================

Generated using: Node.js markdown-to-HTML converter
Styling: GitHub-inspired responsive CSS
Features: Auto-linking, code highlighting, responsive tables
Source: Markdown files from project root and subdirectories

================================================================================
