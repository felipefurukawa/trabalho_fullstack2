const express = require ('express');
const mongoose = require ('mongoose');
const usuarioRoute = require('./routes/usuarioRoute.js');
const premioRoute = require('./routes/premioRoute.js');
const reciclagemRoute = require('./routes/reciclagemRoute.js');

const app = express();

//habilita a rota para usuários
app.use(usuarioRoute);
//habilita a rota para premio
app.use(premioRoute);
//habilita a rota para reciclagem
app.use(reciclagemRoute);

app.use((req, res) => {
    res.status(404).json({msg: "Endpoint inexistente!"})
})

const URL = "mongodb+srv://felipefurukawa:felipefurukawa@cluster0.gsx5rgs.mongodb.net/reciclagem2?retryWrites=true&w=majority";

mongoose.connect(URL).then(() => {
    app.listen(7000, () => console.log('Servidor iniciado...'))
}).catch((err) => console.log(err));
