const bcryptjs = require('bcryptjs');
const { json } = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const Usuario = require('../model/usuarioSchema.js');

var usuarios = [];

const criarUsuario = async (nome, senha, pontos, latitude, longitude) => {
    const usuario = new Usuario({nome: nome, 
                                senha:bcryptjs.hashSync(senha),
                                pontos:pontos,
                                latitude:latitude,
                                longitude:longitude
    });
        if(usuario) {

            usuarios[nome] = {senha: bcryptjs.hashSync(senha)}
            const ret = await usuario.save();
            return ret;

        }
        throw new Error('Não foi possível criar um usuário')
       
}

const acharUsuario = async (usuarioID) => {   
    try{
        const usuario = await Usuario.findById(usuarioID).exec();
        return usuario;

    }catch (error){
        
        console.log(error);
        console.log("Usuario não encontrado!!");
    }
}

const loginUsuario = (nome, senha) => {
    console.log(usuarios)
    if (usuarios[nome]) {
        const valido = bcryptjs.compareSync(senha,usuarios[nome].senha)
        if(valido){
            const token = jsonwebtoken.sign({nome: nome}, process.env.SEGREDO)
            return {valido : true, token:token};
        }else return{valido :false};
    } else {
        return false;
    }
}

const atualizarUsuario = async(usuarioID, nome, senha, pontos, latitude, longitude ) =>{

    try {
        const resposta = await Usuario.findById(usuarioID);
        if(resposta){
            const usuario = await Usuario.updateOne({_id: usuarioID},
                                                   {$set:
                                                   {nome: nome,
                                                    senha: senha,
                                                    pontos: pontos,
                                                    latitude: latitude,
                                                    longitude:longitude}});

            //console.log(resposta.nome);
            return "atualizacao de " + resposta.nome + " realizada com sucesso!!";
     }
    } catch (error) {

        console.log(error);
        console.log('Usuario não encontrado!!');
    }
}

const deletarUsuario = async(usuarioID) =>{
    const verificacao = await Usuario.findById(usuarioID);
    if(verificacao){
        const usuario = await Usuario.deleteOne({_id:usuarioID});
          console.log(usuario)

      } else {
          console.log("ID não existe")
      }
}

const atualizarPontos = async (usuario, pontos) => {    
    try{
        session = await mongoose.startSession();
        session.startTransaction();

        usuario.pontos = usuario.pontos + pontos;        
        
        await session.commitTransaction();
        console.log (usuario.nome +", Pontos atuais: " + usuario.pontos);
        
    }catch (error){
        console.log(error);
        session.abortTransaction();

    }finally{

        if(session){
            session.endSession();
        }
    }
}


module.exports.usuario = {criarUsuario, acharUsuario, loginUsuario, deletarUsuario};
//module.exports.login = login;
//module.exports.alterarSenha = alterarSenha;
