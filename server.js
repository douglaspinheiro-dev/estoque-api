import dotenv from 'dotenv';
dotenv.config();

import {loggerMiddleware} from './src/middleware/index.js'
import express, { json, urlencoded } from 'express';

const app = express();
const port = 3000;

// Middleware to formatar o body para JSON
app.use(json());
// Para formatar os dados do formulário (x-www-form-urlencoded)
app.use(urlencoded({ extended: true }));

app.use(loggerMiddleware)

app.get('/', function(req,res){
    res.status(200).json({
        "status": "OK",
        "codigo": 200,
        "mensagem": `Bem Vindo`
    })
});

app.post('/produtos', (req,res) => {
    let produto = req.body

    //res.send(`O produto foi criado! Nome: ${produto.nome}, Valor: ${produto.preco}`)
    res.status(201).json({
        "status": "Criado",
        "codigo": 201,
        "mensagem": `O produto foi criado! Nome: ${produto.nome}, Valor: ${produto.preco}`
    })
})

app.put('/produtos/:id',(req,res) =>{
    let id = req.params.id
    let produto = req.body

    res.status(200).json({
        "status": "Alterado",
        "codigo": 200,
        "mensagem": `O produto ${id} foi alterado! Nome: ${produto.nome}, Valor: ${produto.preco}`
    })
})

app.delete('/produtos/:id',(req,res) =>{
    let id = req.params.id
    res.status(200).json({
        "status": "Deletado",
        "codigo": 200,
        "mensagem": `O produto ${id} foi removido`
    })
})

app.listen(port, function(){
    console.log('servidor rodando na porta ' + port)
})
