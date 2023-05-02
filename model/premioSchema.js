const mongoose = require('mongoose');


const premioSchema = mongoose.Schema({
    descricao: String,
    pontos: Number,
    quantidade: Number
});

const Premio = mongoose.model('Premio', premioSchema);

module.exports = Premio;