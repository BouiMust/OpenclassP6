const multer = require('multer');

// Résoud l'extension de fichier
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration : nom de fichier et chemin de stockage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {   // destination -> dossier images
    callback(null, 'images');
  },
  filename: (req, file, callback) => {      // utilise le nom d'origine, en remplaçant les ' ' par '_', en ajoutant une date et l'extension
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// exporte multer configuré (avec la constante storage) et gère seulement les fichiers 'image' 
module.exports = multer({storage: storage}).single('image');