// Mongoose
const mongoose = require('mongoose');

// Mongoose unique validator
const uniqueValidator = require('mongoose-unique-validator');

// Modèle user
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //_id: il sera géneré par le back et attribué au user à l'inscription (signup), deviendra ensuite l'userId à l'authentification (login)
});

// Applique l'email unique
userSchema.plugin(uniqueValidator);

// Exporte en tant que 'User' dans les autres fichiers
module.exports = mongoose.model('User', userSchema);