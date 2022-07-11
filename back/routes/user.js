// Express
const express = require('express');

// Routeur Express
const router = express.Router();

// Importe les controllers user pour les appliquer aux routes
const userCtrl = require('../controllers/user');

// Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exporte les routes pour l'app
module.exports = router;