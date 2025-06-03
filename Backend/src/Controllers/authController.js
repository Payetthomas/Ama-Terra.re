import { User, Role } from "../Models/Index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authSchema, passwordSchema } from "../Validators/authValidator.js";

const JWT_SECRET = process.env.JWT_SECRET; 

export const authController = {

    register: async(req, res) => {

        const { error, value } = authSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { firstname, lastname, email, password, profil_img } = value;

        const validatePassword =passwordSchema.validate(password, {list: true});

        if (validatePassword.length > 0) {
            const messages = {
              min: "au moins 8 caractères",
              max: "pas plus de 50 caractères",
              uppercase: "au moins une majuscule",
              lowercase: "au moins une minuscule",
              digits: "au moins un chiffre",
              symbols: "au moins un caractère spécial",
              spaces: "aucun espace"
            };
        
            const message = validatePassword.map(err => messages[err] || err).join(", ");
            return res.status(400).json({ message: `Mot de passe invalide : ${message}` });
          }
        
        try {
            const existingMail = await User.findOne( {where: {email} } );
            if(existingMail){
                return res.status(409).json({ message: "Email déjà utilisé" });
            }

            const hashPassword = await bcrypt.hash(password, 16);

            const createUser = await User.create({
                firstname,
                lastname,
                email,
                password: hashPassword,
                profil_img
            });

            res.status(201).json( {message: `Bienvenue ${createUser.lastname}`, userId: createUser.id} )
            
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
        }
    },

    login: async(req, res) => {

        const {email, password} = req.body;

        try {
            const user = await User.findOne({

                where: {email},
                
                include: [
                    {
                        model: Role,
                        through: {attributes : []}
                    }
                ]
            }); 
            if(!user) {
                return res.status(404).json({ message: "Email ou mot de passe incorrect" });
            }
            
            const checkPassword = await bcrypt.compare(password, user.password);
            if(!checkPassword) {
                return res.status(404).json({ message: "Email ou mot de passe incorrect" });
            };

            const userRoles = user.Roles?.map(role => role.name) || ["user"];

            const token = jwt.sign( {id: user.id, name: user.firstname, email: user.email, role: userRoles}, JWT_SECRET );

            res.status(200).json( {message: "Bonjour !", token} );

        } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
        }
    },

    tokenLog: async (req, res) => {

        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer")) {
                return res.status(401).json({ message: "Token manquant" });
            }

            const token = authHeader.split(" ")[1];

            const decoded = jwt.verify(token, JWT_SECRET);

            const user = await User.findByPk(decoded.id, {
                attributes: ["id", "firstname", "lastname", "email"],
                include: [
                    {
                        model: Role,
                        through: { attributes: [] }
                    }
                ]
            });

            if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

            const roles = user.Roles?.map(role => role.name) || [];

            res.status(200).json({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: roles[0] || "user",
            });

        } catch (error) {
            res.status(401).json({ message: "Token invalide ou expiré" });
        }
    }
};