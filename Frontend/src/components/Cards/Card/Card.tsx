// src/components/Card/Card.tsx
import React from "react";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";
import he from "../../../assets/he-card.png";

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
  return (
    <div className={styles.card}>
      <img src={he} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>{price} €</p>
          <Link to={`/produits/${id}`} className={styles.button}>
            Découvrir
          </Link>
      </div>
    </div>
  );
}
