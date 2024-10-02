import Curtida from "../models/curtidasModel.js";
import { z } from "zod";

//VALIDAÇÕES COM ZOD
const idSchema = z.object({
  postagemId: z.string().uuid("ID de postagem inválido."),
});

export const curtirPostagem = async (request, response) => {
  try {
    const { postagemId } = idSchema.parse(request.params);
    const usuarioId = request.usuario.id;

    const curtidaExistente = await Curtida.findOne({ // verificação se há um curtida
      where: { postagemId, usuarioId },
    });

    if (curtidaExistente) {
      await curtidaExistente.destroy();
      return response.status(200).json({ message: "Curtida removida" });
    }

    const curtidaNova = await Curtida.create({
      postagemId,
      usuarioId,
    });

    response.status(201).json({ message: "Curtida adicionada", curtida: curtidaNova });
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
    response.status(500).json({ error: "Erro ao curtir a postagem" });
  }
}