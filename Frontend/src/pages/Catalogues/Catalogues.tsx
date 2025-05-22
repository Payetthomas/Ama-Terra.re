import { useState, useEffect } from "react";
import styles from "./Catalogues.module.scss"; 
import CardProduct from "../../components/Cards/Card/Card";
import { TProduct } from "../../@types/cardTypes";
import axios from "axios";

const Catalogues = () => {

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
        <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h2>Nos produits naturels</h2>
          <p>Tous nos produits sont sélectionnés avec soin, en favorisant le local et l’artisanal ✨</p>
        </div>
      </section>

      <section className={styles.catalogue}>
        <div className={styles.grid}>
            {products.map((product: TProduct) => (
                <CardProduct key={product.id} {...product} />
            ))}
        </div>
      </section>

    </div>

    );
}; 

export default Catalogues;   