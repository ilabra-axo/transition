#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function findHTMLFiles(dir, baseDir = dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findHTMLFiles(filePath, baseDir, fileList);
    } else if (path.extname(file) === ".html" && file !== "index.html") {
      const relativePath = path.relative(baseDir, filePath);
      const displayName = path.basename(file, ".html");
      const directory = path.dirname(relativePath);

      fileList.push({
        path: relativePath.replace(/\\/g, "/"),
        name: displayName,
        dir: directory === "." ? "" : directory,
      });
    }
  });

  return fileList;
}

function groupFilesByDirectory(files) {
  const groups = {};

  files.forEach((file) => {
    const dir = file.dir || "Root";
    if (!groups[dir]) {
      groups[dir] = [];
    }
    groups[dir].push(file);
  });

  return groups;
}

function createIndexHTML(fileGroups) {
  let fileListHTML = "";

  // Sort directories
  const sortedDirs = Object.keys(fileGroups).sort((a, b) => {
    if (a === "Root") return -1;
    if (b === "Root") return 1;
    return a.localeCompare(b);
  });

  sortedDirs.forEach((dir) => {
    const files = fileGroups[dir].sort((a, b) => a.name.localeCompare(b.name));

    fileListHTML += `
      <div class="section">
        <h2>${dir === "Root" ? "📁 Main Documents" : "📁 " + dir}</h2>
        <ul class="file-list">`;

    files.forEach((file) => {
      const icon = getFileIcon(file.name);
      fileListHTML += `
          <li>
            <a href="${file.path}" class="file-link">
              <span class="file-icon">${icon}</span>
              <span class="file-name">${file.name}</span>
            </a>
          </li>`;
    });

    fileListHTML += `
        </ul>
      </div>`;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation Index</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: 700;
        }
        .header p {
            font-size: 1.1em;
            opacity: 0.95;
        }
        .content {
            padding: 40px;
        }
        .section {
            margin-bottom: 40px;
        }
        .section h2 {
            color: #2d3748;
            font-size: 1.5em;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e2e8f0;
        }
        .file-list {
            list-style: none;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 15px;
        }
        .file-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 15px 20px;
            background: #f7fafc;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            text-decoration: none;
            color: #2d3748;
            transition: all 0.3s ease;
        }
        .file-link:hover {
            background: #667eea;
            color: white;
            border-color: #667eea;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        .file-icon {
            font-size: 1.5em;
            flex-shrink: 0;
        }
        .file-name {
            font-weight: 500;
            font-size: 0.95em;
            word-break: break-word;
        }
        .stats {
            background: #f7fafc;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            text-align: center;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 15px;
        }
        .stat-item {
            background: white;
            padding: 15px;
            border-radius: 6px;
            border: 2px solid #e2e8f0;
        }
        .stat-number {
            font-size: 2em;
            font-weight: 700;
            color: #667eea;
            display: block;
        }
        .stat-label {
            color: #718096;
            font-size: 0.9em;
            margin-top: 5px;
        }
        .footer {
            background: #f7fafc;
            padding: 20px;
            text-align: center;
            color: #718096;
            border-top: 1px solid #e2e8f0;
        }
        @media (max-width: 768px) {
            .header h1 {
                font-size: 1.8em;
            }
            .file-list {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 Documentation Library</h1>
            <p>Browse all generated documentation</p>
        </div>
        <div class="content">
            <div class="stats">
                <h3>Collection Statistics</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-number">${Object.values(fileGroups).flat().length}</span>
                        <div class="stat-label">Total Documents</div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${Object.keys(fileGroups).length}</span>
                        <div class="stat-label">Categories</div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">📄</span>
                        <div class="stat-label">HTML Format</div>
                    </div>
                </div>
            </div>
            ${fileListHTML}
        </div>
        <div class="footer">
            <p>Generated from Markdown files • Click any document to view • Use "Export as MD" to download source</p>
        </div>
    </div>
</body>
</html>`;
}

function getFileIcon(fileName) {
  const name = fileName.toLowerCase();

  if (name.includes("readme")) return "📖";
  if (name.includes("guide") || name.includes("tutorial")) return "📘";
  if (name.includes("quick") || name.includes("start")) return "🚀";
  if (name.includes("dashboard")) return "📊";
  if (name.includes("deployment")) return "🚢";
  if (name.includes("agent")) return "🤖";
  if (name.includes("reference")) return "📚";
  if (name.includes("design") || name.includes("architecture")) return "🏗️";
  if (name.includes("summary") || name.includes("executive")) return "📋";
  if (name.includes("report")) return "📄";
  if (name.includes("analysis") || name.includes("market")) return "📈";
  if (name.includes("patent") || name.includes("research")) return "🔬";
  if (name.includes("cv") || name.includes("resume")) return "👤";
  if (name.includes("index")) return "🗂️";

  return "📄";
}

function main() {
  const outputDir = path.join(process.cwd(), "html_output");

  if (!fs.existsSync(outputDir)) {
    console.error("Error: html_output directory not found!");
    console.error("Please run the markdown conversion script first.");
    process.exit(1);
  }

  // Find all HTML files
  const htmlFiles = findHTMLFiles(outputDir);

  if (htmlFiles.length === 0) {
    console.error("No HTML files found in html_output directory!");
    process.exit(1);
  }

  // Group files by directory
  const fileGroups = groupFilesByDirectory(htmlFiles);

  // Create index HTML
  const indexHTML = createIndexHTML(fileGroups);

  // Write index.html
  const indexPath = path.join(outputDir, "index.html");
  fs.writeFileSync(indexPath, indexHTML, "utf8");

  console.log("✓ Index page created successfully!");
  console.log(`  Location: ${indexPath}`);
  console.log(`  Files indexed: ${htmlFiles.length}`);
  console.log(`  Categories: ${Object.keys(fileGroups).length}`);
}

main();
