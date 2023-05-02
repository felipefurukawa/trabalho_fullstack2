const mongoose = require('mongoose');


const reciclagemSchema = mongoose.Schema({
    item: String,
    imagem: String,
    peso: Number,
    data: Date,
    pontos: Number,
    usuario: {type: mongoose.Types.ObjectId, required: true, ref: "Usuario"}
});

const Reciclagem = mongoose.model('Reciclagem', reciclagemSchema);

module.exports = Reciclagem;