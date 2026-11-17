const fs = require('fs');
const path = require('path');

const moduleName = process.argv[2];

if (!moduleName) {
  console.error('❌ Please provide a module name. Example: node scripts/generate-module.js products');
  process.exit(1);
}

const targetDir = path.join(__dirname, '..', 'apps', 'api', 'src', 'modules', moduleName);
if (fs.existsSync(targetDir)) {
  console.error(`❌ Module "${moduleName}" already exists at ${targetDir}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

const files = {
  [`${moduleName}.controller.js`]: `// ${moduleName} Controller
const service = require('./${moduleName}.service');
const { sendSuccess } = require('../../utils/response');

exports.getAll = async (req, res, next) => {
  try {
    const data = await service.findAll();
    return sendSuccess(res, data, 'Fetched ${moduleName} successfully');
  } catch (err) {
    next(err);
  }
};
`,
  [`${moduleName}.service.js`]: `// ${moduleName} Service
const repository = require('./${moduleName}.repository');

exports.findAll = async () => {
  return await repository.findAll();
};
`,
  [`${moduleName}.repository.js`]: `// ${moduleName} Repository (PostgreSQL Queries)
const db = require('../../config/database');

exports.findAll = async () => {
  const result = await db.query('SELECT * FROM ${moduleName} ORDER BY id DESC LIMIT 50');
  return result.rows;
};
`,
  [`${moduleName}.routes.js`]: `// ${moduleName} Routes
const express = require('express');
const router = express.Router();
const controller = require('./${moduleName}.controller');
const { authenticate } = require('../../middleware/authMiddleware');

router.get('/', authenticate, controller.getAll);

module.exports = router;
`
};

for (const [fileName, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(targetDir, fileName), content.trim() + '\n');
  console.log(`Created: apps/api/src/modules/${moduleName}/${fileName}`);
}

console.log(`✅ Module "${moduleName}" generated successfully! Don't forget to mount it in apps/api/src/routes/index.js`);
