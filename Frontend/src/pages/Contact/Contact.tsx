import axios from "axios";
import { useState } from "react";
import styles from "./Contact.module.scss";

const Contact = () => {
    const [form, setForm] = useState({
        nom: "",
        email: "",
        objet: "",
        message: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            await axios.post("http://localhost:1818/api/contact", form);

            setMessage("Votre demande a bien été transmise !");

            setForm({
                nom: "",
                email: "",
                objet: "",
                message: "",
            });
        } catch (error) {}
    };

    return (
        <div className={styles.contactPage}>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h2>Nous contacter</h2>
                    <p>
                        Une question sur nos ateliers ou produits ? Écrivez-nous
                        ou passez directement au magasin 🌻
                    </p>
                </div>
            </section>

            <section className={styles.formSection}>
                <div className={styles.grid}>
                    <div>
                        <h3>Formulaire</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Nom
                                <input
                                    type="text"
                                    name="nom"
                                    value={form.nom}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Objet
                                <input
                                    type="text"
                                    name="objet"
                                    value={form.objet}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Message
                                <textarea
                                    name="message"
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <button type="submit">Envoyer</button>
                        </form>

                        {message && <p className={styles.message}>{message}</p>}
                    </div>

                    <div className={styles.infos}>
                        <h3>Infos pratiques</h3>
                        <ul>
                            <li>
                                <strong>Adresse :</strong>
                                <br />
                                123 Rue des Plantes, 34000 Montpellier
                            </li>
                            <li>
                                <strong>Horaires :</strong>
                                <br />
                                Mardi au samedi : 10h – 18h
                            </li>
                            <li>
                                <strong>Téléphone :</strong>
                                <br />
                                04 12 34 56 78
                            </li>
                            <li>
                                <strong>Email :</strong>
                                <br />
                                amaterra.bienetre@gmail.com
                            </li>
                        </ul>
                        <img
                            src="https://www.google.com/maps/place/Ama+Terra+By+Aroma+Crystal/@-21.3403189,55.4749584,17z/data=!3m1!4b1!4m6!3m5!1s0x2182a132ac758b95:0x5b6318ddce90d832!8m2!3d-21.3403189!4d55.4775333!16s%2Fg%2F11ltr_wpxt?entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoASAFQAw%3D%3D"
                            alt="Carte"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
