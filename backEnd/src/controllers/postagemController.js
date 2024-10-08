import { request, response } from "express"
import { json } from "sequelize"
import Postagem from "../models/postagemModel.js"
import { date, z } from "zod"
import formatZodError from "../helpers/formatZodError.js"

//VALIDAÇÕES COM ZOD
const createSchema =  z.object({
    titulo: z.string().min(3, {message: "O titulo deve ter pelo menos três caracteres"}).transform((txt)=>txt.toLowerCase()),
    conteudo: z.string().min(5, {message: " O conteudo deve ter pelo menos cinco caracteres"}),
    autor: z.string().min(5, {message: " O conteudo deve ter pelo menos cinco caracteres"}),
});
const IdSchema = z.object({
    id: z.string().uuid({message: "Id da postagem é inválido"})
})
const updateSchema =  z.object({
    titulo: z.string().min(3, {message: "O titulo deve ter pelo menos três caracteres"}).transform((txt)=>txt.toLowerCase()),
    conteudo: z.string().min(5, {message: " O conteudo deve ter pelo menos cinco caracteres"}),
    autor: z.string().min(5, {message: " O conteudo deve ter pelo menos cinco caracteres"}),
});

export const  createPostagem = async (request, response) => { //RF01
    //IMPLEMENTAÇÃO DO ZOD
    const bodyValidation = createSchema.safeParse(request.body);
    if(!bodyValidation.success){
        return response.status(400).json({
            message: "Os dados recebidos do corpo da requisição são inválidos", 
            detalhes: formatZodError(bodyValidation.error) 
        });
    }

    const { titulo, conteudo, autor, imagem }= request.body;
    const novaPostagem = {
        titulo,
        conteudo,
        autor,
        dataPublicacao: new Date(),
        imagem,
    };
    try{
        await Postagem.create(novaPostagem);
        response.status(201).json({ message: "Postagem Cadastrada" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Erro ao cadastrar postagem" });
    }
}
export const  getAllPostagem = async (request, response) => { // RF02
    const page = parseInt(request.query.page) || 1
    const limit = parseInt(request.query.limit) || 10
    const offset = (page - 1) * limit

    try {
        const postagens = await Postagem.findAndCountAll({
            limit,
            offset
        })
        const totalPaginas = Math.ceil(postagens.count / limit);
        response.status(200).json({
            totalPostagens: postagens.count,
            totalPaginas,
            paginaAtual: page,
            itemsPorPagina: limit,
            proximaPagina: totalPaginas === 0 ? null : `http://localhost:3333/postagens?page=${page + 1}`,
            postagens: postagens.rows
        })
    } catch (error) {
        response.status(500).json({message: "Erro ao buscar postagens"})
    }
}
export const  getPostagemById = async (request, response) => { // RF03
     //IMPLEMENTAÇÃO DO ZOD
     const paramValidator = IdSchema.safeParse(request.params)
     if(!paramValidator.success){
         response.status(400).json({ 
             message: "Número de identificação está inválido", 
             detalhes: formatZodError(paramValidator.error) 
         });
         return;
     }
 
     const {id} = request.params
     try {
         const postagens = await Postagem.findByPk(id) 
         if(postagens === null){
             return response.status(404).json({message: "Postagem Não Encontrada"})
         }
         response.status(200).json(postagens)
     } catch (error) {
         response.status(500).json({message: "Erro ao buscar postagem"})
     }
}
export const  updatePostagen = async (request, response) => { // RF04
    //IMPLEMENTAÇÃO DO ZOD
    const paramValidator = IdSchema.safeParse(request.params)
    if(!paramValidator.success){
        response.status(400).json({ 
            message: "Número de identificação está inválido", 
            detalhes: formatZodError(paramValidator.error) 
        });
        return;
    }
    const upatadeValidator = updateSchema.safeParse(request.body)
    if(!upatadeValidator.success){
        response.status(400).json({
            message: "Dados para atualização estão incorretos",
            details: formatZodError(upatadeValidator.error)
        })
        return
    }

    const { id } = request.params
    const { titulo, conteudo, autor } = request.body

    const postagemAtualizada = {
        titulo,
        conteudo,
        autor,
        dataPublicacao: new Date(),
    }

    try {
        const [linhasAfetadas] = await Postagem.update(postagemAtualizada, { where: { id } });
        if(linhasAfetadas <= 0){ // em caso de id não existente ou descrito errado
            return response.status(404).json({message: "Postagem Não Encontrada"})
        }
        response.status(200).json({message: "Postagem Atualizada"})
    } catch (error) {
        response.status(500).json({message: "Erro ao atualizar postagem"})
    }
}
export const  deletePostagem = async (request, response) => { // RF05
    //IMPLEMENTAÇÃO DO ZOD
    const paramValidator = IdSchema.safeParse(request.params)
    if(!paramValidator.success){
        response.status(400).json({ 
            message: "Número de identificação está inválido", 
            detalhes: formatZodError(paramValidator.error) 
        });
        return;
    }

    const {id} = request.params
    try {
        const postagens = await Postagem.destroy({ where: { id } });
        if(postagens === null){
            return response.status(404).json({message: "Postagem Não Encontrada"})
        }
        response.status(200).json({message: "Postagem Deletada"})
    } catch (error) {
        response.status(500).json({message: "Erro ao buscar postagem"})
    }
}
export const updateImagePostagem = async (request, response) => { // RF06
    //IMPLEMENTAÇÃO DO ZOD
    const paramValidator = IdSchema.safeParse(request.params)
    if(!paramValidator.success){
        response.status(400).json({ 
            message: "Número de identificação está inválido", 
            detalhes: formatZodError(paramValidator.error) 
        });
        return;
    }

    const {id} = request.params
    try {
        if(!request.file) {
            return response.status(400).json({ error: "Imagem não enviada" });
        }      
        const postagens = await Postagem.findByPk(id) 
        if(postagens === null){
            return response.status(404).json({message: "Postagem Não Encontrada"})
        }
         postagens.imagem = `/upload/${request.file.filename}`;
        await postagens.save();
        response.status(200).json({ message: "Imagem enviada para a postagem com sucesso", imagem: postagens.imagem });
    } catch (error) {
        response.status(500).json({message: "Erro ao enviar imagem"})
    }
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

