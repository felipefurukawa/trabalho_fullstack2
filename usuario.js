
const mongoose = require('mongoose');
const usuarioService = require('./service/usuarioService.js');

const uri = "mongodb+srv://felipefurukawa:felipefurukawa@cluster0.gsx5rgs.mongodb.net/reciclagem1?retryWrites=true&w=majority";
mongoose.connect(uri).then(async () =>{

    //Criar usuário
    //const resposta = await usuarioService.usuario.criarUsuario('Zé', 'orimbundo', 0 ,'-23.56', '-46.69');
    
    //Achar usuário
    //const resposta = await usuarioService.usuario.acharUsuario('64360b2bbca1cd3eb1aae09b');
    
    //Atualização dos dados do usuario
    //const resposta = await usuarioService.usuario.atualizarUsuario('64360b2bbca1cd3eb1aae09b',"Luan", 'clube',0,'12°21','64°40');
   
    //Exclusão dos dados do usuario
    //const resposta = await usuarioService.usuario.deletarUsuario('64499dabf132eeb83a9de13c');
    console.log(resposta);
})