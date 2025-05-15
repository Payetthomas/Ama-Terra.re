import contactMessage from "../Models/ContactMessage.js";
import { contactSchema } from "../Validators/contactValidator.js";
import { sendMail } from "../Utils/mailer.js";

export const contactMessageController = {

    createOne: async(req, res) => {

        const {error, value} = contactSchema.validate(req.body);

        if(error) return res.status(400)
            .json({ message: error.details[0].message }); 

        try {
            const message = await contactMessage.create(value);

            await sendMail.interne({
                to: process.env.GMAIL_INTERNE_USER,
                subject: `Nouveau message de ${value.name} - ${value.subject}`,
                text: `${value.message}\n\nDe : ${value.name} <${value.email}>`,
                value
            })

            res.status(201).json( {message: "Message reçu"} );
            
        } catch (error) {
            console.error("Erreur contactMessage :", error);
            res.status(500).json( { message: "Erreur serveur." } );
        }
    }
};
