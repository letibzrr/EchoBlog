import conn from "../config/conn.js";
import { DataTypes } from "sequelize";
import Usuario from './usuarioModel.js'

const Postagem = conn.define("postagens", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    conteudo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataPublicacao: {
        type: DataTypes.DATE
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagem: {
        type: DataTypes.STRING,
        defaultValue: false
    },
},
{tableName: "postagens",}
);
// associação 1:N
Usuario.hasOne(Postagem)
Postagem.belongsTo(Usuario)

export default Postagem;
