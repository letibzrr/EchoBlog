import Usuario from "../models/usuarioModel.js";
import { z } from "zod"
import formatZodError from "../helpers/formatZodError.js";
import { request, response } from "express";
import { json } from "sequelize"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// VALIDAÇÕES COM ZOD
const createSchema = z.object({
    nome: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    senha: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
    papel: z.enum(["administrador", "autor", "leitor"]).optional(),
  });
  const loginSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    senha: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  });
  const updateSchema = z.object({
    nome: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }).optional(),
    email: z.string().email({ message: "Email inválido" }).optional(),
    senha: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }).optional(),
  });
  const papelSchema = z.object({
    papel: z.enum(["administrador", "autor", "leitor"], { message: "Papel inválido" }),
  });
// CRIAÇÃO DE ROTAS
export const registerUser = async (request, response) => { // RF01
  try {
    const { nome, email, senha, papel } = createSchema.parse(request.body);
    const hashedSenha = await bcrypt.hash(senha, 10);

    const definirPapel = papel ? papel : "leitor";

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: hashedSenha,
      papel: definirPapel,
    });

    response.status(201).json({ message: "Usuário registrado com sucesso", usuario: novoUsuario });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
}
export const loginUser = async (request, response) => { // RF02
}
export const updateUser = async (request, response) => { // RF03
}
export const deleteUser = async (request, response) => { // RF04
}
export const listAllUser = async (request, response) => { // RF05
}
export const UpdatePapelUser = async (request, response) => { // RF06
}