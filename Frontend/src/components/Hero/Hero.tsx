import { Link } from "react-router-dom";
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2 className={styles.title}>Prenez soin de vous naturellement</h2>
        <p className={styles.subtitle}>
          Produits locaux & ateliers bien-être pour toute la famille
        </p>
        <div className={styles.buttons}>
          <Link to="/produits" className={styles.buttonPrimary}>
            Découvrir nos produits
          </Link>
          <Link to="/ateliers" className={styles.buttonSecondary}>
            Voir les ateliers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
