import { DataTypes, Model } from "sequelize";
import { client } from "../Data/client.js";

class Supplier extends Model {}; 

Supplier.init(
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
        },

        contact_email: {
            type: DataTypes.STRING,
            validate: {isEmail: true}
        },
        
        phone: {
            type: DataTypes.STRING
        },

        adresse: {
            type: DataTypes.TEXT
        },

        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },
    {
        sequelize: client,
        tableName: "supplier"
    }
);

export default Supplier; 
