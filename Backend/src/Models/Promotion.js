import { DataTypes, Model } from "sequelize";
import { client } from "../Data/client.js";

class Promotion extends Model {}

Promotion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
  
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      description: {
        type: DataTypes.TEXT,
      },
  
      type: {
        type: DataTypes.ENUM("percentage", "fixed"),
        allowNull: false,
      },
  
      value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
  
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
  
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
  
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product",
          key: "id",
        },
      },
  
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
  
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize: client,
      tableName: "promotion",
    }
  );
  
  export default Promotion; 