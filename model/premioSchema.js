const mongoose = require('mongoose');


const premioSchema = mongoose.Schema({
    descricao: String,
    pontos: Number,
    quantidade: Number,
    usuario: [{type: mongoose.Types.ObjectId, required: true, ref: "Usuario"}]
});

const Premio = mongoose.model('Premio', premioSchema);

module.exports = Premio;