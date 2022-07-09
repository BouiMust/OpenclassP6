// Modèle mongoose
const User = require('../models/user');

// Hash password
const bcrypt = require('bcrypt');

// Token
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    console.log('--------------------------------------------');
    console.log('Post Signup :');
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            console.log('vérifie si email existe dans la BDD...');
            user.save()
                .then((user) => {
                    console.log('User crée et enregistré dans la BDD.');
                    console.log('nouveau _id géneré : ' + user._id);          // _id user géneré à l'inscription et transmis à l'user au login, devient l'userId
                    console.log('hash mdp : ' + user.password);
                })
                .then(() => res.status(201).json({ message: 'Utilisateur créé et enregistré dans la BDD' }))
                .then(() => console.log('passons au login...'))
                .catch(error => {
                    console.log('email déjà existant.');
                    res.status(500).json(error);
                })
        })
        .catch(error => res.status(500).json(error));
};


exports.login = (req, res, next) => {
    console.log('--------------------------------------------');
    console.log('Post Login :');
    console.log(req.body);
    User.findOne({ email: req.body.email }) // trouve l'email de l'user qui correspond
        .then(user => {
            if (!user) {
                console.log('User non enregistré');
                return res.status(401).json({ message: 'User non enregistré dans la BDD' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        console.log('Mot de passe incorrect');
                        return res.status(401).json({ message: 'Mot de passe incorrect' });
                    }
                    console.log('User connecté');
                    console.log('userId : ' + user._id);
                    console.log('token : ' + jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }));
                    res.status(200).json({
                        userId: user._id,         // on envoie au front(user connecté) le _id de l'user géneré par le back, devient userId
                        token: jwt.sign(          // et un token chiffré et composé de l'_id de l'user, se trouvera maintenant dans l'en tete des req de l'user
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
