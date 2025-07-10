const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'templates', 'graphics');
const outputPath = path.join(__dirname, '..', 'src', 'data', 'graphicsTemplates.json');

const templateFolders = fs.readdirSync(basePath).filter(folder =>
  fs.lstatSync(path.join(basePath, folder)).isDirectory()
);

const templates = [];

templateFolders.forEach(folder => {
  const templatePath = path.join(basePath, folder);
  const dataPath = path.join(templatePath, 'data.json');

  if (fs.existsSync(dataPath)) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Automatically collect preview images
    const imageFiles = fs.readdirSync(templatePath)
      .filter(file => /^preview\d+\.(jpg|jpeg|png|webp)$/i.test(file)) // match preview1.jpg, preview2.png, etc.
      .map(file => `/templates/graphics/${folder}/${file}`); // public-facing path

    templates.push({
      id: folder,
      name: data.name,
      description: data.description,
      price: data.price,
      images: imageFiles,
      zipUrl: `/templates/graphics/${folder}/test.zip`
    });
  }
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(templates, null, 2));

console.log('✅ graphicsTemplates.json generated with multiple previews.');
