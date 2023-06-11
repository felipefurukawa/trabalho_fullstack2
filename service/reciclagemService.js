const mongoose = require('mongoose');
const Reciclagem = require('../model/reciclagemSchema.js');
const Usuario = require('../model/usuarioSchema.js');
const Premio = require('../model/premioSchema.js');


const criarReciclagem = async (usuarioID, item, imagem, peso, pontos) => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const usuario = await Usuario.findById(usuarioID).exec();
        if(usuario){
            let reciclagem = new Reciclagem({usuarioID: usuarioID, item: item, imagem: imagem, peso: peso, data: new Date(), pontos: pontos});
            reciclagem = await reciclagem.save({session: session});
            usuario.reciclagem.push(reciclagem);
            await usuario.save({session: session});
            await session.commitTransaction();
            return reciclagem;
        }
        
    } catch (error) {
        console.log(error);
        session.abortTransaction();
    } finally {
        if (session) {
            session.endSession();
        }
    }
    
}

const acharTodasReciclagens = async (usuarioID) => {

    try{
        const usuario = await Usuario.findById(usuarioID).exec();
        const reciclagens = await Reciclagem.find({usuarioID: { $in: usuario}})

        return reciclagens;
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

const visualizarPontosPeso = async () => {   
    try{
        const reciclagem = await Reciclagem.find().exec();

        var pontos = 0;
        var peso = 0;
        for(var i = 0; i < reciclagem.length; i++){
            pontos += reciclagem[i].pontos;
            peso += reciclagem[i].peso;
        }
        const totais = [pontos, peso];
        return totais;

    }catch (error){
        console.log(error);
        console.log("Reciclagem não encontrada!!");
    }
}



module.exports.reciclagem = {criarReciclagem, acharTodasReciclagens, visualizarPontosPeso, atualizarReciclagem, deletarReciclagem};
