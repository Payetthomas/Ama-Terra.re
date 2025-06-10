import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { TProduct } from "../../@types/cardTypes";
import { useNavigate } from "react-router-dom";
import ModalProduct from "../Modals/ModalProduct/ModalProduct";
import he from "../../assets/he-card.png";

interface SearchModalProps {
  show: boolean;
  onClose: () => void;
  ignoreRef?: React.RefObject<HTMLElement | null>;
}

const SearchModal: React.FC<SearchModalProps> = ({ show, onClose, ignoreRef }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<TProduct[]>([]);
  const [selectProduct, setSelectProduct] = useState<TProduct | null>(null);
  const navigate = useNavigate();

  function cleanSearch(input: string): string {
    return input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  const handleSearch = async () => {
    if (searchValue.trim().length > 2) {
      try {
        const valueClean = cleanSearch(searchValue);
        const res = await axios.get(
          `http://localhost:1818/api/product/search?search=${valueClean}`
        );
        setSearchResult(res.data);
      } catch (error) {
        console.error("Erreur lors de la recherche", error);
      }
    } else {
      setSearchResult([]);
    }
  };

  const handleProductClick = (product: TProduct) => {
    setSelectProduct(product);
  };

  const handleCloseProductModal = () => {
    setSelectProduct(null);
  };

  const resetSearch = () => {
    setSearchValue("");
    setSearchResult([]);
    setSelectProduct(null);
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

  // Réinitialise la recherche quand on ouvre la modale
  useEffect(() => {
    if (show) {
      resetSearch();
    }
  }, [show]);

  // Ferme si on clique en dehors
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
    <>
      <div
        ref={modalRef}
        className="absolute left-0 right-0 top-[64px] z-30 flex justify-center bg-white shadow-md border-b border-gray-200"
        onClick={handleClose}
      >
        <div
          className="w-full max-w-2xl p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyUp={handleKeyUp}
              onInput={handleSearch}
              placeholder="Recherche..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-red-500 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>

          {searchResult.length > 0 && (
            <ul className="mt-4">
              {searchResult.map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleProductClick(result)}
                  className="p-3 border-b cursor-pointer hover:bg-gray-100 transition"
                >
                  {result.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectProduct && (
        <ModalProduct
          product={{
            id: selectProduct.id,
            title: selectProduct.title,
            description: selectProduct.description,
            price: selectProduct.price,
            image: he,
            stock: selectProduct.stock,
            category_id: selectProduct.category_id,
            supplier_id: selectProduct.supplier_id,
            promotions: selectProduct.promotions,
          }}
          onClose={handleCloseProductModal}
        />
      )}
    </>
  );
};

export default SearchModal;
