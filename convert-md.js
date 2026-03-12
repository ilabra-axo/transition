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

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #e1e4e8;
        }
        .export-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: #0366d6;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.2s;
        }
        .export-btn:hover {
            background: #0256c7;
            text-decoration: none;
        }
        .export-btn::before {
            content: "📄";
        }
        .meta {
            color: #6a737d;
            font-size: 0.9em;
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
            color: #1a1a1a;
        }
        h1 {
            font-size: 2.5em;
            border-bottom: 2px solid #e1e4e8;
            padding-bottom: 0.3em;
            margin-top: 0;
        }
        h2 {
            font-size: 2em;
            border-bottom: 1px solid #e1e4e8;
            padding-bottom: 0.3em;
        }
        h3 { font-size: 1.5em; }
        h4 { font-size: 1.25em; }
        h5 { font-size: 1em; }
        h6 { font-size: 0.875em; }
        p {
            margin-bottom: 16px;
        }
        a {
            color: #0366d6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        code {
            background-color: #f6f8fa;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 85%;
            color: #e83e8c;
        }
        pre {
            background-color: #f6f8fa;
            padding: 16px;
            overflow: auto;
            border-radius: 6px;
            margin: 16px 0;
            border: 1px solid #e1e4e8;
        }
        pre code {
            background-color: transparent;
            padding: 0;
            color: #24292e;
            display: block;
            white-space: pre;
        }
        ul, ol {
            margin: 16px 0;
            padding-left: 32px;
        }
        li {
            margin: 4px 0;
        }
        blockquote {
            border-left: 4px solid #dfe2e5;
            padding: 0 16px;
            margin: 16px 0;
            color: #6a737d;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 16px 0;
        }
        table th, table td {
            border: 1px solid #dfe2e5;
            padding: 8px 12px;
            text-align: left;
        }
        table th {
            background-color: #f6f8fa;
            font-weight: 600;
        }
        table tr:nth-child(even) {
            background-color: #f6f8fa;
        }
        hr {
            border: 0;
            border-top: 1px solid #e1e4e8;
            margin: 24px 0;
        }
        img {
            max-width: 100%;
            height: auto;
            margin: 16px 0;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e1e4e8;
            text-align: center;
            color: #6a737d;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header-actions">
            <div class="meta">Generated from Markdown</div>
            <a href="${mdRelativePath}" class="export-btn" download>Export as MD</a>
        </div>
        ${content}
        <div class="footer">
            <p>Source: <a href="${mdRelativePath}">${mdPath}</a></p>
        </div>
    </div>
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
