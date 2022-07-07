const express = require('express');
const app = express();

app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bouimust:%3FNHY654321qsd@cluster0.ilyuvmz.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log(error));
//

/*************************************************** */

// Acceder au chemin du serveur
const path = require('path');
// gére la ressource images de manière statique à chaque fois qu'elle reçoit une requête vers la route /images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Importe les routes
const userRoutes = require('./routes/user');

// Utilisation des routes
app.use('/api/auth', userRoutes);


/*************************************************** */

module.exports = app;