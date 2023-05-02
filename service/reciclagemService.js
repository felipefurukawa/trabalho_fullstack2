const mongoose = require('mongoose');
const Reciclagem = require('../model/reciclagemSchema');
const Usuario = require('../model/usuarioSchema');
const usuarioService = require('../service/usuarioService.js');

const criarReciclagem = async (item, imagem, peso, pontos, usuarioID) => {

    const usuario = await Usuario.findById(usuarioID).exec();
        if(usuario) {
            const reciclagem = new Reciclagem({item: item,
                                                imagem: imagem,
                                                peso: peso,
                                                data: new Date(),
                                                pontos: pontos,
                                                usuario:usuario});


            usuarioService.usuario.atualizarPontos(usuario, reciclagem.pontos);
                                                
            return await reciclagem.save();
        }

        throw new Error('Não foi possível criar uma reciclagem')
}

const acharReciclagem = async (reciclagemID) => {   
    try{
        const reciclagem = await Reciclagem.findById(reciclagemID).exec();

        return reciclagem;
    }catch (error){
        console.log(error);
        console.log("Reciclagem não encontrada!!");
    }
}

const atualizarReciclagem = async(reciclagemID, item, imagem, peso, pontos) =>{

    try {
        const resposta = await Reciclagem.findById(reciclagemID);
        if(resposta){
            const reciclagem = await Reciclagem.updateOne({_id: reciclagemID},
                                                   {$set:
                                                   {item: item,
                                                    imagem: imagem,
                                                    peso: peso,
                                                    pontos: pontos,
                                                    ldata: new Date()}});

            return "atualizacao de reciclagem realizada com sucesso!!";
     }
    } catch (error) {

        console.log(error);
        console.log('Reciclagem não encontrada!!');
    }
}

const deletarReciclagem = async(reciclagemID) =>{
    const reciclagem = await Reciclagem.findById(reciclagemID);
    if(reciclagem){

        const usuarioDelete = await Usuario.findById(reciclagem.usuario).exec();
        await usuarioDelete.reciclagem.pull(reciclagem);
        await Reciclagem.deleteOne({_id: reciclagemID});

        return "Reciclagem deletada";

      } else {
          console.log("id não existe")
      }
}



module.exports.reciclagem = {criarReciclagem, acharReciclagem, atualizarReciclagem, deletarReciclagem};
