import { where, Op, fn } from "sequelize";
import Newsletter from "../Models/newsletter.js";

export const newsletterController = {

    createOne: async (req, res) => {

        const email = req.body.email?.toLowerCase(); 



        if(!email) {
            return res.status(400).json({Error: "email invalide !"});
        }

        try {
            const existing = await Newsletter.findOne({ where: {email} });

            if(existing){
                return res.status(409).json({message: "Email déjà inscrit"});
            }

            await Newsletter.create({ email });
            res.status(201).json({ message: "Inscription réussie" });
        
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    }, 

    getAll: async (req,res) => {

        try {
            const emails = await Newsletter.findAll({ order: [["created_at", "DESC"]] }); 

            res.status(200).json(emails);

        } catch (error) {
            
            console.error(error);
            res.status(500).json({ message: "Erreur serveur." });
        }
    },
    
    getToday: async (req, res) => {

        try {
            const emailsToday = await Newsletter.findAll({where: {
                created_at: {
                  [Op.gte]: fn("date_trunc", "day", fn("now")),
                },
              },
              order: [["created_at", "DESC"]],
            });
            
            res.status(200).json(emailsToday);

        } catch (error) {

            console.error(error);
            res.status(500).json({ message: "Erreur serveur." });
        }
    },

    deleteOne: async (req, res) => {

        const emailId = req.params.id; 

        try {

            const deleted = await Newsletter.findByPk(emailId); 

            if(deleted === 0) {

                return res.status(404).json({ message : "Email introuvable"});
            }

            await deleted.destroy();

            res.status(200).json({message : "Email supprimé avec succés!"}); 
            
        } catch (error) {
            
            console.error(error);
            res.status(500).json({ message: "Erreur serveur." });
        }
    }
}