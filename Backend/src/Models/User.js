import { DataTypes, Model } from "sequelize";
import { client } from "../Data/client.js";

class User extends Model {}; 

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        firstname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        lastname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false, 
            validate: {isEmail: true}
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        profil_img: {
            type: DataTypes.TEXT,
            defaultValue:
            "https://img.freepik.com/vecteurs-premium/icone-profil-avatar-par-defaut-image-utilisateur-medias-sociaux-icone-avatar-gris-silhouette-profil-vide-illustration-vectorielle_561158-3383.jpg?w=1060"
        },

        created_at: {
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize: client,
        tableName: "user"
    }
); 

export default User; 