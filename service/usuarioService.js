const bcryptjs = require('bcryptjs');
const { json } = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const Usuario = require('../model/usuarioSchema.js');
const NodeGeocoder = require('node-geocoder');
const axios = require('axios');


var usuarios = [];

const criarUsuario = async (nome, senha) => {

    const options = {
        provider: 'openstreetmap'
    };     

    const geocoder = NodeGeocoder(options);    

    const getCoordinates = async () => {
        let latitude = 'Não informado';
        let longitude = 'Não informado';

        const response = await axios.get('http://ip-api.com/json');
        const { lat, lon } = response.data;

        const res = await geocoder.reverse({ lat, lon });
        if (res.length > 0) {
            latitude = lat;
            longitude = lon;
        };
        return {latitude, longitude}
    }  
    const geo = await getCoordinates();

    const usuario = new Usuario({nome: nome, 
                                senha:bcryptjs.hashSync(senha),
                                pontos:0,
                                latitude: geo.latitude,
                                longitude: geo.longitude
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
        return null;
    }
}

const loginUsuario = (nome, senha) => {
    console.log(usuarios)
    if (usuarios[nome]) {
        const valido = bcryptjs.compareSync(senha,usuarios[nome].senha)
        if(valido){
            const token = jsonwebtoken.sign({nome: nome}, process.env.SEGREDO)
            return {valido : true, token:token};
        }else return null;
    } else {
        return false;
    }
}

const alterarSenha = (nome, novaSenha) => {
    console.log(nome, usuarios[nome])
    if(usuarios[nome]) {
        usuarios[nome].senha = novaSenha;
        return true;
    }else{
        return false;
    }
}

const atualizarUsuario = async(usuarioID, nome, senha) =>{

    try {
        const usuario = await Usuario.findById(usuarioID).exec();
        if(usuario){
            const usuario = await Usuario.updateOne({_id: usuarioID},
                                                   {$set:
                                                   {nome: nome,
                                                    senha: senha
                                                    }});

            //console.log(resposta.nome);
            return usuario;
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


module.exports.usuario = {criarUsuario, acharUsuario, loginUsuario, deletarUsuario, alterarSenha, atualizarUsuario, atualizarPontos};
//module.exports.login = login;
//module.exports.alterarSenha = alterarSenha;
