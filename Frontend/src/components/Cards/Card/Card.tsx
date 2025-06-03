import { useState } from "react";
import styles from "./Card.module.scss";
import he from "../../../assets/he-card.png";
import ModalProduct  from "../../ModalProduct/ModalProduct.tsx"

import { TProduct } from "../../../@types/cardTypes.ts";

export default function CardProduct({
  id,
  title,
  description,
  price,
  image,
  stock,
  category_id,
  supplier_id,
  }: TProduct) {

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
    
    <div className={styles.card} onClick={handleOpenModal}>
      <img src={he} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>{price} €</p>
          <button onClick={handleOpenModal} className={styles.button}>
            Découvrir
          </button>
      </div>
    </div>
    
    {isOpen && (
        <ModalProduct
          product={{
            id,
            title,
            description,
            price,
            image: he,
            stock,
            category_id,
            supplier_id,
          }}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
