import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchModal from "../Searchbar/Searchbar";
import { useAuth } from "../../AuthContext/AuthContext";
import styles from "./navbar.module.scss";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/connexion");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.logo}>Ama Terra</h1>
        </div>

        <nav className={styles.center}>
          <Link to="/" onClick={()=> setAdminOpen(false)}>Accueil</Link>
          <Link to="/produits" onClick={()=> setAdminOpen(false)}>Produits</Link>
          <Link to="/ateliers" onClick={()=> setAdminOpen(false)}>Ateliers</Link>
          <Link to="/equipe" onClick={()=> setAdminOpen(false)}>L'équipe</Link>
          <Link to="/philosophie" onClick={()=> setAdminOpen(false)}>Philosophie</Link>
          <Link to="/contact" onClick={()=> setAdminOpen(false)}>Contact</Link>
          {user?.role === "admin" && (
            <div className={styles.adminMenu}>
              <button
                className={styles.adminButton}
                onClick={() => setAdminOpen(prev => !prev)}
              >
                Admin ▾
              </button>
              {adminOpen && (
                <div className={styles.dropdown}>
                  <Link to="/admin/newsletter" onClick={()=> setAdminOpen(false)}>Newsletters</Link>
                  <Link to="/admin/ajout-produit" onClick={()=> setAdminOpen(false)}>Ajouter produit</Link>
                  <Link to="/admin/stock-produit" onClick={()=> setAdminOpen(false)}>Stock produits</Link>
                  <Link to="/admin/promotion-produit" onClick={()=> setAdminOpen(false)}>Promotions</Link>
                </div>
              )}
            </div>
          )}

        </nav>

        <div className={styles.right}>
          <button
            ref={searchButtonRef}
            onClick={() => setShowSearch((prev) => !prev)}
            className={styles.search}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>

          {user ? (
            <>
              <span className={styles.username}>Bonjour, {user.firstname}</span>
              <button onClick={handleLogout} className={styles.logout}>Se déconnecter</button>
            </>
          ) : (
            <Link to="/connexion" className={styles.btn}>
              Connexion
            </Link>
          )}
        </div>
      </div>

      <SearchModal
        show={showSearch}
        onClose={() => setShowSearch(false)}
        ignoreRef={searchButtonRef}
      />
    </header>
  );
};

export default Navbar;
