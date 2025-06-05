import { useState } from "react";
import styles from "./Card.module.scss";
import he from "../../../assets/he-card.png";

import { TProduct } from "../../../@types/cardTypes.ts";
import ModalProduct from "../../Modals/ModalProduct/ModalProduct.tsx";

export default function CardProduct({
  id,
  title,
  description,
  price,
  image,
  stock,
  category_id,
  supplier_id,
  promotions = [],
}: TProduct) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // ✅ On prend la première promotion active (tu pourrais plus tard filtrer par date aussi)
  const activePromo = promotions[0];

  // ✅ On s’assure que le prix est un nombre
  const numericPrice = typeof price === "string" 
    ? parseFloat(price) 
    : price;

  // ✅ Calcul sécurisé du prix final
  let finalPrice = numericPrice.toFixed(2); // prix par défaut

  if (activePromo && activePromo.value !== undefined) {
    if (activePromo.type === "percentage") {
        finalPrice = (numericPrice - (numericPrice * activePromo.value) / 100).toFixed(2);
      } else if (activePromo.type === "fixed") {
        const promoPrice = Number(activePromo.value);
        finalPrice = promoPrice.toFixed(2);
      }
    }

  return (
    <>
      <div className={styles.card} onClick={handleOpenModal}>
        <img src={he} alt={title} className={styles.image} />
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>

          {/* ✅ Si une promo existe, on affiche badge + ancien prix */}
          {activePromo && activePromo.value !== undefined && (
            <div className={styles.promo}>
              <span className={styles.badge}>
                {activePromo.type === "percentage"
                  ? `${activePromo.value}% de réduction !`
                  : `Prix spécial`}
              </span>
              <p className={styles.oldPrice}>{numericPrice.toFixed(2)} €</p>
            </div>
          )}

          {/* ✅ Prix final */}
          <p className={styles.price}>{finalPrice} €</p>

          <button onClick={handleOpenModal} className={styles.button}>
            Découvrir
          </button>
        </div>
      </div>

      {/* ✅ Modal pour voir plus d'infos */}
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
            promotions,
          }}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
