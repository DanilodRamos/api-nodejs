import express from 'express'
import cors from 'cors'                      //importanto biblioteca
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()                   //variavel e importacao biblioteca prisma

const app = express()
app.use(express.json())
app.use(cors())                    //avisando que vai chegar no express json
//criando usuarios post
app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        },

    })// mandando dentro do banco de dados essas requisiçoes

    res.status(201).json(req.body)//criando requisição req

})

app.get('/usuarios', async (req, res) => {//listando usarios buscando  por idade ,nomees fazendo filtros

    let users = []
    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })

    } else {
        users = await prisma.user.findMany()
    }


    res.status(200).json(users)
})
//atualizando usuaris  put update
app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({                      //prisma atualiza o usuario
        where: {
            id: req.params.id,
        },                                 //quem vou atualizar
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        },                                        //informacoes novas

    })                                               // mandando dentro do banco de dados essas requisiçoes

    res.status(201).json(req.body)              //criando requisição req
})                                              //criando usuarios metodo post

//criando rota tipo deletar
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id //deleta pelo id
        }
    })
    res.status(200).json({ message: "Usuario deletado com sucesso!" })//deletando usuario pelo id

})

app.listen(3000)//porta servidor que vai rodar