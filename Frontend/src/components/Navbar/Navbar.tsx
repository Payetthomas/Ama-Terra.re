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

  const { user, logout, isLoading } = useAuth();

  const navigate = useNavigate();


  const handleLogout = () => {
    logout();        
    navigate("/connexion");
    };

  if (isLoading) return null;

  return (
    <header className={styles.header}>
    <div className={styles.container}>
      
      <div className={styles.left}>
        <h1 className={styles.logo}>Ama Terra</h1>
      </div>
  
      <nav className={styles.center}>
        <Link to="/">Accueil</Link>
        <Link to="/produits">Produits</Link>
        <Link to="/ateliers">Ateliers</Link>
        <Link to="/equipe">L'équipe</Link>
        <Link to="/philosophie">Philosophie</Link>
        <Link to="/contact">Contact</Link>
        {user?.role === "admin" && (
          <Link to="/admin/stock-produit">Admin</Link>
        )}
      </nav>
  
      <div className={styles.right}>
        <button
          ref={searchButtonRef}
          onClick={() => setShowSearch(prev => !prev)}
          className={styles.search}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

        {user ?
          ( <>
          <span className={styles.username}>
            Bonjour, {user.firstname}
          </span>

          <button onClick={handleLogout}>Se déconnecter</button>
          </>
          )
          : (<Link to="/connexion" className={styles.btn}>
          Connexion
        </Link>)
        }

      </div>
    </div>
  
    <SearchModal show={showSearch} onClose={() => setShowSearch(false)} ignoreRef={searchButtonRef}/>
  </header>
  
  );
};

export default Navbar;