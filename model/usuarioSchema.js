const mongoose = require('mongoose');


const usuarioSchema = mongoose.Schema({
    nome: {type: String, required: [true, "Informe o nome do usuário!"]},
    senha: {type: String, required: [true, "Informe a senha!"]},
    pontos: {type: Number, required: [true, "Informe a quantidade de pontos!"]},
    latitude: String,
    longitude: String,
    reciclagem: [ {type: mongoose.Types.ObjectId, ref: "Reciclagem"} ]
    });

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;