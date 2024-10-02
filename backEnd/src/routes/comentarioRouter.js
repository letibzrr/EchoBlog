import { Router } from "express";
import { addComentario, editComentario, deleteComentario, listarComentario } from "../controllers/comentarioController.js"
import { verificarToken } from "../middlewares/verifyToken.js"

const router = Router()

router.post("/:postagemId/comentarios", verificarToken, addComentario);
router.put("/comentarios/:id", verificarToken, editComentario);
router.delete("/comentarios/:id", verificarToken, deleteComentario);
router.get("/:postagemId/comentarios", verificarToken, listarComentario);


export default router;