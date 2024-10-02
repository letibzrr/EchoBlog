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

export const addComentario = async (request, response) => {
  try {
    const { conteudo, postagemId } = comentarioSchema.parse(request.body);
    const usuarioId = request.usuario.id;

    const novoComentario = await Comentario.create({
      conteudo,
      usuarioId,
      postagemId,
    });

    res.status(201).json({ msg: "Comentário adicionado", comentario: novoComentario });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        errors: error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }
    console.error(error);
    response.status(500).json({ error: "Erro ao adicionar comentário" });
  }
}
export const editComentario = async (request, response) => {
  try {
    const { id } = idSchema.parse(request.params);
    const { conteudo } = comentarioSchema.pick({ conteudo: true }).parse(request.body);

    const comentario = await Comentario.findByPk(id);

    if (!comentario || comentario.usuarioId !== request.usuario.id) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }

    comentario.conteudo = conteudo;
    await comentario.save();

    response.status(200).json({ msg: "Comentário atualizado", comentario });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        errors: error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }
    console.error(error);
    response.status(500).json({ error: "Erro ao editar comentário" });
  }
}
export const deleteComentario = async (request, response) => {
  try {
    const { id } = idSchema.parse(request.params);

    const comentario = await Comentario.findByPk(id);

    if (!comentario || comentario.usuarioId !== request.usuario.id) {
      return response.status(404).json({ error: "Comentário não encontrado" });
    }

    await comentario.destroy();

    response.status(200).json({ message: "Comentário excluído" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        errors: error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }
    console.error(error);
    response.status(500).json({ error: "Erro ao excluir comentário" });
  }
}
export const listarComentario = async (request, response) => {
  try {
    const { postagemId } = idSchema.parse(request.params);

    const comentarios = await Comentario.findAll({ where: { postagemId } });

    response.status(200).json(comentarios);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Erro ao listar comentários" });
  }
}