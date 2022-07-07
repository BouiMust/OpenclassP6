/*
const express = require('express');

// Routeur Express pour les things
const router = express.Router();

// Importe les controllers et middlewares pour les appliquer aux routes
const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes
router.get('/', auth, stuffCtrl.getAllThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.post('/', auth, multer, stuffCtrl.createThing)
router.put('/:id', auth, multer, stuffCtrl.updateThing)
router.delete('/:id', auth, stuffCtrl.deleteThing)

// Exporte le routeur Express pour l'app
module.exports = router;
*/