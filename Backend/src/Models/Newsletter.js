import { DataTypes, Model } from "sequelize";
import { client } from "../Data/client.js";

class Newsletter extends Model {}; 

Newsletter.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
         },

         created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
    },
    {
        sequelize: client,
        tableName: "newsletter",
        timestamps: false,
    },
);

export default Newsletter; 