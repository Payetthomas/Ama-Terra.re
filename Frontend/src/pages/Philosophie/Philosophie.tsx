import styles from "./Philosophie.module.scss";

const Philosophie = () => {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h2>Notre philosophie</h2>
          <p>
            Bien-Être Naturel est né d’une envie simple : revenir à l’essentiel, en douceur, avec du sens 🌾
          </p>
        </div>
      </section>

      {/* Valeurs */}
      <section className={styles.values}>
        <div className={styles.wrapper}>
          {[
            {
              emoji: "🌱",
              title: "Naturel, local, éthique",
              text: "Nous privilégions les producteurs locaux, les circuits courts, et les matières premières les plus naturelles possible. Chaque produit est sélectionné avec soin, en accord avec nos valeurs.",
            },
            {
              emoji: "🧘",
              title: "Du temps pour soi",
              text: "Nos ateliers sont conçus comme des bulles de pause et de reconnexion. Pas de pression, juste le plaisir de prendre soin de soi et de découvrir.",
            },
            {
              emoji: "🌾",
              title: "Savoir-faire et transmission",
              text: "Nous croyons à la force de la transmission : apprendre à fabriquer son baume, reconnaître une plante locale, ou simplement partager un moment ensemble.",
            },
            {
              emoji: "♻️",
              title: "Respect du vivant",
              text: "Aucun test sur les animaux, des emballages minimalistes, une gestion raisonnée de l’énergie… Chaque geste compte.",
            },
          ].map((valeur, index) => (
            <div key={index} className={styles.engagement}>
              <div className={styles.emoji}>{valeur.emoji}</div>
              <div>
                <h3>{valeur.title}</h3>
                <p>{valeur.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Philosophie;
