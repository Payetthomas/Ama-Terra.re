import { DataTypes, Model } from "sequelize";
import { client } from "../Data/client.js";

class UserRole extends Model {}

UserRole.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  },
  {
    sequelize: client,
    tableName: "user_role",
  }
);

export default UserRole;
