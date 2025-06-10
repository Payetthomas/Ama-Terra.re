import { useState, useEffect } from "react";
import styles from "./Catalogues.module.scss";
import CardProduct from "../../components/Cards/Card/Card";
import { TProduct } from "../../@types/cardTypes";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Tcategory } from "../../@types/catTypes";

const Catalogues = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [categories, setCategories] = useState<Tcategory[]>([]);
  const [openCat, setOpenCat] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:1818/api/category");
        setCategories(res.data);
      } catch (error) {
        console.error("Erreur de chargement des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (location.state) {
          setProducts(location.state);
        } else {
          const res = await axios.get("http://localhost:1818/api/product");
          setProducts(res.data);
        }
      } catch (error) {
        console.error("Erreur de chargement des produits :", error);
      }
    };

    fetchProducts();
  }, [location.state]);

  const handleFetchByCat = async (categoryId: number) => {
    try {
      const res = await axios.get(`http://localhost:1818/api/category/${categoryId}`);
      setProducts(res.data.products);
    } catch (error) {
      console.error("Erreur de chargement des produits :", error);
    }
  };

  return (

    <div className={styles.page}>

      <section className={styles.hero}>

        <div className={styles.container}>

          <h2>Nos produits naturels</h2>

          <p>
            Tous nos produits sont sélectionnés avec soin, en favorisant le local
            et l’artisanal ✨
          </p>

          <div className={styles.catMenu}>
            <div
              className={`${styles.selectButton} ${openCat ? styles.open : ""}`}
              onClick={() => setOpenCat((prev) => !prev)}
            >
              Catégories {openCat ? "⏶" : "⏷"}
            </div>

            {openCat && (
              <ul className={styles.dropdown}>
                {categories.map((category: Tcategory) => (
                  <li
                    key={category.id}
                    onClick={() => {
                      handleFetchByCat(category.id);
                      setOpenCat(false);
                    }}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

      </section>

      <section className={styles.catalogue}>
        <div className={styles.grid}>
          {products.length === 0 ? (
            <p>Aucun produit dans cette catégorie</p>
          ) : (
            products.map((product: TProduct) => (
              <CardProduct key={product.id} {...product} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Catalogues;
