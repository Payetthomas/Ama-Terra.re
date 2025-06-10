import styles from "./ModalProduct.module.scss";
import { TProduct } from "../../../@types/cardTypes";
import { TPromotion } from "../../../@types/promotionTypes";

type TModalProduct = {
  product: TProduct;
  onClose: () => void;
};

// 🔍 Vérifie si la promo est actuellement active
function isPromotionActive(promo: TPromotion | undefined): boolean {
  if (!promo || !promo.start_date || !promo.end_date) return false;

  const now = new Date();
  const start = new Date(promo.start_date);
  const end = new Date(promo.end_date);

  return now >= start && now <= end;
}

const ModalProduct = ({ product, onClose }: TModalProduct) => {
  const activePromo = product.promotions?.find(isPromotionActive);

  const numericPrice =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price;

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

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>×</button>

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img src={product.image} alt={product.title} />
          </div>

          <div className={styles.details}>
            <h2>{product.title}</h2>
            <p className={styles.description}>{product.description}</p>

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

            <p className={styles.price}>{finalPrice} €</p>

            {/* <button className={styles.button}>Ajouter au panier 🛒</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProduct;
