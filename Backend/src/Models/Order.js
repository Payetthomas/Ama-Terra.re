import { DataTypes, Model } from "sequelize";
import { client } from "../Data/client.js";

class Order extends Model {}; 

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },

        total_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM(
                "En attente",
                "Payé",
                "Annulé"
            ),
            defaultValue: "En attente"
        },

        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },
    {
        sequelize: client,
        tableName: "order"
    }
);

export default Order; 