// Modèle mongoose
const Sauce = require('../models/sauce');

// Affiche tous les sauces de la BDD
exports.getAllSauce = (req, res, next) => {
    console.log('----------------------------')
    console.log('Get all sauces')
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(500).json({ error }));
};


// Affiche une sauce de la BDD
exports.getOneSauce = (req, res, next) => {
    console.log('----------------------------');
    console.log('Get one sauce, id en param url :');
    console.log(req.params.id);                // id du sauce qui vient de l'Url
    Sauce.findOne({ _id: req.params.id })      // trouve le sauce qui correspond dans la BDD
        .then(sauce => {
            console.log('Voici la sauce demandée :');
            console.log(sauce);
            res.status(200).json(sauce)
        })
        .catch(error => res.status(500).json({ error }));
};


// Enregistre un sauce dans la BDD
exports.createSauce = (req, res, next) => {
    console.log('----------------------------')
    console.log('Post a sauce ')
    const sauceObject = JSON.parse(req.body.sauce);  // données de la req en form-data, contient un objet sauce (json) et un fichier image, on converti l'objet sauce en objet js
    delete sauceObject._id;             // id de sauce, vient du front mais supprimé (il sera généré par le back sous le nom de 'new ObjectId'), apparemment pas besoin de le supprimer il sera remplacé quand même par celui du back
    delete sauceObject.userId;
    console.log('Objet sauce du form-data, vient de la requête');
    console.log(sauceObject)    
    const sauce = new Sauce({           // le mot clé 'new' utilisé sur un modèle Mongoose crée par défaut un champ _id
        ...sauceObject,                 // raccourci, fait une copie de tt les elements de sauceObject
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,   // Résoud l'url complète
        userId: req.auth.userId,         // userId qui vient du token, on l'attribut au sauce
        likes: 0,       // 0 like à la creation de la sauce
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
        //_id: géneré par le back           
    });
    console.log('sauce crée avec nouveau _id :')
    console.log(sauce)
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet crée et enregistré dans la BDD' }))
        .catch(error => res.status(500).json({ error }));
};


// Modifier un sauce de la BDD
exports.updateSauce = (req, res, next) => {
    console.log('----------------------------');
    console.log('Put one sauce, id en param url :');
    console.log(req.params.id);                // id de la sauce Url
    //console.log('userId de la req :')
    //console.log(req.body.userId);              // userId du sauce, envoyé par le front mais inutile, mais on prendra l'userId du sauce de la BDD pour comparer avec celui du token
    console.log('userId du middleware auth, extrait du token :')
    console.log(req.auth.userId)               // userId du token
    const sauceObject = req.file ? {        // Est-ce que la req put comporte un fichier ?
        ...JSON.parse(req.body.sauce),      // si oui, on recupere l'objet sauce du form-data
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`    
    } : { ...req.body };                    // sinon le body de la req
    delete sauceObject._userId;                   // supprime l'userId du front, car deja présent et pour eviter d'alterer celui de la sauce de la BDD
    console.log('Body req put :')
    console.log(sauceObject)
    Sauce.findOne({ _id: req.params.id })         // cherche la sauce dans BDD
        .then((sauce) => {
            console.log('Est-ce que userId de la sauce en BDD = userId du token ?');
            if (sauce.userId === req.auth.userId) {    // si la sauce appartient à l'user
                Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // modifie la sauce qui correspond dans la BDD
                    .then(() => {
                        console.log('Oui. Sauce mis à jour :');
                        console.log(sauce);
                        res.status(200).json({ message: 'Objet modifié' });
                    })
                    .catch(error => res.status(500).json({ error }));
            } else {
                console.log('Non. Accès refusé.');
                return res.status(401).json({ message: 'Non autorisé.' });                      // sinon retourne code 401 accès refusé
            }
        })
        .catch(error => res.status(500).json({ error }));
};


// file systeme, pour avoir accès au système de fichiers (ex: ici pour supprimer des fichiers d'un dossier)
const fs = require('fs');

// Supprimer un sauce de la BDD, on supprime aussi son fichier image
exports.deleteSauce = (req, res, next) => {
    console.log('----------------------------');
    console.log('Delete one sauce, id en param url :');
    console.log(req.params.id);                // id du sauce qui vient de l'Url
    console.log('userId du middleware auth, extrait du token :')
    console.log(req.auth.userId)               // userId du token, doit être égale au userId du sauce
    Sauce.findOne({ _id: req.params.id })    // cherche le sauce dans BDD
        .then((sauce) => {
            console.log('voici userId de la sauce :');
            console.log(sauce.userId);
            console.log('Est-ce que userId de la sauce en BDD = userId du token ?');
            if (sauce.userId === req.auth.userId) {                         // Est-ce le proprietaire de la sauce ?
                console.log('Oui');
                const filename = sauce.imageUrl.split('/images/')[1];       // si oui, supprime l'image
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })                 // et la sauce
                        .then(() => {
                            console.log('La sauce est supprimée.');
                            res.status(200).json({ message: 'Objet supprimé' });
                        })
                        .catch(error => res.status(500).json({ error }));
                });
            } else {
                console.log('Non. Accès refusé.');
                return res.status(401).json({ message: 'Non autorisé.' });  // sinon retourne code 401 accès refusé
            }
        })
        .catch(error => res.status(500).json({ error }));
}