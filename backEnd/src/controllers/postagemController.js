import { request, response } from "express"
import { json } from "sequelize"
import Postagem from "../models/postagemModel.js"
import { date, z } from "zod"
import formatZodError from "../helpers/formatZodError.js"

//VALIDAÇÕES COM ZOD
const createSchema =  z.object({});
const IdSchema = z.object({})
const updateSchema =  z.object({});

export const  createPostagem = async (request, response) => { //RF01
    //IMPLEMENTAÇÃO DO ZOD
}
export const  getAllPostagem = async (request, response) => { // RF02
}
export const  getPostagemById = async (request, response) => { // RF03
    //IMPLEMENTAÇÃO DO ZOD
}
export const  updatePostagen = async (request, response) => { // RF04
    //IMPLEMENTAÇÃO DO ZOD
}
export const  deletePostagem = async (request, response) => { // RF05
    //IMPLEMENTAÇÃO DO ZOD
}
export const updateImagePostagem = async (request, response) => { // RF06
    //IMPLEMENTAÇÃO DO ZOD
}
export const listarPostagensPorAutor = async (request, response) => {
    try {
        const { autor } = request.query
       
        const filtro = {}
        if(autor){
            filtro.usuarioId = autor
        }
        const postagens = await Postagem.findAll({ where: filtro})

        response.status(200).json(postagens)
    } catch (error) {
        response.status(500).json({ message: "Erro ao listar postagens", error: error.message })
    }
}