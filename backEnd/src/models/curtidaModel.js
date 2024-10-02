import { DataTypes } from 'sequelize';
import conn from '../config/conn.js'
import Usuario from './usuarioModel.js';
import Postagem from './postagemModel.js';

const Curtida = conn.define("curtidas", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    curtida : {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {tableName: "curtidas"}
)
//associação N;M
Usuario.belongsToMany(Postagem, {through: 'curtidas'})
Postagem.belongsToMany(Usuario, {through: 'curtidas'})

export default Curtida;