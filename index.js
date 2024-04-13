const { Server } = require('./server')

new Server() // Instanciação da classe Server para executar o servidor

const express = require("express")
const app = express();

const fs = require('fs');
const path = require('path');

//  (   OPCIONAL  )

// const yup = require('yup');

// const produtoSchema = yup.object().shape({
//   nome: yup.string().required(),
//   preço: yup.number().positive().required(),
//   produtoId: yup.number().integer().positive().required(),
// });

// produtoSchema.validate(produtoValido)
//   .then(valid => console.log('Produto válido:', valid))
//   .catch(err => console.error('Erro de validação:', err));

// produtoSchema.validate(produtoInválido)
//   .then(valid => console.log('Produto válido:', valid))
//   .catch(err => console.error('Erro de validação:', err));

app.use(express.json())

app.get("/", (req, res) => {
    res.json("Teste...testando.")
})
// Caminho para o arquivo de log
const logFilePath = path.join(__dirname, './database/dataserver/logs.txt');

// Middleware para registrar informações de cada chamada
function logger(req, res, next) {
    const logMessage = `[${new Date().toISOString()}] - HTTP Request: ${req.method} to endpoint: ${req.url}\n`;

    // Escreva a mensagem de log no arquivo
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo de log:', err);
        }
    });

    next();
}
let produtos = []

app.post("/produtos", logger, (req,res) => {
    const { produto } = req.body
	if (!produto.nome || !produto.preco) {
        return res.status(400).json({ error: "O nome e preço do produto são obrigatórios." });
    } else if ( produto.preco != NaN && produto.preco <= 0) {
        return res.status(400).json( {error: " O preço precisa ser um número maior que zero."})
    }
    
// Auto incremento de ID
	produto.id = produtos.length >  0 ? produtos[produtos.length - 1].id + 1 : 1
    produtos.push(produto)
    res.status(201).send(`Produto adicionado com sucesso: ${JSON.stringify(produto)}`)
})

// Rota para listar todos os produtos
app.get("/info", logger, (req, res) => {
    res.json(produtos)
})

// Rota para encontrar um produto pelo nome (*opcional)
app.get("/busca/:nome", logger, (req, res) => {
    const { nome } = req.params;
    const produtoEncontrado = produtos.find(produto => produto.nome === nome);
    if (!produtoEncontrado) {
        return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.json(produtoEncontrado);
});

// Rota para atualizar produto
app.put("/produtos/:id", logger, (req, res) => {
    const { id } = req.params; // busca pelo ID
    const newData = req.body;
    const index = produtos.findIndex(produto => produto.id === parseInt(id));
    if (index === -1) {
        return res.status(404).send('Produto não encontrado.');
    }
    // Verifica se os dados enviados no corpo da requisição não estão vazios
    if (Object.keys(newData).length === 0) {
        return res.status(400).send('Nenhum dado de produto fornecido para atualização.');
    }
    produtos[index] = { ...produtos[index], ...newData };
    res.status(200).send('Produto atualizado com sucesso.');
});

// Rota para deletar um produto
app.delete('/produto/:id', logger, (req, res) =>{
	const { id } = req.params;		// busca pelo ID
	const index = produtos.findIndex( produto => produto.id === parseInt(id));
	if (index === -1) {
		res.status(404).send('Não foi possível deletar o produto.');
		return;
	}
	produtos.splice(index,1);
	res.status(200).send('O produto foi excluido com sucesso.');
})

app.listen(3420,function(){
    console.log("Servidor funfando ... . .  .")
})