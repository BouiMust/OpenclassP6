const jwt = require('jsonwebtoken');

// Vérifie l'authentification user pour lui donner l'autorisation à afficher, créer, modifier ou supprimer des things
module.exports = (req, res, next) => {
    console.log('--------------------------------------------');
    console.log('Authentification avant CRUD :');
    console.log('Token du headers de la req :')
    console.log(req.headers.authorization.split(' ')[1]);
    console.log('Body de la req si post/put :')
    console.log(req.body);
    try {
        const token = req.headers.authorization.split(' ')[1];              // extrait token du header du front
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');      // vérifie et decode si ok
        const userId = decodedToken.userId;                                 // extrait userId
        req.auth = {                                                        // on stocke l'userId dans la requête pour le middleware suivant
            userId: userId
        };
        console.log('User authentifié.');
        console.log('Voici le userId extrait du token :');
        console.log(req.auth);
        console.log('Il est stocké dans req.auth pour le middleware CRUD suivant :');
        next();
    } catch (error) {                                                       // renvoie erreur si aucun token absent ou mauvais
        console.log('User non authentifié, accès refusé');
        res.status(401).json({ error });
    }
};