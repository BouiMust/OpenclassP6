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

/*
// Affiche un sauce de la BDD
exports.getOneSauce = (req, res, next) => {
    console.log('----------------------------');
    console.log('Get one sauce, id dans l\'url :');
    console.log(req.params.id);                // id du sauce qui vient de l'Url
    Sauce.findOne({ _id: req.params.id })      // trouve le sauce qui correspond dans la BDD
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(500).json({ error }));
};


// Enregistre un sauce dans la BDD
exports.createSauce = (req, res, next) => {
    console.log('----------------------------')
    console.log('Post a sauce ')
    const sauceObject = JSON.parse(req.body.sauce);  // données de la req en form-data, contient un objet sauce (json) et un fichier image, on converti l'objet sauce en objet js
    console.log('Objet sauce du form-data, vient de la requête');
    console.log(sauceObject)
    delete sauceObject._id;             // id de sauce, vient du front mais supprimé (il sera généré par le back sous le nom de 'new ObjectId'), apparemment pas besoin de le supprimer il sera remplacé quand même par celui du back
    delete sauceObject._userId;
    const sauce = new Sauce({           // le mot clé 'new' utilisé sur un modèle Mongoose crée par défaut un champ _id
        ...sauceObject,                 // raccourci, fait une copie de tt les elements de sauceObject
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,   // Résoud l'url complète
        userId: req.auth.userId         // userId qui vient du token, on l'attribut au sauce
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
    console.log('Put one sauce, _id dans l\'url :');
    console.log(req.params.id);                // id du sauce qui vient de l'Url
    console.log('userId de la req :')
    console.log(req.body.userId);              // userId du sauce, envoyé par le front mais inutile, mais on prendra l'userId du sauce de la BDD pour comparer avec celui du token
    console.log('id géneré par la requête(front), non pris en compte :');
    console.log(req.body._id);                 // id du sauce envoyé par front, non pris en compte
    console.log('userId du middleware auth, extrait du token :')
    console.log(req.auth.userId)               // userId du token

    const sauceObject = req.file ? {        // Est-ce que la req put comporte un fichier ?
        ...JSON.parse(req.body.sauce),      // si oui, on recupere l'objet sauce du form-data
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };                    // sinon le body de la req
    console.log('Body de la req put :')
    console.log(sauceObject)
    delete sauceObject._userId;                // supprime l'userId du front, pour eviter de remplacer celui du sauce de la BDD
    Sauce.findOne({ _id: req.params.id })        // cherche le sauce dans BDD
        .then((sauce) => {
            if (sauce.userId === req.auth.userId) {    // si le sauce appartient à l'user
                Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // modifie le sauce qui correspond dans la BDD
                    .then(() => res.status(200).json({ message: 'Objet modifié' }))
                    .catch(error => res.status(500).json({ error }));
            } else {
                res.status(401).json({ error });
            }
        })
        .catch((error) => { res.status(500).json({ error }) });
};


// file systeme, pour avoir accès au système de fichiers (ex: ici pour supprimer des fichiers d'un dossier)
const fs = require('fs');

// Supprimer un sauce de la BDD, on supprime aussi son fichier image
exports.deleteSauce = (req, res, next) => {
    console.log('----------------------------');
    console.log('Delete one sauce, id dans l\'url :');
    console.log(req.params.id);                // id du sauce qui vient de l'Url
    console.log('userId de la req :')
    console.log(req.body.userId);              // undefined car il n'y a pas de body dans la req
    console.log('userId du middleware auth, extrait du token :')
    console.log(req.auth.userId)               // userId du token, doit être égale au userId du sauce

    Sauce.findOne({ _id: req.params.id })    // cherche le sauce dans BDD
        .then((sauce) => {
            if (sauce.userId === req.auth.userId) {                    // si sauce n'existe pas
                const filename = sauce.imageUrl.split('/images/')[1];       // sinon supprime l'image
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })     // sinon supprime le sauce                       // modifie le sauce qui correspond dans la BDD
                        .then(() => res.status(200).json({ message: 'Objet supprimé' }))
                        .catch(error => res.status(500).json({ error }));
                })
            }
        })
        .catch(error => res.status(500).json({ error }));
}
*/