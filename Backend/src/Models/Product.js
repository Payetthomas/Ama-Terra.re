import { DataTypes, Model } from "sequelize";
import { client } from "../Data/client.js";

class Product extends Model {}; 

Product.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true,
        },

        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        description:{
            type: DataTypes.TEXT
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        image: {
            type: DataTypes.STRING,
            defaultValue: "https://res.cloudinary.com/dossier/placeholder.webp"
        },

        image_public_id: {
            type: DataTypes.STRING,
            allowNull: true
        },

        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
            validate: {min : 0}
        }, 

        category_id: {
            type: DataTypes.INTEGER,
            references: {model: "category", key: "id"}
        },

        supplier_id: {
            type: DataTypes.INTEGER,
            references: {model: "supplier", key: "id"}
        },
        
        is_featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
    }, 
    {
        sequelize: client, 
        tableName: "product",
    },
); 

export default Product; 