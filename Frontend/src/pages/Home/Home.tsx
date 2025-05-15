import { useState, useEffect } from "react";
import axios from "axios";
import { TProduct } from "../../@types/cardTypes.ts";
import CardProduct from "../../components/Cards/Card/Card";
import Hero from "../../components/Hero/Hero";
import styles from "./Home.module.scss";

import Laurence from "../../assets/Laurence.jpeg";
import Veronique from "../../assets/Veronique.jpeg";


const Home = () => {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:1818/api/product");
        setProducts(res.data);
      } catch (error) {
        console.error("Erreur de chargement des produits :", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles["home-page"]}>
      <Hero />

      <div className={styles["home-content"]}>
        {/* Nos valeurs */}
        <section className={`${styles.white} ${styles.values}`}>
  <div className="text-center px-4">
    <div className="max-w-5xl mx-auto">
      <h3>Nos valeurs</h3>
      <div className={styles.grid}>
        <div>
          <div className="emoji">🌱</div>
          <h4>Naturel & local</h4>
        </div>
        <div>
          <div className="emoji">👨‍👩‍👧‍👦</div>
          <h4>Pour tous les âges</h4>
        </div>
        <div>
          <div className="emoji">🧘</div>
          <h4>Bienveillance</h4>
        </div>
        <div>
          <div className="emoji">🛒</div>
          <h4>Produits choisis avec soin</h4>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* Produits */}
        <section className={`${styles["products"]} ${styles["offWhite"]}`}>
          <h3>Nos produits en lumière</h3>

          <div className={styles["home-card"]}>
            {products.map((product: TProduct) => (
              <CardProduct key={product.id} {...product} />
            ))}
          </div>

          <div className={styles["view-all"]}>
            <a href="#">Voir tout le catalogue →</a>
          </div>
        </section>

        {/* Ateliers */}
        <section className={`${styles["workshops"]} ${styles["white"]}`}>
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h3>Nos prochains ateliers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={styles["workshop-card"]}>
                <h4>Atelier Yoga du dimanche</h4>
                <p>Dimanche 15 mai – 10h à 11h30</p>
                <p className="text-sm mt-2">Un moment de recentrage et de respiration.</p>
                <a href="#">Je m’inscris</a>
              </div>
              <div className={styles["workshop-card"]}>
                <h4>DIY – Fabrique ton baume</h4>
                <p>Samedi 21 mai – 14h à 16h</p>
                <p className="text-sm mt-2">Atelier cosmétique avec des ingrédients naturels.</p>
                <a href="#">Je m’inscris</a>
              </div>
            </div>
          </div>
        </section>

        {/* Équipe */}
        <section className={`${styles["team"]} ${styles["offWhite"]}`}>
          <div className="max-w-4xl mx-auto text-center px-4">
            <h3>Rencontrez notre équipe</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={styles.member}>
                <img src={Laurence} alt="Marine" />
                <h4>Laurence</h4>
                <p>Animé par le goût du travail bien fait, elle pousse chaque tâche jusqu’à la perfection.</p>
              </div>
              <div className={styles.member}>
                <img src={Veronique} alt="Olivier" />
                <h4>Véronique</h4>
                <p>Amoureuse des plantes, elle partage avec enthousiasme ses connaissances pour vous offrir les meilleurs conseils.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
