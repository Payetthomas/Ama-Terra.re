import Category from "./Category.js"; 
import Event from "./Event.js";
import Favorite from "./Favorite.js";
import Order from "./Order.js";
import OrderItem from "./OrderItems.js";
import Product from "./Product.js";
import Supplier from "./Supplier.js";
import User from "./User.js"; 
import Newsletter from "./Newsletter.js";
import Promotion from "./Promotion.js";
import ContactMessage from "./ContactMessage.js";
import Role from "./Role.js";
import UserRole from "./UserRole.js";
import ProductPromotion from "./ProductPromotion.js";

import { client } from "../Data/client.js";


// User → Order
User.hasMany(Order, { foreignKey: "user_id", as: "orders" });
Order.belongsTo(User, { foreignKey: "user_id", as: "user" });

// User → Favorite
User.hasMany(Favorite, { foreignKey: "utilisateur_id", as: "favorites" });
Favorite.belongsTo(User, { foreignKey: "utilisateur_id", as: "user" });

// Product → Favorite
Product.hasMany(Favorite, { foreignKey: "item_id", constraints: false, scope: {item_type: "product"} });
Favorite.belongsTo(Product, { foreignKey: "item_id", constraints: false, as: "product" });

// Event → Favorite
Event.hasMany(Favorite, { foreignKey: "item_id", constraints: false });
Favorite.belongsTo(Event, { foreignKey: "item_id", constraints: false });

// Product → Category / Supplier
Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });
Product.belongsTo(Supplier, { foreignKey: "supplier_id", as: "supplier" });

Category.hasMany(Product, { foreignKey: "category_id", as: "products" });
Supplier.hasMany(Product, { foreignKey: "supplier_id" });

// Order → OrderItem
Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });

// Product → OrderItem
Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

// Product → Promotion
Product.belongsToMany(Promotion, {
    through: "product_promotion",
    foreignKey: "product_id",
    otherKey: "promotion_id",
    as: "promotions"
  });
  
  Promotion.belongsToMany(Product, {
    through: "product_promotion",
    foreignKey: "promotion_id",
    otherKey: "product_id",
    as: "products"
  });

// Role → User
User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id", otherKey: "role_id" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "role_id", otherKey: "user_id" });


export {
    client,
    Category,
    Event,
    Favorite,
    Newsletter,
    Order,
    OrderItem,
    Product,
    Supplier,
    User, 
    Promotion,
    ContactMessage,
    Role,
    UserRole,
    ProductPromotion
};