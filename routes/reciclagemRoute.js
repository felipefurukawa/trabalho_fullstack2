const reciclagemService = require ("../service/reciclagemService.js");
const bodyParser = require ('body-parser'); //npm install --save body-parser
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const { body , validationResult , matchedData } = require('express-validator');

const router = express.Router();

router.use(bodyParser.json());

//cria uma reciclagem
router.post('/reciclagem/:id', async(req, res) => {
            const novo = await reciclagemService.reciclagem.criarReciclagem(req.params.id,
                                                                            req.body.item, 
                                                                            req.body.imagem,
                                                                            req.body.peso,
                                                                            req.body.pontos);
            console.log(novo);
            res.json({resultado: 'Reciclagem criada!', reciclagem: novo});
});





module.exports = router;