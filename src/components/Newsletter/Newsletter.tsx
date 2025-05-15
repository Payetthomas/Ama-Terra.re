import React from "react";
import styles from "./Newsletter.module.scss";

 const Newsletter = () => {

  return (
    <section className={styles.newsletter}>
      <h2 className={styles.newsletter__title}>Rejoignez notre newsletter </h2>
      <p className={styles.newsletter__subtitle}>Recevez des offres exclusives et des nouveautés Ama Terra directement dans votre boîte mail.</p>
      <form className={styles.newsletter__form}>
        <input
          type="email"
          placeholder="Votre adresse email"
          className={styles.newsletter__input}
        />
        <button type="submit" className={styles.newsletter__button}>
          S'inscrire
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
