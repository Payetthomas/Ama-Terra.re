import {Supplier} from "../Models/Index.js";
import { Sequelize } from "sequelize";
import { supplierSchema } from "../Validators/supplierValidator.js";

export const supplierController = {

    createOne: async (req, res) => {

        const {error, value} = supplierSchema.validate(req.body);

        if(error) return res.status(400)
            .json({ message: error.details[0].message }); 

        try {
            const newSupplier = await Supplier.create(value);

            res.status(201).json(newSupplier);
            
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur !" })
        }
    },

    getAll: async (req, res) => {

        try {
            const suppliers = await Supplier.findAll();

            res.status(200).json(suppliers);
            
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur !" })
        }
    },

    getOne: async (req,res) => {

        const supplierId = req.params.id;

        try {
            const supplier = await Supplier.findByPk(supplierId);

            if (!supplier) {
                return res.status(404).json( {message: "Fournisseur non trouvé !"} )
            }

            res.status(200).json(supplier);

        } catch (error) {
            res.status(500).json({ message: "Erreur serveur !" })
        }
    },
    
    editOne: async (req, res) => {

        const {error, value} = supplierSchema.validate(req.body);

        if(error) return res.status(400)
            .json({ message: error.details[0].message });

        const supplierId = req.params.id;

        try { 
            const supplier = await Supplier.findByPk(supplierId); 
    
            if(!supplier) {
               return res.status(404).json( {message: "Fournisseur non trouvé !"} )
            };

            Object.entries(value).forEach(( [key, val] ) => {
                if (val !== undefined && val !== null && val !== "") {
                    supplier[key] = val;
                }
            });

            await supplier.save();
            
            res.status(200).json( {message:"Fournisseur mis à jour avec succès ✅", supplier} );

        } catch (error) {
            console.error("Erreur dans editOne:", error);
            res.status(500).json( {message: "Erreur serveur !"} )
        }
    }, 

    deleteOne: async (req, res) => {

        const supplierId = req.params.id;

        try {
            const supplier = await Supplier.findByPk(supplierId);

            if(!supplier) {
                return res.status(404).json( {message: "Fournisseur non trouvé !"} )
             };

             await supplier.destroy();

             res.status(204).end();
            
        } catch (error) {
            res.status(500).json( {message: "Erreur serveur !"} )
        }
    }
};