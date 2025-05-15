import styles from "./Footer.module.scss";

const Footer = () => {

    return (
        <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Ama Terra By Aroma Crystal. Tous droits réservés. Thomas PAYET</p>
      <p >Magasin ouvert du mardi au samedi – 10h à 18h</p>
    </footer>
    );
};

export default Footer; 