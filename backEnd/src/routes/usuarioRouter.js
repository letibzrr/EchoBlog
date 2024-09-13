import { Router } from "express";
import { registerUser, loginUser, updateUser, deleteUser, listAllUser, UpdatePapelUser  } from "../controllers/usuarioController.js";
import { verificarToken } from "../middlewares/verifyToken.js";
import verificarPapelAdmin from "../middlewares/authAdm.js"

const router = Router();

router.post("/registro", registerUser);
router.post("/login", loginUser);
router.put("/:id", verificarToken, updateUser);
router.get("/", verificarPapelAdmin, listAllUser, verificarToken);
router.delete("/:id", verificarPapelAdmin, deleteUser);
router.patch("/:id/papel", UpdatePapelUser); 

export default router;


