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


//Get premio por ID
router.get('/premio/:id', 
    async (req, res) => {
        
        const premioID = req.params._id;
        res.json({resultado: 'Premio encontrado!!!', premio: premioService.premio.acharPremio(premioID)});
});

//Get listagem de todos os prêmios no banco
router.get('/premio', 
    async (req, res) => {

        

            if (validacao) {
                res.status(200).json({premios: premioService.premio.listarPremios, premios: validacao});
            } else {
                return res.status(404).json({ error: 'Deu ruim pra listar os prêmios' });
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
router.put('/premio/:id', (req, res) => {
    const atualizar = premioService.premio.atualizarPremio(req.body.descricao, 
                                                           req.body.quantidade,
                                                           req.body.usuarioId); 
    if(atualizar){
        res.status(200).json({resultado: 'Usuário alterado com sucesso!'});
    } else res.status(404).json({resultado: 'Usuário não encontrado.'});
})


module.exports = router;