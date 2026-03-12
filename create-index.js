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
    const dir = file.dir || "root";
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
    if (a === "root") return -1;
    if (b === "root") return 1;
    return a.localeCompare(b);
  });

  sortedDirs.forEach((dir) => {
    const files = fileGroups[dir].sort((a, b) => a.name.localeCompare(b.name));

    const dirTitle = dir === "root" ? "main documentation" : dir;

    fileListHTML += `
      <section class="category">
        <h2>${dirTitle}</h2>
        <table>
          <thead>
            <tr>
              <th>document</th>
              <th>type</th>
              <th style="text-align: right">action</th>
            </tr>
          </thead>
          <tbody>`;

    files.forEach((file) => {
      const type = getDocType(file.name);
      fileListHTML += `
            <tr>
              <td><a href="${file.path}" class="doc-link">${file.name}</a></td>
              <td><span class="doc-type">${type}</span></td>
              <td style="text-align: right"><a href="${file.path}" class="view-btn">view →</a></td>
            </tr>`;
    });

    fileListHTML += `
          </tbody>
        </table>
      </section>`;
  });

  const totalDocs = Object.values(fileGroups).flat().length;
  const totalCategories = Object.keys(fileGroups).length;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Documentation Index | BCS Knowledge Transfer</title>
    <meta
      name="description"
      content="Complete documentation library for BCS transition package - guides, references, and technical documentation."
    />
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

      .nav {
        margin-bottom: 30px;
      }

      .nav a {
        color: var(--muted);
        text-decoration: none;
        font-size: 12px;
        margin-right: 20px;
      }

      .nav a:hover {
        color: var(--accent);
      }

      h1 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 15px;
        letter-spacing: -0.5px;
      }

      .tagline {
        font-size: 12px;
        color: var(--muted);
        line-height: 1.8;
      }

      .stats {
        display: flex;
        gap: 30px;
        margin-top: 20px;
        padding: 20px;
        background: var(--light-bg);
        border: 1px solid var(--border);
        font-size: 11px;
      }

      .stat {
        color: var(--muted);
      }

      .stat strong {
        color: var(--text);
        font-weight: 600;
        margin-right: 5px;
      }

      h2 {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 20px;
        text-transform: lowercase;
        letter-spacing: 0.5px;
      }

      .category {
        margin-bottom: 50px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
      }

      th {
        text-align: left;
        font-weight: 600;
        padding: 12px 16px;
        border-bottom: 1px solid var(--border);
        color: var(--muted);
        font-size: 11px;
        text-transform: lowercase;
      }

      td {
        padding: 16px;
        border-bottom: 1px solid var(--border);
        vertical-align: middle;
      }

      tr:hover {
        background: var(--light-bg);
      }

      .doc-link {
        color: var(--text);
        text-decoration: none;
        font-weight: 500;
      }

      .doc-link:hover {
        color: var(--accent);
      }

      .doc-type {
        display: inline-block;
        padding: 2px 8px;
        background: var(--light-bg);
        border: 1px solid var(--border);
        border-radius: 2px;
        font-size: 10px;
        color: var(--muted);
        text-transform: lowercase;
      }

      .view-btn {
        color: var(--accent);
        text-decoration: none;
        font-size: 12px;
        font-weight: 500;
      }

      .view-btn:hover {
        text-decoration: underline;
      }

      footer {
        margin-top: 80px;
        padding-top: 30px;
        border-top: 1px solid var(--border);
        font-size: 11px;
        color: var(--muted);
      }

      .info-box {
        background: var(--light-bg);
        padding: 20px;
        margin: 30px 0;
        border: 1px solid var(--border);
        font-size: 12px;
        line-height: 1.8;
      }

      .info-box strong {
        color: var(--text);
        font-weight: 600;
      }

      @media (max-width: 768px) {
        .stats {
          flex-direction: column;
          gap: 10px;
        }

        table {
          font-size: 12px;
        }

        td, th {
          padding: 12px 10px;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <nav class="nav">
        <a href="../agents/sdv-suite/index.html">← back to main site</a>
        <a href="../agents/sdv-suite/downloads.html">downloads</a>
      </nav>
      <h1>documentation library</h1>
      <p class="tagline">
        complete reference library for BCS knowledge transfer package.
        all markdown documentation converted to browsable HTML format.
        each document includes an "export as .md" button for editing source files.
      </p>
      <div class="stats">
        <div class="stat"><strong>${totalDocs}</strong> total documents</div>
        <div class="stat"><strong>${totalCategories}</strong> categories</div>
        <div class="stat"><strong>html</strong> format</div>
        <div class="stat"><strong>markdown</strong> source available</div>
      </div>
    </header>

    <main>
      <div class="info-box">
        <strong>how to use:</strong> click any document to view in your browser.
        use the "export as .md" button on each page to download the original markdown source for editing.
        all internal links between documents work automatically.
      </div>

      ${fileListHTML}
    </main>

    <footer>
      <p style="margin-bottom: 10px">
        <strong>rebuilding documentation:</strong> after editing markdown files, run
        <code style="background: var(--light-bg); padding: 2px 6px; border: 1px solid var(--border);">node build-docs.js</code>
        to regenerate all HTML files.
      </p>
      <p>
        BCS Knowledge Transfer Package |
        <a href="../agents/sdv-suite/index.html">main site</a> |
        <a href="../agents/sdv-suite/downloads.html">downloads</a>
      </p>
    </footer>
  </body>
</html>`;
}

function getDocType(fileName) {
  const name = fileName.toLowerCase();

  if (name.includes("readme")) return "overview";
  if (name.includes("guide")) return "guide";
  if (name.includes("quick") || name.includes("start")) return "quickstart";
  if (name.includes("dashboard")) return "dashboard";
  if (name.includes("deployment")) return "deployment";
  if (name.includes("agent")) return "agent spec";
  if (name.includes("reference")) return "reference";
  if (name.includes("design") || name.includes("architecture"))
    return "technical";
  if (name.includes("summary") || name.includes("executive")) return "summary";
  if (name.includes("report")) return "report";
  if (name.includes("analysis") || name.includes("market")) return "analysis";
  if (name.includes("patent") || name.includes("research")) return "research";
  if (name.includes("cv") || name.includes("resume")) return "cv";
  if (name.includes("index")) return "index";

  return "document";
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
