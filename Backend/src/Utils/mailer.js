import nodemailer from "nodemailer";
import contactForm from "./emailIntTemplates.js";
import "dotenv/config"; 

export const sendMail = {

    interne: async ({ to, subject, text, value }) => {

        if (!to) {
            console.error("❌ Aucun destinataire défini pour l'envoi interne.");
            return;
          }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_INTERNE_USER,
                pass: process.env.GMAIL_INTERNE_PASSWORD
            }
        });

        const html = contactForm(value);
        
        try {
            await transporter.sendMail({
                from: `Message reçu dans :  <${process.env.GMAIL_INTERNE_USER}>`,
                to,
                subject,
                text,
                html
            });
        
            console.log("Mail envoyé a:", to);
        
        } catch (error) {
            console.error("❌ Erreur lors de l'envoi de l'email :", error);
        }
        },

    externe: async ( { to, subject, text, html } ) => {
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_EXTERNE_USER,
                pass: process.env.GMAIL_EXTERNE_PASSWORD
            }
        });
        
        try {
            await transporter.sendMail({
                from: `Ama Terra By Aroma Crystal <${process.env.GMAIL_EXTERNE_USER}>`,
                to,
                subject,
                text,
                html
            });
        
            console.log("Mail envoyé a:", to);
        
        } catch (error) {
            console.error("❌ Erreur lors de l'envoi de l'email :", error);
        }
    }

}

