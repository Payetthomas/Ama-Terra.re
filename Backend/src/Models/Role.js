import { DataTypes, Model } from "sequelize";
import { client } from "../Data/client.js";

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: client,
    tableName: "role",
  }
);

export default Role;
