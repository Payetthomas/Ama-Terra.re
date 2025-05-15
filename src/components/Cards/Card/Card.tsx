// src/components/Card/Card.tsx
import React from "react";
import styles from "./Card.module.scss"; // ✅ Import du CSS module

type TCardProps = {
  title: string;
  image: string;
  price: number;
  description: string;
  link?: string;
};

export default function CardProduct(product: TCardProps) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>{product.price.toFixed(2)} €</p>
        {product.link && (
          <a href={product.link} className={styles.button}>
            Découvrir
          </a>
        )}
      </div>
    </div>
  );
}
