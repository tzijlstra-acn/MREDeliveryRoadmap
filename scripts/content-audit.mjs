/**
 * Content audit script for UC3 Agentic Compliance Delivery Blueprint.
 * Scans user-visible content files for prohibited characters, forbidden values and placeholder text.
 * Run: node scripts/content-audit.mjs
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Files to scan (relative to ROOT)
const SCAN_EXTENSIONS = ['.html', '.js'];
const EXCLUDE_DIRS = ['node_modules', '.git', '.github', 'scripts', 'dist'];

// Forbidden patterns with descriptions
const FORBIDDEN = [
  { pattern: /—/g, desc: 'Unicode em dash (U+2014) - use a hyphen or reword' },
  { pattern: /–/g, desc: 'Unicode en dash (U+2013) - use a hyphen or reword' },
  { pattern: /−/g, desc: 'Unicode minus sign (U+2212) - use ASCII hyphen-minus' },
  { pattern: /lorem ipsum/gi, desc: 'Lorem ipsum placeholder text' },
  { pattern: /\bTODO\b/g, desc: 'Unresolved TODO in user-visible content' },
  { pattern: /\bPLACEHOLDER\b/g, desc: 'PLACEHOLDER token in content (uppercase only - not CSS ::placeholder or HTML placeholder= attributes)' },
  { pattern: /REPLACE_WITH/g, desc: 'Unfilled template token (expected in index.html for ACCESS_HASH - document as known exception)' },
  { pattern: /52 FTE/gi, desc: 'Forbidden value: 52 FTE' },
  { pattern: /3\.0%/g, desc: 'Forbidden value: 3.0%' },
  { pattern: /3\.0 per cent/gi, desc: 'Forbidden value: 3.0 per cent' },
  { pattern: /headcount reduction.*enterprise/gi, desc: 'Unsupported enterprise-wide headcount claim' },
  { pattern: /enterprise.*headcount reduction/gi, desc: 'Unsupported enterprise-wide headcount claim' },
];

// Known exceptions (file:line patterns to skip)
const KNOWN_EXCEPTIONS = [
  { file: 'index.html', pattern: 'REPLACE_WITH_SHA256_HEX', reason: 'Intentional placeholder for access hash - must be set by owner before deployment' },
];

let totalIssues = 0;
let filesScanned = 0;
let issuesByFile = {};

function shouldScan(filePath) {
  const rel = filePath.replace(ROOT, '');
  for (const ex of EXCLUDE_DIRS) {
    if (rel.includes('/' + ex + '/') || rel.includes('\\' + ex + '\\')) return false;
  }
  return SCAN_EXTENSIONS.includes(extname(filePath).toLowerCase());
}

function scanFile(filePath) {
  const rel = filePath.replace(ROOT + '/', '').replace(ROOT + '\\', '').replace(/\\/g, '/');
  let content;
  try {
    content = readFileSync(filePath, 'utf8');
  } catch (e) {
    return;
  }

  const lines = content.split('\n');
  const issues = [];

  lines.forEach(function(line, idx) {
    const lineNum = idx + 1;
    FORBIDDEN.forEach(function(rule) {
      if (rule.pattern.test(line)) {
        rule.pattern.lastIndex = 0;
        // Check known exceptions
        const isException = KNOWN_EXCEPTIONS.some(function(ex) {
          return rel.includes(ex.file) && line.includes(ex.pattern);
        });
        if (!isException) {
          issues.push({ line: lineNum, desc: rule.desc, content: line.trim().slice(0, 100) });
          totalIssues++;
        }
      }
      rule.pattern.lastIndex = 0;
    });
  });

  if (issues.length) {
    issuesByFile[rel] = issues;
  }
  filesScanned++;
}

function walkDir(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch (e) { return; }
  entries.forEach(function(entry) {
    const full = join(dir, entry);
    let stat;
    try { stat = statSync(full); } catch (e) { return; }
    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(entry)) walkDir(full);
    } else if (shouldScan(full)) {
      scanFile(full);
    }
  });
}

console.log('UC3 Content Audit');
console.log('=================');
walkDir(ROOT);

if (Object.keys(issuesByFile).length === 0) {
  console.log('\nFiles scanned: ' + filesScanned);
  console.log('Result: PASS - No content issues found.');
  process.exit(0);
} else {
  console.log('\nFiles scanned: ' + filesScanned);
  console.log('Issues found: ' + totalIssues + '\n');
  Object.entries(issuesByFile).forEach(function([file, issues]) {
    console.log('File: ' + file);
    issues.forEach(function(issue) {
      console.log('  Line ' + issue.line + ': ' + issue.desc);
      console.log('  Content: ' + issue.content);
    });
    console.log('');
  });
  console.log('Known exceptions (documented, not errors):');
  KNOWN_EXCEPTIONS.forEach(function(ex) {
    console.log('  ' + ex.file + ' - ' + ex.pattern + ': ' + ex.reason);
  });
  // Exit 0 if only known exceptions caused matches (already skipped)
  // Exit 1 only on genuine issues
  console.log('\nResult: FAIL - Fix the issues above before deployment.');
  process.exit(1);
}
