import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";
import SearchModal from "../Searchbar/Searchbar";
import styles from "./navbar.module.scss";

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const searchButtonRef = useRef<HTMLButtonElement>(null);
    const [adminOpen, setAdminOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/connexion");
        setMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Link to="/" className={styles.logo}>
                        Ama Terra
                    </Link>
                </div>

                {/* Menu burger */}
                <div
                    className={styles.burger}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <div
                        className={`${styles.bar} ${menuOpen ? styles.open : ""}`}
                    />
                    <div
                        className={`${styles.bar} ${menuOpen ? styles.open : ""}`}
                    />
                    <div
                        className={`${styles.bar} ${menuOpen ? styles.open : ""}`}
                    />
                </div>

                {/* Navigation desktop */}
                <nav className={styles.center}>
                    <Link to="/" onClick={() => setAdminOpen(false)}>
                        Accueil
                    </Link>
                    <Link to="/produits" onClick={() => setAdminOpen(false)}>
                        Produits
                    </Link>
                    <Link to="/ateliers" onClick={() => setAdminOpen(false)}>
                        Ateliers
                    </Link>
                    <Link to="/equipe" onClick={() => setAdminOpen(false)}>
                        L'équipe
                    </Link>
                    <Link to="/contact" onClick={() => setAdminOpen(false)}>
                        Contact
                    </Link>

                    {user?.role === "admin" && (
                        <div className={styles.adminMenu}>
                            <button type="button"
                                className={styles.adminButton}
                                onClick={() => setAdminOpen((prev) => !prev)}
                            >
                                Admin ▾
                            </button>
                            {adminOpen && (
                                <div className={styles.dropdown}>
                                    <Link
                                        to="/admin/newsletter"
                                        onClick={() =>
                                            setAdminOpen((prev) => !prev)
                                        }
                                    >
                                        Newsletters
                                    </Link>
                                    <Link
                                        to="/admin/stock-produit"
                                        onClick={() =>
                                            setAdminOpen((prev) => !prev)
                                        }
                                    >
                                        Gestion des produits
                                    </Link>
                                    <Link
                                        to="/admin/event"
                                        onClick={() =>
                                            setAdminOpen((prev) => !prev)
                                        }
                                    >
                                        Gestion des ateliers
                                    </Link>
                                    <Link
                                        to="/admin/promotion-produit"
                                        onClick={() =>
                                            setAdminOpen((prev) => !prev)
                                        }
                                    >
                                        Gestion des promotions
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </nav>

                {/* Zone de droite */}
                <div className={styles.right}>
                    <button type="button"
                        ref={searchButtonRef}
                        onClick={() => setShowSearch((prev) => !prev)}
                        className={styles.search}
                        aria-label="Ouvrir la recherche"
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>

                    {user ? (
                        <>
                            <span className={styles.username}>
                                Bonjour, {user.firstname}
                            </span>
                            <button type="button"
                                onClick={handleLogout}
                                className={styles.logout}
                            >
                                Se déconnecter
                            </button>
                        </>
                    ) : (
                        <Link to="/connexion" className={styles.btn}>
                            Connexion
                        </Link>
                    )}
                </div>
            </div>

            {/* Menu mobile (affiché uniquement si menuOpen est true) */}
            {menuOpen && (
                <nav className={styles.mobileMenu}>
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        Accueil
                    </Link>
                    <Link to="/produits" onClick={() => setMenuOpen(false)}>
                        Produits
                    </Link>
                    <Link to="/ateliers" onClick={() => setMenuOpen(false)}>
                        Ateliers
                    </Link>
                    <Link to="/equipe" onClick={() => setMenuOpen(false)}>
                        L'équipe
                    </Link>
                    <Link to="/philosophie" onClick={() => setMenuOpen(false)}>
                        Philosophie
                    </Link>
                    <Link to="/contact" onClick={() => setMenuOpen(false)}>
                        Contact
                    </Link>

                    {user?.role === "admin" && (
                        <div className={styles.mobileAdmin}>
                            <p>Admin</p>
                            <Link
                                to="/admin/newsletter"
                                onClick={() => setMenuOpen(false)}
                            >
                                Newsletters
                            </Link>
                            <Link
                                to="/admin/ajout-produit"
                                onClick={() => setMenuOpen(false)}
                            >
                                Ajouter produit
                            </Link>
                            <Link
                                to="/admin/stock-produit"
                                onClick={() => setMenuOpen(false)}
                            >
                                Stock produits
                            </Link>
                            <Link
                                to="/admin/promotion-produit"
                                onClick={() => setMenuOpen(false)}
                            >
                                Promotions
                            </Link>
                        </div>
                    )}

                    {user ? (
                        <button type="button"
                            onClick={handleLogout}
                            className={styles.logout}
                        >
                            Se déconnecter
                        </button>
                    ) : (
                        <Link to="/connexion" className={styles.btn}>
                            Connexion
                        </Link>
                    )}
                </nav>
            )}

            <SearchModal
                show={showSearch}
                onClose={() => setShowSearch(false)}
                ignoreRef={searchButtonRef}
            />
        </header>
    );
};

export default Navbar;
