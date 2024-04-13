# Instruções do Exercício:
Funcionalidades do CRUD:

## Criar Produto:
Crie uma rota POST para adicionar um novo produto.
A rota deve receber um JSON com os dados do produto (por exemplo, nome, preço, descrição) para esta rota.
O servidor deve validar os dados recebidos e adicionar o produto a uma lista temporária. (🤓)

## Listar Produtos:
Crie uma rota GET para obter todos os produtos.
O servidor deve retornar a lista de produtos em formato JSON. (🤓)

## Atualizar Produto:
Crie uma rota PUT para atualizar um produto existente.
A rota deve receber um JSON com os dados atualizados do produto, incluindo o ID do produto a ser atualizado.
O servidor deve encontrar o produto na lista pelo ID e atualizar seus dados. (🤓)

## Excluir Produto:
Crie uma rota DELETE para excluir um produto existente.
A rota deve receber o ID do produto a ser excluído.
O servidor deve encontrar o produto na lista pelo ID e removê-lo. (🤓)

## Testando com o Postman:
Monte uma coleção no Postman para realizar as operações CRUD.
As rotas devem enviar requisições para as rotas criadas, usando os métodos HTTP corretos (POST, GET, PUT, DELETE). (🤓)

## Aplicando Middlewares:
Adicione Middlewares nas rotas para logar as informações de cada chamada realizada. (🤓)

## Recursos Adicionais (opcional):
Você pode adicionar validação de entrada para garantir que os dados enviados para o servidor sejam válidos.
Também pode implementar um mecanismo de persistência simples, usando um array em memória para armazenar os produtos.
Os alunos podem experimentar com outros tipos de requisições, como PATCH para atualizações parciais ou OPTIONS para obter informações sobre as rotas disponíveis.