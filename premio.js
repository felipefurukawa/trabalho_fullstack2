
const mongoose = require('mongoose');
const premioService = require('./service/premioService.js')

const uri = "mongodb+srv://felipefurukawa:felipefurukawa@cluster0.gsx5rgs.mongodb.net/reciclagem1?retryWrites=true&w=majority";

mongoose.connect(uri).then(async () =>{

    //Criação do premio - Necessidade de informar id do usuário
    //Descrição do premio; quantidade de pontos; id do usuario
    //const resposta = await premioService.premio.criarPremio('Primeiro Lugar', 2000,'64360b2bbca1cd3eb1aae09b');
    
    //Visualização dos dados do premio
    //const resposta = await premioService.premio.acharPremio('644ab751a7c2dee3f0a9e104');
    
    //Atualização dos dados do premio
    //const resposta = await premioService.premio.atualizarPremio('644ab751a7c2dee3f0a9e104','Segundo Lugar', 2500,'64360b2bbca1cd3eb1aae09b');
   
    //Exclusão dos dados do premio
    //const resposta = await premioService.premio.deletarPremio('644ab751a7c2dee3f0a9e104');
    
    console.log(resposta);
})