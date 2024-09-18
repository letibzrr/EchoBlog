import Curtida from "../models/curtidasModel.js";
import { z } from "zod";

//VALIDAÇÕES COM ZOD
const idSchema = z.object({
  postagemId: z.string().uuid("ID de postagem inválido."),
});

export const curtirPostagem = async (request, response) => {}