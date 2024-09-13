import { Router } from "express";
import { registerUser, loginUser, updateUser, deleteUser, listAllUser, UpdatePapelUser  } from "../controllers/usuarioController.js";
import { verificarAdmin, verificarToken } from "../middlewares/authAdm.js";

const router = Router();

router.post("/registro", registerUser);
router.post("/login", loginUser);
router.put("/:id", verificarToken, updateUser);
router.delete("/delete-user/:id", verificarAdmin, deleteUser);
router.get("/adm", verificarAdmin, listAllUser);
router.put("/atualizar-papel/:id", UpdatePapelUser); 

export default router;