// Modèle mongoose
const Sauce = require('../models/sauce');

// Affiche toutes les sauces de la BDD
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(500).json({ error }));
};


// Affiche une sauce de la BDD
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(500).json({ error }));
};


// Enregistre une sauce dans la BDD
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject.userId;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: req.auth.userId,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
        //_id: géneré par mongoose
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce créee' }))
        .catch(error => res.status(500).json({ error }));
};


// Modifier une sauce de la BDD
exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete sauceObject._userId;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId === req.auth.userId) {
                Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
                    .catch(error => res.status(500).json({ error }));
            } else {
                return res.status(401).json({ message: 'Non autorisé' });
            }
        })
        .catch(error => res.status(500).json({ error }));
};


// Like/Dislike une sauce
exports.likeSauce = (req, res, next) => {
    if (req.auth.userId !== req.body.userId) {
        return res.status(401).json({ message: 'Non autorisé' });
    }
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const likeObject = {
                likes: sauce.likes,
                dislikes: sauce.dislikes,
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked
            }
            if (likeObject.usersLiked.indexOf(req.auth.userId) >= 0) {
                likeObject.likes -= 1;
                likeObject.usersLiked.splice(likeObject.usersLiked.indexOf(req.auth.userId), 1);
            }
            if (likeObject.usersDisliked.indexOf(req.auth.userId) >= 0) {
                likeObject.dislikes -= 1;
                likeObject.usersDisliked.splice(likeObject.usersLiked.indexOf(req.auth.userId), 1);
            }
            switch (req.body.like) {
                case 1:
                    likeObject.likes += 1;
                    likeObject.usersLiked.push(req.auth.userId);
                    break;
                case -1:
                    likeObject.dislikes += 1;
                    likeObject.usersDisliked.push(req.auth.userId);
                    break;
                case 0:
                    break;
            }
            Sauce.updateOne({ _id: req.params.id }, { ...likeObject, _id: req.params.id })
                .then(() => res.status(201).json({ message: 'Like modifié' }))
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }))
}


// file systeme, pour avoir accès au système de fichiers
const fs = require('fs');

// Supprimer une sauce de la BDD
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId === req.auth.userId) {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce supprimée' }))
                        .catch(error => res.status(500).json({ error }));
                });
            } else {
                return res.status(401).json({ message: 'Non autorisé' });
            }
        })
        .catch(error => res.status(500).json({ error }));
}