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

        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
        image_public_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        location: {
            type: DataTypes.STRING
        },
        
        event_date: {
            type: DataTypes.DATE, 
            allowNull: false
        },

        intervenant: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        duration: {
            type: DataTypes.INTEGER,
            allowNull: true
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