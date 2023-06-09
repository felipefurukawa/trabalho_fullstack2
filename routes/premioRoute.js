const premioService = require ("../service/premioService.js");
const bodyParser = require ('body-parser'); //npm install --save body-parser
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const { body , validationResult , matchedData } = require('express-validator');

const router = express.Router();

router.use(bodyParser.json())

//criar um novo premio
router.post('/premio', 
    async (req, res) => {
        const validacao = validationResult(req).array();
        console.log(matchedData(req));
       if (validacao.length === 0) {
            const novo = await premioService.premio.criarPremio(req.body.descricao, 
                                                                req.body.quantidade,
                                                                req.body.pontos,
                                                                req.body.usuarioId
                                                        );
            res.json({status: 200 , premio: premio});

        } else res.json({status: 400 , premio: premio});
});

//Get premio por id
router.get('/premio/:id', async (req, res) => {

    const premio = await premioService.premio.acharPremio(req.params.id);
    if(premio){
        res.json({resultado: 'Premio encontrado!!!', premio: premio});
    } else{
        res.status(404).json({ resultado: 'ERRO!! Premio não encontrado!' });
    }      
});

//Delete de premio
router.delete('/premio/:id', (req, res) => {
    const premioID = req.params.id;
    const validacao = premioService.premio.deletarPremio(premioID);
    if (!validacao) {
        res.status(404).json({ status: 400 });
    } else {
        res.json({status: 200, validacao: validacao});
    }
})

//Atualizar premio.
router.put('/premio/:id', async(req, res) => {

    const validacao = validationResult(req).array();
        if (validacao.length === 0) {
            const atualizar = await premioService.premio.atualizarPremio(
                                                                    req.params.id,
                                                                    req.body.descricao, 
                                                                    req.body.pontos,
                                                                    req.body.quantidade); 
            res.json({status: atualizar});
        } else res.status(401).json({resultado: 'Não foi possível atualizar o premio.'});
})

//Get all premios.
router.get('/premio', async(req, res) => {

    const premios = await premioService.premio.listarPremios();
    if(premios){
        res.json({resultado: 'Premios encontrados.', premios: premios});
    } else{
        res.status(404).json({ resultado: 'Não há premios cadastrados.' });
    }
})

//Get all premios por pontos necessarios
router.get('/premio/disponivel/:pontos', async(req, res) => {
    const premios = await premioService.premio.acharPremiosPontos(req.params.pontos);
    if(premios){
        res.json({resultado: 'Premio encontrado!!!', premios: premios});
    } else{
        res.status(404).json({ resultado: 'ERRO!! Não existem premios com essa quantidade de pontos!' });
    }
});





module.exports = router;