const mongoose = require('mongoose');

// Modèle sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true }, // contiendra le _id de l'user géneré par le back, car seul l'user authentifié pourra créer une sauce et il lui sera attribué son id (identifier le proprietaire de la sauce)
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number},
  dislikes: { type: Number},
  usersLiked: { type: [String]},    // array avec la liste des userId des users qui ont likes
  usersDisliked: { type: [String]}
  //_id: géneré par le back et attribué à la sauce, unique
});

// Exporte en tant que 'Sauce' dans les autres fichiers
module.exports = mongoose.model('Sauce', sauceSchema);