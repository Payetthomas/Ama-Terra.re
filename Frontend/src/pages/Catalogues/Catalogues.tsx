import { useState, useEffect } from "react";
import styles from "./Catalogues.module.scss"; 
import CardProduct from "../../components/Cards/Card/Card";
import { TProduct } from "../../@types/cardTypes";

const Catalogues = () => {



    return (
        <main className="container-product">
            <section className={styles.catalogue}>
                <h1 className={styles.title}>Notre Catalogue</h1>
                <div className={styles.grid}>
                    {data.map((product: TProduct) => (
                    <CardProduct
                        key={product.id}
                        {...product}
                    />
                    ))}
                </div>
            </section>Ò
        </main>

    );
}; 

export default Catalogues;   