import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/lotus.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import SearchModal from "../Searchbar/Searchbar";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  const searchButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-40">
        {/* Logo + titre + liens */}
        <div className="flex items-center space-x-6">
          {/* Logo + texte */}
          <Link to="/" onClick={() => setShowSearch(false)} className="flex items-center gap-2">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 object-cover rounded-full"
            />
            <span className="text-xl font-semibold text-gray-800">Ama Terra</span>
          </Link>

          {/* Liens (masqués en mobile) */}
          <div className="hidden md:flex gap-4 ml-6">
            <Link to="/about" onClick={() => setShowSearch(false)} className="text-gray-700 hover:text-blue-600">À propos</Link>
            <Link to="/contact" onClick={() => setShowSearch(false)} className="text-gray-700 hover:text-blue-600">Contact</Link>
          </div>
        </div>

        {/* Icônes à droite */}
        <div className="flex items-center gap-4">
          <button
            ref={searchButtonRef}
            onClick={() => setShowSearch(prev => !prev)}
            className="text-gray-600 hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <FontAwesomeIcon icon={faPaperPlane} className="text-gray-600" />
        </div>
      </nav>

      {/* Search modal */}
      <SearchModal show={showSearch} onClose={() => setShowSearch(false)} ignoreRef={searchButtonRef}/>
    </>
  );
};

export default Navbar;
