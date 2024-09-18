import { DataTypes } from 'sequelize'
import conn from '../config/conn.js'
import Usuario from './usuarioModel.js';
import Postagem from './postagemModel.js';

const Comentario = conn.define("comentarios", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    conteudo : {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {tableName: "comentarios"}
)
//associação N:M
Usuario.belongsToMany(Postagem, {through: 'comentarios'})
Postagem.belongsToMany(Usuario, {through: 'comentarios'})

export default Comentario;