import { Role, User } from "../Models/Index.js"; 
import { Op } from "sequelize";


export const roleController = {

    createOne: async (req,res) => {

        const {name} = req.body;

        if(!name) return res.status(400).json( {message:"Aucun nom de role inscrit !"} );

        const cleanName = name.trim().toLowerCase();

        try {
            const existing = await Role.findOne({
                where: { name : cleanName }
            });

            if (existing) return res.status(400).json( {message: `Le role ${cleanName} existe deja !`} );

            const newRole = await Role.create( {name: cleanName} );

            res.status(201).json(newRole);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur serveur !" })
        }
    },
    
    updateOne: async(req, res) => {

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Nom de rôle requis." });
          };

        const cleanName = name.trim().toLowerCase();
        const roleId = req.params.id;


        try {
            const existing = await Role.findByPk(roleId); 

            if (!existing) {
                return res.status(404).json( {message: "Role non trouvé !"} )
            };

            const doublon = await Role.findOne({
                where: {
                  name: cleanName,
                  id: { [Op.ne]: roleId }
                }
              });
              
              if (doublon) {
                return res.status(400).json({ message: `Le nom ${cleanName} est déjà utilisé par un autre rôle.` });
              };

            const updateRole = await existing.update( {name: cleanName} ); 

            res.status(200).json(updateRole);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur serveur !" });
        }
    },

    deleteOne: async (req, res) => {

        const roleId = req.params.id;

        try {
            const role = await Role.findByPk(roleId);

            if(!role) {
                return res.status(404).json( {message: "Role non trouvé !"} )
             };

             await role.destroy();

             res.status(204).end();
            
        } catch (error) {
            console.error(error);
            res.status(500).json( {message: "Erreur serveur !"} )
        }
    },

    getAll: async (req, res) => {

        try {
            const roles= await Role.findAll({
                include: [
                    {
                        model: User,
                        through: { attributes: [] }
                    }
                ]
            });

            res.status(200).json(roles);
            
        } catch (error) {
            console.error(error);
            res.status(500).json( {message: "Erreur serveur !"} );
        }
    }, 

    getOne: async (req, res) => {

        const roleId = req.params.id

        try {
            const role = await Role.findByPk(roleId, {
                include: [
                    {
                        model: User,
                        through: { attributes: [] }
                    }
                ]
            });

            res.status(200).json(role);
            
        } catch (error) {
            console.error(error);
            res.status(500).json( {message: "Erreur serveur !"} );
        }
    },

    addRoletoUser: async (req, res) => {

        const { roleId, userId } = req.params;

        try {
            const role = await Role.findByPk(roleId);

            if(!role) {
                return res.status(404).json( {message: "Role non trouvé !"} )
             };

             const user = await User.findByPk(userId);

            if(!user) {
                return res.status(404).json( {message: "User non trouvé !"} )
             };

            await role.addUser(user);

            res.status(200).json({ message: "Utilisateur ajouté au rôle avec succès" });
            
        } catch (error) {
            console.error(error);
            res.status(500).json( {message: "Erreur serveur !"} );
        }
    },

    removeRoletoUser: async (req, res) => {

        const { roleId, userId } = req.params;

        try {
            const role = await Role.findByPk(roleId);

            if(!role) {
                return res.status(404).json( {message: "Role non trouvé !"} )
             };

             const user = await User.findByPk(userId);

            if(!user) {
                return res.status(404).json( {message: "User non trouvé !"} )
             };

            await role.removeUser(user);

            res.status(200).json({ message: "Rôle retiré de l'utilisateur avec succès" });
            
        } catch (error) {
            console.error(error);
            res.status(500).json( {message: "Erreur serveur !"} );
        }
    },
};