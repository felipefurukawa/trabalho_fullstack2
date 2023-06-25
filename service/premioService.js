const mongoose = require('mongoose');
const Premio = require('../model/premioSchema.js');
const Usuario = require('../model/usuarioSchema.js');

const criarPremio = async (descricao, quantidade, usuarioID) => {

    const usuario = await Usuario.findById(usuarioID).exec();
        if(usuario) {
            const premio = new Premio({descricao: descricao,
                                        quantidade: quantidade,
                                        pontos: pontos,
                                        usuario: null});
            return await premio.save();
        }

        throw new Error('Não foi possível criar um prêmio')
}

const acharPremio = async (premioID) => {   

    try{
        const premio = await Premio.findById(premioID).exec();
        return premio;
    } catch (error){
        console.log(error);
        console.log("Premio não encontrado!!");
    }
}

const listarPremios = async () => {   
    try{
        const premio = await Premio.find().exec();
        return premio;
    }catch (error){
        console.log(error);
        console.log("Não foi possível listar os premios");
    }
}

const atualizarPremio = async(premioID, descricao, quantidade, pontos) =>{
    try {
        const premio = await Premio.findById(premioID).exec();
        if (premio){
                const premio = await Premio.updateOne(  {_id: premioID}, 
                                                        {$set: 
                                                        {descricao: descricao,
                                                        pontos: pontos,
                                                        quantidade: quantidade}});
                return premio;
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
        console.log(premio)

    } else {
        console.log("ID não existe")
    }
}

const acharPremiosPontos = async (pontos) => {
    try{
        const premio = await Premio.find().exec();
        var premioPontos = [];
        for (var i = 0; i < premio.length; i++){
            console.log(premio[i].pontos , pontos)
            if(premio[i].pontos == pontos){
                premioPontos.push(premio[i]);
            }
        }

        return premioPontos;
        
    } catch (error){
        console.log(error);
        console.log("Premio não encontrado!!");
    }
}

const atribuirPremio = async (premioID, usuarioID) => {   
    try{
        session = await mongoose.startSession();
        session.startTransaction();
        const premio = await Premio.findById(premioID).exec();
        const usuario = await Usuario.findById(usuarioID).exec();


        if(premio.usuario === null){
            await Premio.updateOne({_id: premioID}, {$set: {usuario: usuario, quantidade: premio.quantidade - 1}});
            await Usuario.updateOne({_id: usuarioID}, {$set: {pontos: usuario.pontos + premio.pontos}});
            await session.commitTransaction();
            return 200;
        }else{   
            premio.usuario.forEach ( async result => {
                if(result === usuario._id){
                    await Premio.updateOne({_id: premioID}, {$set: {usuario: usuario, quantidade: premio.quantidade - 1}});
                    await Usuario.updateOne({_id: usuarioID}, {$set: {pontos: usuario.pontos + premio.pontos}});
                    await session.commitTransaction();
                    return 200;
                }           
            });
        }      
        return 400;
    }catch (error){
        console.log(error);
    }
}





module.exports.premio = {criarPremio, acharPremio, deletarPremio, atualizarPremio, listarPremios, acharPremiosPontos, atribuirPremio};