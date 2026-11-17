const fs = require('fs');
const path = require('path');

const targetDirs = ['dist', 'build', 'node_modules', '.turbo'];

function cleanupDirectory(startPath) {
  if (!fs.existsSync(startPath)) return;
  const files = fs.readdirSync(startPath);
  for (const file of files) {
    const fullPath = path.join(startPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (targetDirs.includes(file)) {
        console.log(`Removing: ${fullPath}`);
        fs.rmSync(fullPath, { recursive: true, force: true });
      } else {
        cleanupDirectory(fullPath);
      }
    }
  }
}

console.log('🧹 Cleaning workspace build caches and outputs...');
cleanupDirectory(path.resolve(__dirname, '..'));
console.log('✨ Cleanup complete.');
