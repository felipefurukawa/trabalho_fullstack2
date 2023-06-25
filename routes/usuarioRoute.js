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
                                                           );
            res.json({status: 200, usuario: novo});
     } else {
        res.json({status: 400});
     }
})

//Get Usuário por ID
router.get('/usuario/:id', async (req, res) => {
        const usuario = await usuarioService.usuario.acharUsuario(req.params.id);
        if(usuario){
            res.json({status: 200, usuario: usuario});
        } else{
            res.status(404).json({ status: 400 });
        }
});



//Login de usuário
router.post('/usuario/login', (req, res) =>{
    const usuario = usuarioService.usuario.loginUsuario(req.body.nome , req.body.senha); 
    if(usuario){
        res.json({status: 200 , usuario: usuario});
    } else res.json({status: 400 , usuario: usuario});
})

//Delete de usuário
router.delete('/usuario/:id', (req, res) => {
    const usuarioID = req.params.id;
    const validacao = usuarioService.usuario.deletarUsuario(usuarioID);
    if (!validacao) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    } else {
        res.status(200).json({ message: 'Usuário deletado com sucesso'});
    }
})


//Atualizar usuário.
router.put('/usuario/:id', body('senha').isLength({min: 6}).withMessage("A senha deve ter pelo menos 6 digitos"), async(req, res) => {

    const validacao = validationResult(req).array();
        if (validacao.length === 0) {
            const atualizar = await usuarioService.usuario.atualizarUsuario(
                                                                    req.params.id,
                                                                    req.body.nome, 
                                                                    req.body.senha,
                                                                    ); 
            
            res.json({resultado: 'Usuario atualizado!!!', usuario: atualizar});
        } else res.status(401).json({resultado: 'Usuário não encontrado.'});
})


//Alterar senha do usuário
/* router.put('/usuario/novasenha/', (req, res) => {
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
   const novaSenha = req.body.senha;
   console.log(decodificado)

   const atualizado = usuarioService.usuario.alterarSenha(decodificado.nome, novaSenha);
   if (!atualizado) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    } else {
    res.status(200).json({ message: 'Usuário alterado com sucesso'});
}

}) */


module.exports = router;

