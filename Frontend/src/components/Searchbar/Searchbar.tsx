import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { TProduct } from "../../@types/cardTypes";
import { useNavigate } from "react-router-dom";
import styles from "./Searchbar.module.scss";

interface SearchModalProps {
  show: boolean;
  onClose: () => void;
  ignoreRef?: React.RefObject<HTMLElement | null>;
}

const SearchModal: React.FC<SearchModalProps> = ({ show, onClose, ignoreRef }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<TProduct[]>([]);
  const navigate = useNavigate();

  function cleanSearch(input: string): string {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  const handleSearch = async () => {
    if (searchValue.trim().length > 2) {
      try {
        const valueClean = cleanSearch(searchValue);
        const res = await axios.get(`http://localhost:1818/api/product/search?search=${valueClean}`);
        setSearchResult(res.data);
      } catch (error) {
        console.error("Erreur lors de la recherche", error);
      }
    } else {
      setSearchResult([]);
    }
  };

  const handleProductClick = (product: TProduct) => {
    navigate(`/produits`, { state: [product] });
    resetSearch();
    onClose();
  };
  const resetSearch = () => {
    setSearchValue("");
    setSearchResult([]);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const valueClean = cleanSearch(searchValue);
      if (valueClean.length > 2) {
        navigate(`/produits`, { state: searchResult });
        resetSearch();
        onClose();
      }
    }
  };

  const handleClose = () => {
    resetSearch();
    onClose();
  };

  useEffect(() => {
    if (show) resetSearch();
  }, [show]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedNode = event.target as Node;
      if (
        modalRef.current &&
        !modalRef.current.contains(clickedNode) &&
        !(ignoreRef?.current?.contains(clickedNode))
      ) {
        handleClose();
      }
    }

    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [ignoreRef]);

  if (!show) return null;

  return (
      <div className={styles.overlay} ref={modalRef} onClick={handleClose}>
        <div className={styles.inner} onClick={(e) => e.stopPropagation()}>
          <div className={styles.searchBar}>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyUp={handleKeyUp}
              onInput={handleSearch}
              placeholder="Recherche..."
            />
            <button onClick={handleClose}>
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>

          {searchResult.length > 0 && (
            <ul className={styles.resultList}>
              {searchResult.map((result) => (
                <li key={result.id} onClick={() => handleProductClick(result)}>
                  {result.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
  );
};

export default SearchModal;
