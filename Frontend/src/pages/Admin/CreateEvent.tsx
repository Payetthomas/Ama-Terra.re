import axios from "axios";
import { useState } from "react";
import styles from "./CreateEvent.module.scss";

export default function CreateEvent() {
    const [message, setMessage] = useState<string>("");

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        duration: "",
        price: "",
        seats_avaible: "",
        intervenant: "",
        image: null as File | null,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setForm({ ...form, image: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const datetime = `${form.date}T${form.time}`;
        const formData = new FormData();

        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("location", form.location);
        formData.append("event_date", datetime);
        formData.append("duration", form.duration);
        formData.append("price", form.price || "0");
        formData.append("seats_avaible", form.seats_avaible || "0");
        formData.append("intervenant", form.intervenant);
        if (form.image) {
            formData.append("image", form.image);
        }

        try {
            await axios.post("http://localhost:1818/api/event", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setMessage("✅ Atelier ajouté !");
            setForm({
                title: "",
                description: "",
                date: "",
                time: "",
                location: "",
                duration: "",
                price: "",
                seats_avaible: "",
                intervenant: "",
                image: null,
            });
        } catch (error) {
            console.error("Erreur lors de la création :", error);
            setMessage("❌ Erreur lors de l’ajout.");
        }
    };

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Créer un événement</h1>

            {message && <p className={styles.message}>{message}</p>}

            <form
                className={styles.form}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <label>
                    Titre
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Description
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                    />
                </label>

                <div className={styles.row}>
                    <label>
                        Date
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Heure
                        <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                <label>
                    Durée (en minutes)
                    <input
                        type="number"
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Lieu
                    <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Intervenant
                    <input
                        type="text"
                        name="intervenant"
                        value={form.intervenant}
                        onChange={handleChange}
                    />
                </label>

                <div className={styles.row}>
                    <label>
                        Places disponibles
                        <input
                            type="number"
                            name="seats_avaible"
                            value={form.seats_avaible}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Prix (€)
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <label>
                    Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>

                <button type="submit" className={styles.button}>
                    Créer l’événement
                </button>
            </form>
        </div>
    );
}
