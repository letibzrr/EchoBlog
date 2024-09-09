import { Router } from "express";
import { createPostagem, getAllPostagem, getPostagemById, updatePostagen, deletePostagem, updateImagePostagem } from "../controllers/postagemController.js"
import upload from "../middlewares/imagemMiddleware.js";

const router = Router()

router.post("/", createPostagem);
router.get("/", getAllPostagem);
router.get("/:id", getPostagemById);
router.put("/:id", updatePostagen);
router.delete("/:id", deletePostagem);
router.post("/:id/imagem", upload.single("imagem") ,updateImagePostagem);

export default router;