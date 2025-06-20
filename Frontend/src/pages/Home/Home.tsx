import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TProduct } from "../../@types/cardTypes.ts";
import { TEvent } from "../../@types/eventTypes.ts";
import photo from "../../assets/photo-team.png";
import CardProduct from "../../components/Cards/Card/Card";
import CardAtelier from "../../components/Cards/CardEvent/CardEvent.tsx";
import Hero from "../../components/Hero/Hero";
import styles from "./Home.module.scss";
import { Helmet } from "react-helmet";

const Home = () => {
    const [products, setProducts] = useState<TProduct[]>([]);
    const [events, setEvents] = useState<TEvent[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:1818/api/product/featured",
                );
                setProducts(res.data);
            } catch (error) {
                console.error("Erreur de chargement des produits :", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:1818/api/event");
                setEvents(res.data);
            } catch (error) {
                console.error("Erreur de chargement des produits :", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className={styles["home-page"]}>
                {/* SEO meta tags */}
                <Helmet>
                {products[0] && (
                    <link
                    rel="preload"
                    as="image"
                    href={products[0].image}
                    type="image/webp"
                    />
                )}
                <title>Ama-Terra.re | Bien-être à La Réunion</title>
                <meta
                    name="description"
                    content="Découvrez les produits et ateliers bien-être d'Ama-Terra à La Réunion. Offrez-vous un moment de détente."
                />
                <meta property="og:title" content="Ama-Terra.re | Bien-être à La Réunion" />
                <meta
                    property="og:description"
                    content="Produits naturels et ateliers bien-être à La Réunion."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://ama-terra.re" />
                <meta property="og:image" content="https://ama-terra.re/og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Ama-Terra.re | Bien-être à La Réunion" />
                <meta
                    name="twitter:description"
                    content="Découvrez nos produits et ateliers pour votre bien-être."
                />
                </Helmet>

            <Hero />

            <div className={styles["home-content"]}>
                {/* Nos valeurs */}
                <section className={`${styles.white} ${styles.values}`}>
                    <div className={styles.section}>
                        <h3>Nos valeurs</h3>
                        <div className={styles.grid}>
                            <div>
                                <div className={styles.emoji}>🌱</div>
                                <h4>Naturel & local</h4>
                            </div>
                            <div>
                                <div className={styles.emoji}>👨‍👩‍👧‍👦</div>
                                <h4>Pour tous les âges</h4>
                            </div>
                            <div>
                                <div className={styles.emoji}>🧘</div>
                                <h4>Bienveillance</h4>
                            </div>
                            <div>
                                <div className={styles.emoji}>🛒</div>
                                <h4>Produits choisis avec soin</h4>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Produits */}
                <section className={`${styles.products} ${styles.offWhite}`}>
                    <h3>Nos produits en lumière</h3>
                    <div className={styles["home-card"]}>
                        {products.slice(0, 3).map((product: TProduct, index:number) => (
                            <CardProduct key={product.id} {...product} index={index}/>
                        ))}
                    </div>
                    <div className={styles["view-all"]}>
                        <Link to="/produits">Voir tout le catalogue →</Link>
                    </div>
                </section>

                {/* Ateliers */}
                <section className={`${styles.workshops} ${styles.white}`}>
                    <div className={styles.section}>
                        <h3>Nos prochains ateliers</h3>
                        <div className={styles.columns}>
                            {events.map((atelier) => (
                                <CardAtelier key={atelier.id} {...atelier} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Équipe */}
                <section className={`${styles.team} ${styles.offWhite}`}>
                    <div className={styles.section}>
                        <h3>Rencontrez notre équipe</h3>
                        <div className={styles.columns}>
                            <div className={styles.member}>
                                <img src={photo} alt="Laurence" />
                                <h4>Laurence</h4>
                                <p>
                                    Animée par le goût du travail bien fait,
                                    elle pousse chaque tâche jusqu’à la
                                    perfection.
                                </p>
                            </div>
                            <div className={styles.member}>
                                <img src={photo} alt="Véronique" />
                                <h4>Véronique</h4>
                                <p>
                                    Amoureuse des plantes, elle partage avec
                                    enthousiasme ses connaissances pour vous
                                    offrir les meilleurs conseils.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
