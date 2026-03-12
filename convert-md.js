#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Simple markdown to HTML converter (no dependencies needed)
function convertMarkdown(markdown, relativePath) {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");

  // Code blocks
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    "<pre><code>$2</code></pre>",
  );

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Links - Convert .md links to .html links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    // If it's a .md file, convert to .html
    if (url.endsWith(".md")) {
      url = url.replace(/\.md$/, ".html");
    }
    return `<a href="${url}">${text}</a>`;
  });

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Horizontal rules
  html = html.replace(/^\-\-\-$/gim, "<hr>");
  html = html.replace(/^\*\*\*$/gim, "<hr>");

  // Unordered lists
  html = html.replace(/^\* (.+)$/gim, "<li>$1</li>");
  html = html.replace(/^- (.+)$/gim, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gim, "<li>$1</li>");

  // Blockquotes
  html = html.replace(/^\> (.+)$/gim, "<blockquote>$1</blockquote>");

  // Paragraphs
  html = html
    .split("\n\n")
    .map((para) => {
      if (!para.match(/^<(h\d|ul|ol|li|blockquote|pre|hr)/)) {
        return `<p>${para}</p>`;
      }
      return para;
    })
    .join("\n");

  return html;
}

function createHTMLTemplate(title, content, mdPath, currentPath) {
  // Calculate relative path from HTML output to original MD file
  const relativeToRoot = path.relative(
    path.dirname(currentPath),
    process.cwd(),
  );
  const mdRelativePath = path.join(relativeToRoot, mdPath).replace(/\\/g, "/");

  // Calculate path back to main site
  const depth = currentPath.split(path.sep).filter((p) => p).length - 2; // html_output depth
  const backToRoot = depth > 0 ? "../".repeat(depth) : "./";

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | BCS Documentation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --bg: #ffffff;
            --text: #1a1a1a;
            --muted: #666666;
            --border: #e0e0e0;
            --accent: #0066cc;
            --light-bg: #f8f8f8;
        }

        body {
            font-family: "Courier New", "Monaco", "Menlo", monospace;
            line-height: 1.6;
            color: var(--text);
            background: var(--bg);
            font-size: 14px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        header {
            border-bottom: 1px solid var(--border);
            padding-bottom: 30px;
            margin-bottom: 50px;
        }

        .header-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            font-size: 11px;
        }

        .nav-links a {
            color: var(--muted);
            text-decoration: none;
            margin-right: 20px;
        }

        .nav-links a:hover {
            color: var(--accent);
        }

        .export-btn {
            display: inline-block;
            padding: 6px 12px;
            background: var(--light-bg);
            border: 1px solid var(--border);
            border-radius: 2px;
            font-size: 11px;
            color: var(--text);
            text-decoration: none;
            transition: all 0.2s;
        }

        .export-btn:hover {
            background: var(--accent);
            color: white;
            border-color: var(--accent);
        }

        .page-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            letter-spacing: -0.5px;
        }

        .meta {
            font-size: 11px;
            color: var(--muted);
        }

        h1 {
            font-size: 18px;
            font-weight: 600;
            margin: 40px 0 20px 0;
            letter-spacing: -0.5px;
            border-bottom: 1px solid var(--border);
            padding-bottom: 10px;
        }

        h2 {
            font-size: 14px;
            font-weight: 600;
            margin: 35px 0 15px 0;
            text-transform: lowercase;
            letter-spacing: 0.5px;
        }

        h3 {
            font-size: 13px;
            font-weight: 600;
            margin: 25px 0 12px 0;
        }

        p {
            margin-bottom: 16px;
            font-size: 13px;
            line-height: 1.8;
        }

        a {
            color: var(--accent);
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        code {
            background-color: var(--light-bg);
            padding: 2px 6px;
            border-radius: 2px;
            font-family: "Courier New", "Monaco", "Menlo", monospace;
            font-size: 12px;
            color: var(--text);
            border: 1px solid var(--border);
        }

        pre {
            background-color: var(--light-bg);
            padding: 20px;
            overflow: auto;
            border-radius: 2px;
            margin: 20px 0;
            border: 1px solid var(--border);
        }

        pre code {
            background-color: transparent;
            padding: 0;
            border: none;
            display: block;
            white-space: pre;
            font-size: 12px;
            line-height: 1.6;
        }

        ul, ol {
            margin: 16px 0;
            padding-left: 32px;
        }

        li {
            margin: 6px 0;
            font-size: 13px;
            line-height: 1.7;
        }

        blockquote {
            border-left: 3px solid var(--accent);
            padding: 0 16px;
            margin: 20px 0;
            color: var(--muted);
            background: var(--light-bg);
            padding: 16px 20px;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
            font-size: 12px;
        }

        table th, table td {
            border: 1px solid var(--border);
            padding: 10px 14px;
            text-align: left;
        }

        table th {
            background-color: var(--light-bg);
            font-weight: 600;
            text-transform: lowercase;
            font-size: 11px;
            color: var(--muted);
        }

        table tr:hover {
            background-color: var(--light-bg);
        }

        hr {
            border: 0;
            border-top: 1px solid var(--border);
            margin: 40px 0;
        }

        img {
            max-width: 100%;
            height: auto;
            margin: 20px 0;
            border: 1px solid var(--border);
        }

        footer {
            margin-top: 80px;
            padding-top: 30px;
            border-top: 1px solid var(--border);
            font-size: 11px;
            color: var(--muted);
        }

        .source-info {
            background: var(--light-bg);
            padding: 15px 20px;
            margin-top: 20px;
            border: 1px solid var(--border);
            font-size: 11px;
            color: var(--muted);
        }

        strong {
            font-weight: 600;
        }

        em {
            font-style: italic;
        }
    </style>
</head>
<body>
    <header>
        <div class="header-nav">
            <div class="nav-links">
                <a href="${backToRoot}index.html">← documentation index</a>
                <a href="${backToRoot}../agents/sdv-suite/index.html">main site</a>
            </div>
            <a href="${mdRelativePath}" class="export-btn" download>export as .md</a>
        </div>
        <div class="page-title">${title}</div>
        <div class="meta">source: ${mdPath}</div>
    </header>

    <main>
        ${content}
    </main>

    <footer>
        <div class="source-info">
            <strong>note:</strong> this document is auto-generated from markdown.
            to edit, download the source .md file using the "export as .md" button above.
        </div>
        <p style="margin-top: 20px;">
            BCS Knowledge Transfer Package |
            <a href="${backToRoot}../agents/sdv-suite/index.html">back to main site</a> |
            <a href="${backToRoot}index.html">all documentation</a>
        </p>
    </footer>
</body>
</html>`;
}

function findMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules and hidden directories
      if (
        !file.startsWith(".") &&
        file !== "node_modules" &&
        file !== "html_output"
      ) {
        findMarkdownFiles(filePath, fileList);
      }
    } else if (path.extname(file) === ".md") {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function convertFile(mdPath, outputDir) {
  const content = fs.readFileSync(mdPath, "utf8");
  const fileName = path.basename(mdPath, ".md");
  const relativePath = path.relative(process.cwd(), mdPath);
  const relativeDir = path.dirname(relativePath);

  // Create output directory structure
  const outputSubDir = path.join(outputDir, relativeDir);
  if (!fs.existsSync(outputSubDir)) {
    fs.mkdirSync(outputSubDir, { recursive: true });
  }

  // Output file path
  const outputPath = path.join(outputSubDir, `${fileName}.html`);

  // Convert markdown to HTML
  const htmlContent = convertMarkdown(content, relativePath);
  const fullHtml = createHTMLTemplate(
    fileName,
    htmlContent,
    relativePath,
    outputPath,
  );

  // Write HTML file
  fs.writeFileSync(outputPath, fullHtml, "utf8");

  return outputPath;
}

function main() {
  const projectRoot = process.cwd();
  const outputDir = path.join(projectRoot, "html_output");

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Find all markdown files
  const mdFiles = findMarkdownFiles(projectRoot);

  if (mdFiles.length === 0) {
    console.log("No markdown files found!");
    return;
  }

  console.log(`Found ${mdFiles.length} markdown files`);
  console.log(`Output directory: ${outputDir}`);
  console.log("-".repeat(60));

  // Convert each file
  let converted = 0;
  mdFiles.forEach((mdFile) => {
    try {
      const outputPath = convertFile(mdFile, outputDir);
      const relativeInput = path.relative(projectRoot, mdFile);
      const relativeOutput = path.relative(projectRoot, outputPath);
      console.log(`✓ ${relativeInput} -> ${relativeOutput}`);
      converted++;
    } catch (error) {
      console.error(`✗ Error converting ${mdFile}:`, error.message);
    }
  });

  console.log("-".repeat(60));
  console.log(`Successfully converted ${converted}/${mdFiles.length} files`);
  console.log(`HTML files saved to: ${outputDir}`);
}

main();
