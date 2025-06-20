import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { TProduct } from "../../@types/cardTypes";
import CardProduct from "../../components/Cards/Card/Card";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import styles from "./Catalogues.module.scss";

const Catalogues = () => {
    const [products, setProducts] = useState<TProduct[]>([]);
    const [searchParams] = useSearchParams();
    const location = useLocation();

    const fetchProducts = async () => {
        try {
            if (location.state) {
                // Recherche via la barre de recherche
                setProducts(location.state);
            } else {
                const query = searchParams.toString();
                const res = await axios.get(
                    `http://localhost:1818/api/product?${query}`,
                );
                setProducts(res.data);
            }
        } catch (error) {
            console.error("Erreur de chargement des produits :", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [location.state, searchParams]);

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h2>Nos produits naturels</h2>
                    <p>
                        Tous nos produits sont sélectionnés avec soin, en
                        favorisant le local et l’artisanal ✨
                    </p>
                </div>
            </section>

            <section className={styles.catalogue}>
                <div className={styles.layout}>
                    <FilterSidebar />

                    <div className={styles.products}>
                        {products.length === 0 ? (
                            <p className={styles.empty}>
                                Aucun produit ne correspond à vos filtres 😕
                            </p>
                        ) : (
                            <div className={styles.grid}>
                                {products.map((product: TProduct) => (
                                    <CardProduct
                                        key={product.id}
                                        {...product}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Catalogues;
