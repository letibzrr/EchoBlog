import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/secret.js"; 

export const verificarToken = (request, response, next) => {
  const token = request.headers.authorization?.split(" ")[1];
  if (!token) return response.status(401).json({ message: "Token não identificado" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return response.status(403).json({ message: "Token inválido" });

    request.user = decoded; 
    next();
  });
};
