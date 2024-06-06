import express from 'express'//importanto biblioteca

const app = express()
app.use(express.json())//avisando que vai chegar no express json

const users = [] //criando variavel users

app.post('/usuarios', (req , res)=> {

    users.push(req.body)// rotas tipo polt salvando usuarios dentro da variavel

    res.status(201).json(req.body)//criando requisição req

})//criando usuarios metodo post

app.get('/usuarios', (req, res) => {
    res.status(200).json(users)//rotas respondendo com estatus enviando resposta com json listagem
})//criando rota tipo get listar

app.listen(3000)//porta servidor que vai rodar