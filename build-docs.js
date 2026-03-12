#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('================================================================================');
console.log('📚 BUILDING DOCUMENTATION LIBRARY');
console.log('================================================================================');
console.log('');

try {
  // Step 1: Convert markdown files to HTML
  console.log('Step 1: Converting markdown files to HTML...');
  console.log('');
  execSync('node convert-md.js', { stdio: 'inherit', cwd: __dirname });
  console.log('');

  // Step 2: Create index page
  console.log('Step 2: Creating index page...');
  console.log('');
  execSync('node create-index.js', { stdio: 'inherit', cwd: __dirname });
  console.log('');

  // Success message
  console.log('================================================================================');
  console.log('✅ DOCUMENTATION BUILD COMPLETE!');
  console.log('================================================================================');
  console.log('');
  console.log('📂 Output location: html_output/');
  console.log('🌐 To view: Open html_output/index.html in your browser');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Open html_output/index.html to browse all documents');
  console.log('  2. Click "Export as MD" on any page to edit the source');
  console.log('  3. Re-run this script after making changes to markdown files');
  console.log('');
  console.log('================================================================================');

} catch (error) {
  console.error('');
  console.error('❌ BUILD FAILED!');
  console.error('================================================================================');
  console.error('Error:', error.message);
  console.error('');
  process.exit(1);
}
