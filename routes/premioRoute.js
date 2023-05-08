const premioService = require ("../service/premioService.js");
const bodyParser = require ('body-parser'); //npm install --save body-parser
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const { body , validationResult , matchedData } = require('express-validator');

const router = express.Router();

router.use(bodyParser.json())

//criar um novo usuário

router.post('/premio', 
    async (req, res) => {
        const validacao = validationResult(req).array();
        console.log(matchedData(req));
       if (validacao.length === 0) {
            const novo = await premioService.premio.criarPremio(req.body.descricao, 
                                                                req.body.quantidade,
                                                                req.body.usuarioId
                                                        );
            res.json({resultado: 'Premio criado!', premio: novo});
     } else {
        res.status(401).json(validacao);
     }
       
})



module.exports = router;