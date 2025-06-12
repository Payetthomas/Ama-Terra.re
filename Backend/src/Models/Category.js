import { DataTypes, Model } from "sequelize";
import { client } from "../Data/client.js";

class Category extends Model {}; 

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize: client,
        tableName: "category"
    }
);

export default Category; 

