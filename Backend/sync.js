import { client } from "./src/Models/Index.js";


client.sync({ alter: true})

    .then(() => {
        console.log("✅ Base synchronisée avec Sequelize");
        process.exit();
        } 
    )

    .catch((error) => {
        console.error("❌ Erreur de sync :", error); 
        process.exit(1)
    } 
    );
        
