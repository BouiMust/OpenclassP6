
const express = require('express');

// Routeur Express pour les sauces
const router = express.Router();

// Importe les controllers et middlewares pour les appliquer aux routes
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes
router.get('/', auth, sauceCtrl.getAllSauce);
//router.get('/:id', auth, stuffCtrl.getOneSauce);
//router.post('/', auth, multer, stuffCtrl.createSauce)
//router.put('/:id', auth, multer, stuffCtrl.updateSauce)
//router.delete('/:id', auth, stuffCtrl.deleteSauce)

// Exporte le routeur Express pour l'app
module.exports = router;
