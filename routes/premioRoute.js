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
                                                                req.body.usuarioId
                                                        );
            res.json({resultado: 'Premio criado!', premio: novo});
     } else {
        res.status(401).json(validacao);
     }
       
})

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
        return res.status(404).json({ error: 'Prêmio não encontrado' });
    } else {
        res.status(200).json({ message: 'Premio deletado com sucesso'});
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
            res.json({resultado: 'Premio atualizado!!!', premio: atualizar});
        } else res.status(401).json({resultado: 'Não foi possível atualizar o premio.'});
})




module.exports = router;