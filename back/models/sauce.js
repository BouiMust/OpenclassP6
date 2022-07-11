// Mongoose
const mongoose = require('mongoose');

// Modèle sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },    // array de strings, avec la liste des userId des users qui ont likes
  usersDisliked: { type: [String] }
  //_id: il sera géneré par le back et attribué à la sauce lors de sa création, unique
});

// Exporte en tant que 'Sauce' dans les autres fichiers
module.exports = mongoose.model('Sauce', sauceSchema);