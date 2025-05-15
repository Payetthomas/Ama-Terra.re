import { client, Category, Supplier, Product, User } from "./src/models/index.js";

async function seed() {
  try {
    await client.authenticate();
    console.log("✅ Connecté à la base");

    // 🔹 Catégories
    const [aromatherapie, created1] = await Category.findOrCreate({
      where: { name: "Aromathérapie" },
    });
    const [soins, created2] = await Category.findOrCreate({
      where: { name: "Soins naturels" },
    });

    // 🔹 Fournisseurs
    const [biozen, _] = await Supplier.findOrCreate({
      where: { name: "BioZen" },
      defaults: {
        contact_email: "contact@biozen.fr",
        phone: "0123456789",
        adresse: "15 rue des huiles, 75001 Paris"
      }
    });

    // 🔹 Produits
    await Product.findOrCreate({
      where: { title: "Huile essentielle de lavande" },
      defaults: {
        description: "Apaisante et relaxante.",
        price: 12.90,
        stock: 50,
        image: "https://via.placeholder.com/300x300.png?text=Lavande",
        category_id: aromatherapie.id,
        supplier_id: biozen.id
      }
    });

    await Product.findOrCreate({
      where: { title: "Huile essentielle de menthe poivrée" },
      defaults: {
        description: "Tonifiante et rafraîchissante.",
        price: 9.50,
        stock: 40,
        image: "https://via.placeholder.com/300x300.png?text=Menthe",
        category_id: aromatherapie.id,
        supplier_id: biozen.id
      }
    });

    await Product.findOrCreate({
      where: { title: "Baume réparateur" },
      defaults: {
        description: "Soin cicatrisant naturel",
        price: 18.00,
        stock: 25,
        image: "https://via.placeholder.com/300x300.png?text=Baume",
        category_id: soins.id,
        supplier_id: biozen.id
      }
    });

    // 🔹 Utilisateur
    await User.findOrCreate({
      where: { email: "admin@amaterra.fr" },
      defaults: {
        firstname: "Admin",
        lastname: "AmaTerra",
        password: "hashedpassword" // ⚠️ à remplacer par un hash réel
      }
    });

    console.log("🌱 Données insérées avec succès !");
    process.exit();
  } catch (err) {
    console.error("❌ Erreur lors du seed :", err);
    process.exit(1);
  }
}

seed();
