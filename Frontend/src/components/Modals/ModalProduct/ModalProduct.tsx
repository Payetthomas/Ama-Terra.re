import styles from "./ModalProduct.module.scss";
import { TProduct } from "../../../@types/cardTypes"; 

type TModalProduct = {
  product: TProduct;
  onClose: () => void;
};

const ModalProduct = ({ product, onClose }: TModalProduct) => {

  const activePromo = product.promotions?.[0];

  const numericPrice = typeof product.price === "string"
    ? parseFloat(product.price)
    : product.price

  let finalPrice = numericPrice.toFixed(2);

  if (activePromo && activePromo.value !== undefined) {
    if (activePromo.type === "percentage") {
        finalPrice = (numericPrice - (numericPrice * activePromo.value) / 100).toFixed(2);
      } else if (activePromo.type === "fixed") {
        const promoPrice = Number(activePromo.value);
        finalPrice = promoPrice.toFixed(2);
      }
    }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>×</button>
        <img className={styles.img} src={product.image} alt={product.title} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>

        {activePromo && activePromo.value !== undefined && (
          <div className={styles.promo}>
            <span className={styles.badge}>
              {activePromo.type === "percentage"
                ? `${activePromo.value}% de réduction !`
                : `Prix spécial !`}
            </span>
            <p className={styles.oldPrice}>{numericPrice.toFixed(2)} €</p>
          </div>
        )}
        <p className={styles.price}>{finalPrice} €</p>
      </div>
    </div>
  );
};

export default ModalProduct;
