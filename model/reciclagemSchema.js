const mongoose = require('mongoose');


const reciclagemSchema = mongoose.Schema({
    usuarioID: {type: mongoose.Types.ObjectId, required: true, ref: "Usuario"},
    item: String,
    imagem: String,
    peso: Number,
    data: Date,
    pontos: Number
    
});

const Reciclagem = mongoose.model('Reciclagem', reciclagemSchema);

module.exports = Reciclagem;