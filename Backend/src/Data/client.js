import "dotenv/config";
import { Sequelize } from "sequelize";

const {
    DB_USER: user,
    DB_NAME: database,
    DB_PASSWORD: password,
    DB_PORT: port,
    DB_HOST: host,
} = process.env; 

export const client = new Sequelize(database, user, password, 
    {
        host, 
        port, 
        dialect: "postgres",
        define : {
            createdAt: 'created_at', 
            updatedAt: 'updated_at'
        } 
    }
); 

client.authenticate()
  .then(async () => {
    console.log(`🚀 database ${database} connected`);
  })
  .catch((err) => {
    console.error(`❌ unable to connect to database ${database}`);
    console.error(err.message); // le problème
  });
