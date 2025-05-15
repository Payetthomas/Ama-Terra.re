import { client } from "./src/models/index.js";

async function clean() {
  try {
    await client.authenticate();
    console.log("🧹 Connexion réussie. Nettoyage en cours...");

    // 🧨 Requête brute TRUNCATE avec CASCADE en une seule commande
    await client.query(`
      TRUNCATE TABLE
        order_item,
        "order",
        favorite,
        product,
        event,
        newsletter,
        supplier,
        category,
        "user"
      RESTART IDENTITY CASCADE;
    `);

    console.log("✅ Base nettoyée avec succès !");
    process.exit();
  } catch (err) {
    console.error("❌ Erreur pendant le nettoyage :", err);
    process.exit(1);
  }
}

clean();
