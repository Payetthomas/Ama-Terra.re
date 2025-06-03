import styles from "./ModalProduct.module.scss";
import { TProduct } from "../../@types/cardTypes";

type TModalProduct = {
  product: TProduct;
  onClose: () => void;
};

const ModalProduct = ({ product, onClose }: TModalProduct) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>×</button>
        <img className={styles.img} src={product.image} alt={product.title} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className={styles.price}>{product.price} €</p>
      </div>
    </div>
  );
};

export default ModalProduct;
