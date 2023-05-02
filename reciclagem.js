
const mongoose = require('mongoose');
const reciclagemService = require('./service/reciclagemService.js');

const uri = "mongodb+srv://felipefurukawa:felipefurukawa@cluster0.gsx5rgs.mongodb.net/reciclagem1?retryWrites=true&w=majority";
mongoose.connect(uri).then(async () =>{

    //Criação da reciclagem // Necessário o ID do usuário
    //const resposta = await reciclagemService.reciclagem.criarReciclagem('Papel', 'imagem', 2 , 200, '64360b2bbca1cd3eb1aae09b');
    
    //Achar Reciclagem
    //const resposta = await reciclagemService.reciclagem.acharReciclagem('644a95627c1d381fd16c98d3');
    
    //Atualização dos dados do usuario
    //const resposta = await reciclagemService.reciclagem.atualizarReciclagem('644a95627c1d381fd16c98d3',"Papel", 'imagem', 5 , 400);
   
    //Exclusão dos dados do usuario
    //const resposta = await reciclagemService.reciclagem.deletarReciclagem('644a95627c1d381fd16c98d3');
    console.log(resposta);
})