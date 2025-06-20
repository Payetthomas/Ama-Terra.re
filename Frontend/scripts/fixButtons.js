import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import glob from 'fast-glob';

// Equivalent de __dirname en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fixButtons() {
  console.log('🚀 Script lancé depuis :', process.cwd());

  // Cherche depuis la racine du projet
  const files = await glob(['src/**/*.tsx'], { cwd: process.cwd() });

  console.log(`✅ Fichiers trouvés : ${files.length}`);
  if (files.length === 0) {
    console.log("⚠️ Aucun fichier trouvé. Vérifie le chemin ou le pattern du glob.");
    return;
  }

  for (const filePath of files) {
    const fullPath = path.resolve(process.cwd(), filePath);
    let content = fs.readFileSync(fullPath, 'utf-8');

    const buttonRegex = /<button(?![^>]*\btype=)[^>]*?>/g;

    const updatedContent = content.replace(buttonRegex, (match) => {
      return match.replace('<button', '<button type="button"');
    });

    if (updatedContent !== content) {
      fs.writeFileSync(fullPath, updatedContent, 'utf-8');
      console.log(`✔️ Boutons corrigés dans : ${filePath}`);
    }
  }
}

fixButtons();
