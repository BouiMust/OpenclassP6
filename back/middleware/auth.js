const jwt = require('jsonwebtoken');

// Vérifie l'authentification user pour lui donner l'autorisation à afficher, créer, modifier ou supprimer des things
module.exports = (req, res, next) => {
    console.log('--------------------------------------------');
    console.log('middleware authentification');
    console.log('Token du headers de la req :')
    console.log(req.headers.authorization.split(' ')[1]);
    console.log('Body de la req :')
    console.log(req.body);
    try {
        const token = req.headers.authorization.split(' ')[1];              // extrait token du header du front
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');      // vérifie et decode
        const userId = decodedToken.userId;                                 // extrait userId
        req.auth = {                                                        // on le stocke dans la requête pour le middleware suivant
            userId: userId
        };
        console.log('User authentifié, Voici le userId extrait du token et stocké dans req.auth :');
        console.log(req.auth);
        next();
    } catch (error) {                                                       // renvoie erreur si aucun token absent ou mauvais
        console.log('User non authentifié, accès refusé');
        res.status(401).json({ error });
    }
};