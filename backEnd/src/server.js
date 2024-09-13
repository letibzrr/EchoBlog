import "dotenv/config";
import express, { request, response } from "express";
import cors from "cors";

import conn from "./config/conn.js"

// IMPORTAÇÃO DE MODELOS
import Postagem from "./models/postagemModel.js"
import Usuario from "./models/usuarioModel.js"

// IMPOTAÇÃO DE ROTAS
import postagemRouter from "./routes/postagemRouter.js"
import usuarioRouter from "./routes/usuarioRouter.js"

const PORT = process.env.PORT || 3333
const app = express()

// 3 MIDDLEWARES
app.use(cors()) // cors
app.use(express.urlencoded({extended: true})) //arquivos 
app.use(express.json()) // json

// CONEXÃO COM O BANCO
conn
.sync()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor on http://localhost:${PORT}`)
    })
}).catch((error) => console.error(error)); 

// UTILIZAÇÃO DAS ROTAS
app.use("/postagens", postagemRouter)
app.use("/usuarios", usuarioRouter)

app.use((request, response) => {
    response.status(404).json({message: "Rota não encontrada"})
})
