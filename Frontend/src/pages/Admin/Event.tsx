import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./Stock.module.scss";
import { TEvent } from "../../@types/eventTypes";

const AdminEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<TEvent[]>([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:1818/api/event");
      setEvents(res.data);
    } catch (error) {
      console.error("Erreur de chargement des ateliers :", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:1818/api/event/${id}`);
      fetchEvents(); // refresh après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.container_title}>Gestion des ateliers</h2>

      <div className={styles.addBtnWrapper}>
        <button
          type="button"
          onClick={() => navigate("/admin/ajouter-event")}
          className={styles.addBtn}
        >
          + Ajouter
        </button>
      </div>

      <table className={styles.stockTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Date</th>
            <th>Lieu</th>
            <th>Intervenant</th>
            <th>Prix</th>
            <th>Places</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event: TEvent) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.title}</td>
              <td>{new Date(event.event_date).toLocaleString("fr-FR")}</td>
              <td>{event.location}</td>
              <td>{event.intervenant || "–"}</td>
              <td>{event.price} €</td>
              <td>{event.seats_avaible}</td>

              <td>
                <Link
                  to={`/admin/ajout-atelier/${event.id}`}
                  className={styles.editButton}
                >
                  ✍🏼
                </Link>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(event.id!)}
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

export default AdminEvents;
