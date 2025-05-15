import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchModal from "../Searchbar/Searchbar";
import styles from "./navbar.module.scss";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  const searchButtonRef = useRef<HTMLButtonElement>(null);

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
        <Link to="/admin/stock-produit">Stock</Link>
      </nav>
  
      <div className={styles.right}>
        <button
          ref={searchButtonRef}
          onClick={() => setShowSearch(prev => !prev)}
          className={styles.search}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <Link to="/connexion" className={styles.btn}>
          Connexion
        </Link>
      </div>
    </div>
  
    <SearchModal show={showSearch} onClose={() => setShowSearch(false)} ignoreRef={searchButtonRef}/>
  </header>
  
  );
};

export default Navbar;