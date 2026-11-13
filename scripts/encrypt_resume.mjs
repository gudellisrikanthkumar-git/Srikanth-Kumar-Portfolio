// Encrypts the resume PDF for the password-locked download on the portfolio site.
// Usage (PowerShell):
//   $env:RESUME_PASSWORD = "<password>"; node scripts/encrypt_resume.mjs [path\to\resume.pdf]
// Output: assets/resume/resume.enc  =  salt(16) | iv(12) | AES-256-GCM ciphertext
// Key: PBKDF2-SHA256, 600,000 iterations. Must match assets/js/script.js.
import { readFile, writeFile } from 'node:fs/promises';
import { webcrypto as crypto } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = process.argv[2] || path.join(root, 'assets', 'resume', 'Gudelli_Srikanth_Kumar_Resume.pdf');
const output = path.join(root, 'assets', 'resume', 'resume.enc');
const password = process.env.RESUME_PASSWORD;

if (!password) {
  console.error('Set RESUME_PASSWORD before running.');
  process.exit(1);
}

const pdf = await readFile(input);
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const baseKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: 600000, hash: 'SHA-256' },
  baseKey,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt']
);
const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, pdf));
await writeFile(output, Buffer.concat([salt, iv, cipher]));
console.log(`Encrypted ${path.basename(input)} -> ${path.relative(root, output)} (${cipher.length + 28} bytes)`);
