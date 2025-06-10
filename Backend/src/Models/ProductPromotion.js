import { DataTypes, Model } from "sequelize";
import { client } from "../Data/client.js";

class ProductPromotion extends Model {}

ProductPromotion.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "product", key: "id" },
      onDelete: "CASCADE"
    },

    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "promotion", key: "id" },
      onDelete: "CASCADE"
    }
  },
  {
    sequelize: client,
    modelName: "ProductPromotion",
    tableName: "product_promotion",
  }
);

export default ProductPromotion;
