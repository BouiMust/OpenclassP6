const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Modèle user
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //_id: géneré par le back et attribué au user au signup, devient ensuite l'userId
});

// Applique l'email unique
userSchema.plugin(uniqueValidator);

// Exporte en tant que 'User' dans les autres fichiers
module.exports = mongoose.model('User', userSchema);