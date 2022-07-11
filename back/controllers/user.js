// Modèle mongoose
const User = require('../models/user');

// Hash password
const bcrypt = require('bcrypt');

// Token
const jwt = require('jsonwebtoken');

// Inscription de l'utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
                //_id: géneré par mongoose
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur enregistré' }))
                .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
};


// Authentification de l'utilisateur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur introuvable' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
