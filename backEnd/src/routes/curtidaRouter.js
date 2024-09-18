import { Router } from "express";
import { curtirPostagem } from "../controllers/curtidaController.js"
import { verificarToken } from "../middlewares/verifyToken.js"

const router = Router()

router.post("/:postagemId/curtidas", verificarToken, curtirPostagem);

export default router;