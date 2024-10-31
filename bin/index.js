#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const [parentName, readableName, targetDirArg] = process.argv.slice(2);


const showSyntax = () => {
  console.log("Syntax: sgmodgen [modname] [readable_name] [target_dir]");
  console.log('E.g: sgmodgen sgelectronconfig "Electron Configuration"  ./mod/');
  console.log('E.g: sgmodgen sgelectronconfig "Electron Configuration"  /Applications/MAMP/htdocs/schoolgram-web/mod/');
}

if (!parentName || !readableName || !targetDirArg) {
  console.error("Could not parse arguments");
  showSyntax();
  process.exit(1);
} 


function getFormattedDate() {
    const date = new Date();
    
    const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 
    
    return `${year}${month}${day}00`;
}

const formattedDate = getFormattedDate();

const targetDir = path.resolve(path.join(targetDirArg || '', parentName));

const readTemplate = (templatePath) => {
  const fullPath = path.join(__dirname, '../templates', templatePath);
  let content = fs.readFileSync(fullPath, 'utf8');

  content = content.replace(/#MODNAME#/g, parentName);
  content = content.replace(/#MODNAMECAPITAL#/g, parentName.toUpperCase());
  content = content.replace(/#READABLEMODNAME#/g, readableName);
  content = content.replace(/#VERSION#/g, formattedDate);

  return content;
};

const createFileFromTemplate = (relativePath, templatePath) => {
  const filePath = path.join(targetDir, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  if(templatePath) {
    const content = readTemplate(templatePath);
    fs.writeFileSync(filePath, content, 'utf8');
  } else {
    fs.writeFileSync(filePath, '', 'utf8');
  }
};

const createStructure = () => {
  createFileFromTemplate(`backup/backup_${parentName}_activity_task.class.php`,'backup_activity_task.class.php.template');
  createFileFromTemplate(`backup/backup_${parentName}_stepslib.php`,'backup_stepslib.php.template');
  createFileFromTemplate(`backup/restore_${parentName}_activity_task.class.php`,'restore_activity_task.class.php.template');
  createFileFromTemplate(`backup/restore_${parentName}_stepslib.php`,'restore_activity_task.class.php.template');

  createFileFromTemplate('classes/render/renderer.php', 'renderer.php.template');
  createFileFromTemplate('classes/api.php', 'api.php.template');
  createFileFromTemplate(`classes/${parentName}_api.php`, 'generic_api.php.template');

  createFileFromTemplate('db/access.php', 'access.php.template');
  createFileFromTemplate('db/install.xml', 'install.xml.template');
  createFileFromTemplate('db/upgrade.php', 'upgrade.php.template');

  createFileFromTemplate(`lang/en/${parentName}.php`, 'langen.php.template');
  createFileFromTemplate(`lang/ur/${parentName}.php`, '');

  createFileFromTemplate('library/js/index.js', 'index.js.template');
  createFileFromTemplate('library/js/initializeData.js', 'initializeData.js.template');
  createFileFromTemplate('library/js/styles.js', 'styles.js.template');
  createFileFromTemplate('library/js/utils.js', '');
  createFileFromTemplate('library/js/src/App.jsx', 'App.jsx.template');

  createFileFromTemplate('pix/icon.svg', 'icon.svg.template');

  createFileFromTemplate('templates/form.mustache', 'form.mustache.template');

  createFileFromTemplate('version.php', 'version.php.template');
  createFileFromTemplate('mod_form.php', 'mod_form.php.template');
  createFileFromTemplate('view.php', 'view.php.template');
  createFileFromTemplate('lib.php', 'lib.php.template');
  createFileFromTemplate('styles.css', '');
};

createStructure();
console.log(`Boilerplate structure created in ${targetDir}`);
