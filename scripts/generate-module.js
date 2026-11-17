const fs = require('fs');
const path = require('path');

const moduleName = process.argv[2];

if (!moduleName) {
  console.error('❌ Please provide a module name. Example: node scripts/generate-module.js products');
  process.exit(1);
}

const targetDir = path.join(__dirname, '..', 'apps', 'server', 'src', 'modules', moduleName);
if (fs.existsSync(targetDir)) {
  console.error(`❌ Module "${moduleName}" already exists at ${targetDir}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

const files = {
  [`${moduleName}.controller.ts`]: `// ${moduleName} Controller (TypeScript)
import { Request, Response, NextFunction } from 'express';
import * as service from './${moduleName}.service';
import { sendSuccess } from '../../utils/response';

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.findAll();
    return sendSuccess(res, data, 'Fetched ${moduleName} successfully');
  } catch (err) {
    next(err);
  }
};

export default { getAll };
`,
  [`${moduleName}.service.ts`]: `// ${moduleName} Service (TypeScript)
import * as repository from './${moduleName}.repository';

export const findAll = async () => {
  return await repository.findAll();
};

export default { findAll };
`,
  [`${moduleName}.repository.ts`]: `// ${moduleName} Repository (PostgreSQL Queries - TypeScript)
import { query } from '../../config/database';

export const findAll = async () => {
  const result = await query('SELECT * FROM ${moduleName} ORDER BY id DESC LIMIT 50');
  return result.rows;
};

export default { findAll };
`,
  [`${moduleName}.routes.ts`]: `// ${moduleName} Routes (TypeScript)
import { Router } from 'express';
import * as controller from './${moduleName}.controller';
import { authenticate } from '../../middleware/authMiddleware';

export const router = Router();
router.get('/', authenticate, controller.getAll);

export default router;
`
};

for (const [fileName, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(targetDir, fileName), content.trim() + '\n');
  console.log(`Created: apps/server/src/modules/${moduleName}/${fileName}`);
}

console.log(`✅ Module "${moduleName}" generated successfully! Don't forget to mount it in apps/server/src/routes/index.ts`);
