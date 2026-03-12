#!/usr/bin/env python3
"""
Convert all markdown files to HTML
"""

import os
import sys
from pathlib import Path

try:
    import markdown
except ImportError:
    print("Installing markdown library...")
    import subprocess

    subprocess.check_call([sys.executable, "-m", "pip", "install", "markdown"])
    import markdown


def convert_md_to_html(md_file_path, output_dir=None):
    """Convert a single markdown file to HTML"""

    # Read markdown content
    with open(md_file_path, "r", encoding="utf-8") as f:
        md_content = f.read()

    # Convert to HTML
    html_content = markdown.markdown(
        md_content, extensions=["extra", "codehilite", "toc", "tables", "fenced_code"]
    )

    # Create full HTML document
    file_name = Path(md_file_path).stem
    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{file_name}</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            color: #333;
        }}
        h1, h2, h3, h4, h5, h6 {{
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
        }}
        h1 {{ font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }}
        h2 {{ font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }}
        h3 {{ font-size: 1.25em; }}
        code {{
            background-color: #f6f8fa;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 85%;
        }}
        pre {{
            background-color: #f6f8fa;
            padding: 16px;
            overflow: auto;
            border-radius: 6px;
            line-height: 1.45;
        }}
        pre code {{
            background-color: transparent;
            padding: 0;
        }}
        table {{
            border-collapse: collapse;
            width: 100%;
            margin: 16px 0;
        }}
        table th, table td {{
            border: 1px solid #dfe2e5;
            padding: 6px 13px;
        }}
        table tr:nth-child(2n) {{
            background-color: #f6f8fa;
        }}
        blockquote {{
            border-left: 4px solid #dfe2e5;
            padding: 0 15px;
            color: #6a737d;
            margin: 0;
        }}
        a {{
            color: #0366d6;
            text-decoration: none;
        }}
        a:hover {{
            text-decoration: underline;
        }}
        img {{
            max-width: 100%;
            height: auto;
        }}
        hr {{
            border: 0;
            border-top: 1px solid #eaecef;
            margin: 24px 0;
        }}
    </style>
</head>
<body>
{html_content}
</body>
</html>"""

    # Determine output path
    if output_dir:
        output_path = Path(output_dir) / (file_name + ".html")
    else:
        output_path = Path(md_file_path).parent / (file_name + ".html")

    # Write HTML file
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(full_html)

    return output_path


def main():
    # Get the script directory (project root)
    project_root = Path(__file__).parent

    # Create output directory
    output_dir = project_root / "html_output"
    output_dir.mkdir(exist_ok=True)

    # Find all markdown files
    md_files = list(project_root.rglob("*.md"))

    if not md_files:
        print("No markdown files found!")
        return

    print(f"Found {len(md_files)} markdown files")
    print(f"Output directory: {output_dir}")
    print("-" * 60)

    # Convert each file
    converted_count = 0
    for md_file in md_files:
        try:
            # Create subdirectory structure in output
            relative_path = md_file.relative_to(project_root)
            output_subdir = output_dir / relative_path.parent
            output_subdir.mkdir(parents=True, exist_ok=True)

            html_path = convert_md_to_html(md_file, output_subdir)
            print(
                f"✓ Converted: {relative_path} -> {html_path.relative_to(project_root)}"
            )
            converted_count += 1
        except Exception as e:
            print(f"✗ Error converting {md_file}: {e}")

    print("-" * 60)
    print(f"Successfully converted {converted_count}/{len(md_files)} files")
    print(f"HTML files saved to: {output_dir}")


if __name__ == "__main__":
    main()
