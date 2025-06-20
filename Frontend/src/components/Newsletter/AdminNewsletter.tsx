import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./AdminNewsletter.module.scss";

type TNewsletter = {
    id: number;
    email: string;
    created_at: string;
};

const AdminNewsletter = () => {
    const [emails, setEmails] = useState([]);
    const [activeTab, setActiveTab] = useState<"all" | "today">("all");

    const fetchEmails = async () => {
        const route =
            activeTab === "today"
                ? "http://localhost:1818/api/newsletter/today"
                : "http://localhost:1818/api/newsletter";

        const result = await axios.get(route);
        setEmails(result.data);
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:1818/api/newsletter/${id}`);
        fetchEmails();
    };

    useEffect(() => {
        fetchEmails();
    }, [activeTab]);

    return (
        <div className={styles.container}>
            <h2>Emails newsletter</h2>

            <div className={styles.tabs}>
                <button type="button"
                    onClick={() => setActiveTab("all")}
                    className={activeTab === "all" ? styles.active : ""}
                >
                    Tous
                </button>
                <button type="button"
                    onClick={() => setActiveTab("today")}
                    className={activeTab === "today" ? styles.active : ""}
                >
                    Aujourd’hui
                </button>
            </div>

            <table className={styles.newsletterTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Date d’inscription</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {emails.map((entry: TNewsletter) => (
                        <tr key={entry.id}>
                            <td>{entry.id}</td>
                            <td>{entry.email}</td>
                            <td>
                                {new Date(entry.created_at).toLocaleDateString(
                                    "fr-FR",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    },
                                )}
                            </td>
                            <td>
                                <button type="button"
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(entry.id)}
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminNewsletter;
