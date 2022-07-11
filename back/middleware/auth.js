// Token
const jwt = require('jsonwebtoken');

// Vérifie l'authentification utilisateur, pour lui donner l'accès d'afficher, créer, modifier ou supprimer des sauces
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};