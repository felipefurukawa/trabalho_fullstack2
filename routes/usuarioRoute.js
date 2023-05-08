const usuarioService = require ("../service/usuarioService.js");
const bodyParser = require ('body-parser'); //npm install --save body-parser
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const { body , validationResult , matchedData } = require('express-validator');

const router = express.Router();

router.use(bodyParser.json())

//criar um novo usuário
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

router.get('/usuario/:id' , 
    async (req, res) => {
        
        const usuarioId = req.params.id;
        const resposta = await usuarioService.usuario.acharUsuario(usuarioId);

        if (resposta) {
            return res.status(200).json(resposta);
        } else {
            return res.status(404).json({ error: 'Usuário não encontrado'});
        }
})
// Validar login e senha



//Login de usuário
router.post('/usuario/login', (req, res) =>{
    const login = usuarioService.usuario.loginUsuario(req.body.nome , req.body.senha); 
    if(login.valido){
        res.json(login);
    } else res.status(401).json(login);
})

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
    
    if (usuarioController.alterarSenha(decodificado.username, novasenha)) {
        res.json({resultado: 'Senha alterada com sucesso!'});
    } else res.status(400).json({resultado: 'Problemas para alterar a senha'});
})


module.exports = router;

