import styles from "./Ateliers.module.scss";

const Ateliers = () => {


  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h2>Nos ateliers bien-être</h2>
          <p>Prenez une pause pour vous reconnecter à l'essentiel</p>
        </div>
      </section>

      {/* Liste des ateliers */}
      <section className={styles.ateliers}>
        <div className={styles.grid}>
          {[
            {
              titre: "Yoga détente",
              date: "Dimanche 15 mai • 10h–11h30",
              desc: "Un moment pour respirer, s’ancrer, se recentrer. Ouvert à tous les niveaux.",
            },
            {
              titre: "DIY : Baume naturel",
              date: "Samedi 21 mai • 14h–16h",
              desc: "Apprenez à fabriquer un baume apaisant avec des ingrédients locaux et bio.",
            },
            {
              titre: "Plantes médicinales",
              date: "Mercredi 24 mai • 10h–12h",
              desc: "Balade botanique pour reconnaître les plantes locales et apprendre leurs usages simples.",
            },
            {
              titre: "Massage parent-enfant",
              date: "Samedi 28 mai • 10h–11h30",
              desc: "Un moment de douceur à partager. Apprenez à masser en conscience avec votre enfant.",
            },
          ].map((atelier, index) => (
            <div key={index} className={styles.card}>
              <h3>{atelier.titre}</h3>
              <p className={styles.date}>🗓️ {atelier.date}</p>
              <p className={styles.description}>{atelier.desc}</p>
              <button className={styles.btn}>Je m’inscris</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Ateliers;
