import "dotenv/config";
import express, { request, response } from "express";
import cors from "cors";

import conn from "./config/conn.js"

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

app.use((request, response) => {
    response.status(404).json({message: "Rota não encontrada"})
})
