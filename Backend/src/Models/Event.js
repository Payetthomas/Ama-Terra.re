import { DataTypes, Model } from "sequelize";
import { client } from "../Data/client.js";

class Event extends Model {}; 

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        description: {
            type: DataTypes.TEXT
        },

        location: {
            type: DataTypes.STRING
        },
        
        event_date: {
            type: DataTypes.DATE, 
            allowNull: false
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },

        url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "https://reservationbeaute.fr/ama-terra-97410/prestations-saint-pierre"
        },          

        seats_avaible : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        category_id: {
            type: DataTypes.INTEGER,
            references: {model: "category", key: "id"}
        },

        created_at: {
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW
        }

    },
    {
        sequelize: client,
        tableName: "event"
    }
);

export default Event;