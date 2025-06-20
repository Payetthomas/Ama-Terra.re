import { TEvent } from "../../../@types/eventTypes";
import styles from "./CardEvent.module.scss";

type Props = TEvent;

const CardAtelier = ({
    title,
    description,
    event_date,
    duration,
    intervenant,
    url,
    image,
}: Props) => {
    const formatDate = (iso: string) =>
        new Date(iso).toLocaleString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    const formatDuration = (min?: number) => {
        if (!min) return "–";
        const h = Math.floor(min / 60);
        const m = min % 60;
        return h ? `${h}h${m ? m : ""}` : `${m} min`;
    };

    return (
        <div className={styles.card}>
            <div className={styles.left}>
                <div className={styles["image-wrapper"]}>
                    {image && (
                        <img className={styles.image} src={image} alt={title} />
                    )}
                </div>
                <div className={styles.description}>{description}</div>
            </div>

            <div className={styles.content}>
                <h3>{title}</h3>
                <p className={styles.date}>📅 {formatDate(event_date)}</p>
                <p className={styles.duration}>⏱️ {formatDuration(duration)}</p>
                <p className={styles.intervenant}>👤 {intervenant}</p>
                <a
                    className={styles.button}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Je m’inscris
                </a>
            </div>
        </div>
    );
};

export default CardAtelier;
