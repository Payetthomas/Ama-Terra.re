import { DataTypes, Model } from "sequelize";
import { client } from "../Data/client.js";

class Favorite extends Model {}; 

Favorite.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        }, 

        item_type: {
            type: DataTypes.ENUM("product", "event"), 
            allowNull: false
        },
        
        
        item_id: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }, 

        user_id: {
            type: DataTypes.INTEGER,
            references: {model: "user", key: "id"}
        }
    },
    {
        sequelize: client, 
        tableName: "favorite",
        indexes: [
            {
                unique: true,
                fields: ["user_id", "item_type", "item_id"]
            }
        ]
    }
); 

export default Favorite; 