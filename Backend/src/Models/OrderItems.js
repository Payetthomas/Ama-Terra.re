import { DataTypes, Model } from "sequelize";
import { client } from "../Data/client.js";

class OrderItem extends Model {}; 

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },

        order_id: {
            type: DataTypes.INTEGER,
            references: {model:"order", key: "id"},
            allowNull: false
        },

        product_id: {
            type: DataTypes.INTEGER,
            references: {model:"product", key:"id"},
            allowNull: false
        }, 

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            defaultValue: 1
        },

        unit_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        discount: {
            type: DataTypes.DECIMAL(4, 2),
            defaultValue: 0
        }
    },
    {
        sequelize: client,
        tableName: "order_item"
    }
);

export default OrderItem;