import { useEffect, useState } from "react";
import styles from "./Ateliers.module.scss";
import { TEvent } from "../../@types/eventTypes";
import axios from "axios";
import CardAtelier from "../../components/Cards/CardEvent/CardEvent.tsx";

const Ateliers = () => {
  const [events, setEvents] = useState<TEvent[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get("http://localhost:1818/api/event");
        setEvents(res.data);
      } catch (error) {
        console.error("Erreur de chargement des ateliers :", error);
      }
    };

    fetchEvent();
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h2>Nos ateliers bien-être</h2>
          <p>Prenez une pause pour vous reconnecter à l'essentiel ✨</p>
        </div>
      </section>

      <section className={styles.ateliers}>
        <div className={styles.grid}>
          {events.map((atelier) => (
            <CardAtelier key={atelier.id} {...atelier} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Ateliers;
