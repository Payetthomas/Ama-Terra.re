import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";


interface SearchModalProps {
    show: boolean; 
    onClose: () => void;
    ignoreRef?: React.RefObject<HTMLElement>; 
}

const SearchModal: React.FC<SearchModalProps> = ({ show, onClose, ignoreRef }) => {

    const modalRef = useRef<HTMLDivElement>(null);
    

    // Ferme si on clique en dehors
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          const clickedNode = event.target as Node;
    
          if (
            modalRef.current &&
            !modalRef.current.contains(clickedNode) &&
            !(ignoreRef?.current?.contains(clickedNode))
          ) {
            onClose();
          }
        }
    
        function handleEsc(event: KeyboardEvent) {
          if (event.key === "Escape") {
            onClose();
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
          document.removeEventListener("keydown", handleEsc);
        };
      }, [onClose, ignoreRef]);


    if (!show) return null;


    return (
            <div
            ref={modalRef}
            className="absolute left-0 right-0 top-[64px] z-30 flex justify-center bg-white shadow-md border-b border-gray-200"
            onClick={onClose}
          >
            <div
              className="w-full max-w-2xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Recherche..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={onClose}
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
              </div>
            </div>
          </div>
        )

};

export default SearchModal; 

