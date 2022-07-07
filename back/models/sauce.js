const mongoose = require('mongoose');

// Modèle sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true }, // contiendra le _id de l'user géneré par le back, car seul l'user authentifié pourra créer un thing et il lui sera attribué son id (identifier le proprietaire du thing)
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number},
  dislikes: { type: Number},
  usersLiked: { type: String}, // array userId des users qui ont likes
  usersDisliked: { type: String} // array userId des users qui ont dislikes
  //_id: géneré par le back et attribué au thing, unique
});

// Exporte en tant que 'Thing' dans les autres fichiers
module.exports = mongoose.model('Sauce', sauceSchema);