import { Category, Product, Promotion, Supplier } from "../Models/Index.js";
import { Sequelize } from "sequelize";

export const categoryController = {

    createOne: async (req,res) => {

        const { name } = req.body; 

        if(!name || typeof name !== "string") {
            
            return res.status(400).json( {message: "Nom de catégorie invalide"} )
        }

        try {

            const existing = await Category.findOne({ where: {name} }); 

            if(existing) {
                return res.status(409).json( {message: "Categorie déjà présente dans la liste"} );
            }

            await Category.create( {name} ); 
            res.status(201).json( {message: "Catégorie ajouté a liste ✅"} );
            
        } catch (error) {
            console.error(error);
            res.status(500).json( {message: "Erreur serveur !"} );
        }
    },

    getAll: async (req, res) => {

        try {

            const fetchCategories = await Category.findAll();

            res.status(200).json(fetchCategories);
            
        } catch (error) {
            console.error(error);
            res.status(500).json( {message: "Erreur serveur !"} );
        }
    },

    getOne: async (req, res) => {

        const categoryId = req.params.id; 

        try {

            const category = await Category.findByPk(categoryId, 
                {
                    include : [
                        {
                            model: Product,
                            as: "products", 

                            include: [
                                {
                                    model: Promotion,
                                    as: "promotions"
                                },
                                {
                                    model: Supplier,
                                    as: "supplier",
                                },
                            ]
                        }
                    ]
                }
            ); 

            if (!category) {
                return res.status(404).json( {message: "Categorie non trouvé !"} )
            }

            res.status(200).json(category);
            
        } catch (error) {
            console.error(error);
            res.status(500).json( {message: "Erreur serveur !"} );
        }
    },

    deleteOne: async (req, res) => {

        const categoryId = req.params.id;

        try {

            const deleted = await Category.findByPk(categoryId);

            if(!deleted) {
                return res.status(404).json( {message: "Cette catégorie n'est pas présente dans la liste"} )
            }

            await deleted.destroy();

            res.status(200).json( {message: "Categorie supprimée avec succés !"} )
            
        } catch (error) {
            console.error(error);
            res.status(500).json( {message: "Erreur serveur !"} );
        }
    },
}; 