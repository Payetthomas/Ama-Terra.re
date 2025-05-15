import { User } from "../Models/Index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authSchema } from "../Validators/authValidator.js";

const JWT_SECRET = process.env.JWT_SECRET; 

export const authController = {

    register: async(req, res) => {

        const { error, value } = authSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { firstname, lastname, email, password, profil_img } = value;

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
            const user = await User.findOne( {where: {email} } ); 
            if(!user) {
                return res.status(404).json({ message: "Email ou mot de passe incorrect" });
            }
            
            const checkPassword = await bcrypt.compare(password, user.password);
            if(!checkPassword) {
                return res.status(404).json({ message: "Email ou mot de passe incorrect" });
            }

            const token = jwt.sign( {id: user.id, email: user.email}, JWT_SECRET );

            res.status(200).json( {message: "Bonjour !", token} );

        } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
        }
    }
};