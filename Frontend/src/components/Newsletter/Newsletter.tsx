import React, { useEffect, useState } from "react";
import styles from "./Newsletter.module.scss";
import axios from "axios";

 const Newsletter = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false); 

  useEffect(() => {

    if (message && !error) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, error])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if(!email || !/\S+@\S+\.\S+/.test(email)) {
        setError(true);
        email 
        ? setMessage("L'email n'est pas valide")
				: setMessage("L'email est requis");
        return;
    }

    try {
      const result = await axios.post("http://localhost:1818/api/newsletter", {email});

      setError(false);
      setMessage("Inscription réussie ! Merci"); 
      setEmail("");

    } catch (error) {
      if(axios.isAxiosError(error) && error.response) {
        setError(true); 
        setMessage(error.response.data.message || "Erreur lors de l’inscription.")
      } else {
        setError(true);
        setMessage("Erreur serveur. Réessayez plus tard.");
      }
    }
  }

  return (
    <section className={styles.newsletter}>
      <div>
      <h3 >Recevez nos nouvelles et ateliers à venir</h3>
      <p>Une à deux fois par mois. Pas de spam, que du bien-être 🪷</p>
      <form className={styles.newsletter__form} onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Votre adresse email"
          onChange={(e) => setEmail(e.target.value)}
          className={styles.newsletter__input}
        />
        <button type="submit" className={`${styles.newsletter__button} ${email.includes("@") ? styles.active : ""}`} 
        disabled={!email}
        >
          Je m’abonne
        </button>
      </form>

      {message && (
        <p className={error ? styles.newsletter__error : styles.newsletter__success}>
          {message}
        </p>
      )}

      </div>

    </section>
  );
};

export default Newsletter;
