import Comentario from "../models/comentarioModel.js";
import { z } from "zod";

//VALIDAÇÕES COM ZOD
const comentarioSchema = z.object({
    conteudo: z.string().min(1, { message: "O conteúdo do comentário é obrigatório" }),
    postagemId: z.string().uuid("Id de postagem inválido."),
});
const idSchema = z.object({
  postagemId: z.string().uuid("Id de postagem inválido."),
});

export const addComentario = async (request, response) => {}
export const editComentario = async (request, response) => {}
export const deleteComentario = async (request, response) => {}
export const listarComentario = async (request, response) => {}