import jwt from "jsonwebtoken";

export const verificarToken = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Acesso negado, token não identificado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.usuario = decoded; 
    next();
  } catch (error) {
    return response.status(403).json({ msgmessage: "Token inválido" });
  }
};

export const verificarAdmin = (request, response, next) => {
  const { papel } = request.usuario;

  if (papel !== "administrador") {
    return response.status(403).json({ message: "Acesso negado, apenas administradores podem acessar este recurso" });
  }

  next();
};