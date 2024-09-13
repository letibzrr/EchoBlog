import { Router } from "express";
import { createPostagem, getAllPostagem, getPostagemById, updatePostagen, deletePostagem, updateImagePostagem, listarPostagensPorAutor } from "../controllers/postagemController.js"
import upload from "../middlewares/imagemMiddleware.js";
import { verificarToken } from "../middlewares/authAdm.js";

const router = Router()

router.post("/", createPostagem);
router.get("/", getAllPostagem);
router.get("/:id", getPostagemById);
router.put("/:id", verificarToken, updatePostagen);
router.delete("/:id", verificarToken, deletePostagem);
router.post("/:id/imagem", verificarToken, upload.single("imagem") ,updateImagePostagem);
router.get("/autor", verificarToken, listarPostagensPorAutor);


export default router;