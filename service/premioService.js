const mongoose = require('mongoose');
const Premio = require('../model/premioSchema.js');
const Usuario = require('../model/usuarioSchema.js');

const criarPremio = async (descricao, quantidade, usuarioID) => {

    const usuario = await Usuario.findById(usuarioID).exec();
        if(usuario) {
            const premio = new Premio({descricao: descricao,
                                        quantidade: quantidade,
                                        pontos: usuario.pontos,
                                        usuario: usuario});
                 
            return await premio.save();
        }

        throw new Error('Não foi possível criar um prêmio')
}

const acharPremio = async (premioID) => {   
    try{
        const premio = await Premio.findById(premioID).exec();

        return premio;
    }catch (error){
        console.log(error);
        console.log("Premio não encontrado!!");
    }
}

const atualizarPremio = async(premioID, descricao, quantidade, usuarioID) =>{

    try {
        const premio = await Premio.findById(premioID).exec();
        const usuario = await Usuario.findById(usuarioID).exec();
        if (premio && usuario){
                const premio = await Premio.updateOne({_id: premioID}, 
                                                        {$set: 
                                                        {descricao: descricao,
                                                        quantidade: quantidade, 
                                                        pontos: usuario.pontos, 
                                                        usuario: usuario}});


                return "Premio atualizado!";
            }
    } catch (error) {

        console.log(error);
        console.log('Premio não encontrado!!');
    }
}

const deletarPremio = async(premioID) =>{
    const verificacao = await Premio.findById(premioID);
    if(verificacao){
        const premio = await Premio.deleteOne({_id: premioID});
        
        return "Premio deletado!!";

      } else {
          console.log("id não existe")
      }
}





module.exports.premio = {criarPremio, acharPremio, atualizarPremio, deletarPremio};