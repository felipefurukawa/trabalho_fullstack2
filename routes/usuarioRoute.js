const usuarioService = require ("../service/usuarioService.js");
const bodyParser = require ('body-parser'); //npm install --save body-parser
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const { body , validationResult , matchedData } = require('express-validator');

const router = express.Router();

router.use(bodyParser.json())

//Criar um novo usuário
router.post('/usuario', 
    body('nome').notEmpty().withMessage("Nome inválido"), 
    body('senha').isNumeric().isLength({ min: 6 }).withMessage("A senha deve conter apenas números e ter no mínimo 6 dígitos"),

    async (req, res) => {
        const validacao = validationResult(req).array();
        console.log(matchedData(req));
       if (validacao.length === 0) {
            const novo = await usuarioService.usuario.criarUsuario(req.body.nome, 
                                                           req.body.senha, 
                                                           req.body.pontos,
                                                           req.body.latitude,
                                                           req.body.longitude);
            res.json({resultado: 'Usuário criado!', usuario: novo});
     } else {
        res.status(401).json(validacao);
     }
})

//Get Usuário por ID
router.get('/usuario/:id', 
    async (req, res) => {
        const usuarioID = req.params._id;
        res.json({resultado: 'Usuário encontrado!!!', usuario: usuarioService.usuario.acharUsuario(usuarioID)});
});


//Login de usuário
router.post('/usuario/login', (req, res) =>{
    const login = usuarioService.usuario.loginUsuario(req.body.nome , req.body.senha); 
    if(login.valido){
        res.json(login);
    } else res.status(401).json(login);
})

//Delete de usuário
router.delete('/usuario/:id', (req, res) => {
    const usuarioID = req.params.id;
    const validacao = usuarioService.usuario.deletarUsuario(usuarioID);
    if (!validacao) {
        res.json({ message: 'Usuário deletado com sucesso'});
    } else {
        return res.status(404).json({ error: 'User not found' });
    }
})

//Alterar senha do usuário
router.put('/usuario/novasenha/', (req, res) => {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader.split(" ")[1]
    let decodificado;
    try {
        decodificado = jsonwebtoken.verify(token, process.env.SEGREDO);
   } catch (err){
       res.status(400).json({resultado: 'Problemas para alterar a senha'});
       return;
   }
   const novasenha = req.body.senha;
   console.log(decodificado)
   
   if (usuarioService.usuario.alterarSenha(decodificado.nome, novasenha)) {
       res.json({resultado: 'Senha alterada com sucesso!'});
   } else res.status(400).json({resultado: 'Problemas para alterar a senha'});
})

//Atualizar usuário.
router.put('/usuario/:id', (req, res) => {
    const atualizar = usuarioService.usuario.atualizarUsuario(req.body.nome, 
                                                              req.body.pontos,
                                                              req.body.latitude,
                                                              req.body.longitude); 
    if(atualizar){
        res.json({resultado: 'Usuário alterado com sucesso!'});
    } else res.status(404).json({resultado: 'Usuário não encontrado.'});
})



module.exports = router;

