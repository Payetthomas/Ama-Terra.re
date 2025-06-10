import { useState } from "react";
import styles from "./Card.module.scss";
import { TProduct } from "../../../@types/cardTypes.ts";
import { TPromotion } from "../../../@types/promotionTypes.ts";
import ModalProduct from "../../Modals/ModalProduct/ModalProduct.tsx";

// 🔍 Fonction utilitaire pour vérifier si une promotion est active
function isPromotionActive(promotion: TPromotion | undefined): boolean {
  if (!promotion || !promotion.start_date || !promotion.end_date) return false;

  const now = new Date();
  const start = new Date(promotion.start_date);
  const end = new Date(promotion.end_date);

  return now >= start && now <= end;
}

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
  is_featured,
}: TProduct) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  // 🧠 Récupère la première promotion active (s’il y en a une)
  const activePromo: TPromotion | undefined = promotions.find((promo) =>
    isPromotionActive(promo)
  );

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  let finalPrice = numericPrice.toFixed(2);

  if (activePromo?.value !== undefined) {
    if (activePromo.type === "percentage") {
      finalPrice = (
        numericPrice -
        (numericPrice * activePromo.value) / 100
      ).toFixed(2);
    } else if (activePromo.type === "fixed") {
      finalPrice = Number(activePromo.value).toFixed(2);
    }
  }

  const hasPromo = !!activePromo && activePromo.value !== undefined;

  return (
    <>
      <div className={styles.card} onClick={handleOpenModal}>
        
        <img src={image} alt={title} className={styles.image} />
        

        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>{title}</h2>
          </div>

          {hasPromo ? (
            <>
              <span className={styles.badge}>
                {activePromo.type === "percentage"
                  ? `${activePromo.value}% de réduction !`
                  : `Prix spécial`}
              </span>
              <div className={styles.priceRow}>
                <p className={styles.oldPrice}>{numericPrice.toFixed(2)} €</p>
                <p className={styles.price}>{finalPrice} €</p>
              </div>
            </>
          ) : (
            <p className={`${styles.price} ${styles.noPromoPrice}`}>
              {numericPrice.toFixed(2)} €
            </p>
          )}

          <button className={styles.button}>Découvrir</button>
        </div>
      </div>

      {isOpen && (
        <ModalProduct
          product={{
            id,
            title,
            description,
            price,
            image,
            stock,
            category_id,
            supplier_id,
            promotions,
            is_featured,
          }}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
