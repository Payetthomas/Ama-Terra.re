import styles from "./Equipe.module.scss";

const Equipe = () => {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h2>L'équipe du magasin</h2>
          <p>
            Derrière Bien-Être Naturel, une équipe engagée, chaleureuse et passionnée
            vous accueille avec le sourire 🌸
          </p>
        </div>
      </section>

      {/* Portraits équipe */}
      <section className={styles.teamSection}>
        <div className={styles.grid}>
          
          <div className={styles.card}>
            <img src="https://via.placeholder.com/150" alt="Portrait Marine" />
            <h3>Marine</h3>
            <p className={styles.role}>Fondatrice & praticienne bien-être</p>
            <p className={styles.bio}>
              Passionnée de plantes médicinales depuis l’enfance, Marine anime des ateliers relaxation,
              gère les partenariats locaux et sélectionne chaque produit avec soin.
            </p>
          </div>


          <div className={styles.card}>
            <img src="https://via.placeholder.com/150" alt="Portrait Olivier" />
            <h3>Olivier</h3>
            <p className={styles.role}>Responsable produits & ateliers DIY</p>
            <p className={styles.bio}>
              Amoureux du fait-maison, Olivier anime des ateliers cosmétiques et s’investit dans le lien
              avec les producteurs de la région. Il saura vous conseiller avec le cœur.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Equipe;
