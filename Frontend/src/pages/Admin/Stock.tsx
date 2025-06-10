import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Stock.module.scss"; 
import { TProduct } from "../../@types/cardTypes";
import { Link, useNavigate } from "react-router-dom";

const Stock = () => {

    const navigate = useNavigate(); 

    const [products, setProducts] = useState<TProduct[]>([]);

    const fetchProducts = async () => {

        const result = await axios.get("http://localhost:1818/api/product");
        setProducts(result.data); 
    };

    const handleDelete = async (id: number) => {

        await axios.delete(`http://localhost:1818/api/product/${id}`);
        fetchProducts(); 
    };
    
    const toggleFeatured = async (id: number) => {

      try {
        const res = await axios.put(`http://localhost:1818/api/product/${id}/featured`);
        
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id
              ? { ...product, is_featured: res.data.is_featured }
              : product
          )
        );

      } catch (error) {
        console.error("Erreur mise à jour produit", error);
      }
    };

    useEffect(() => {
        fetchProducts(); 
    }, []); 

    return (
      <div className={styles.container}>
        <h2 className={styles.container_title}>Stock des produits</h2>

    <div className={styles.addBtnWrapper}>
        <button type="button" onClick={() => navigate("/admin/ajout-produit")} className={styles.addBtn}> + Ajouter </button>
    </div>
  
        <table className={styles.stockTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Catégorie</th>
              <th>Fournisseur</th>
              <th>Mise en avant</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((entry: TProduct) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.title}</td>
                <td>{entry.description}</td>
                <td>{entry.price}</td>
                <td>{entry.stock}</td>
                <td>{entry.category?.name}</td>
                <td>{entry.supplier?.name}</td>

                <td>
                  <button onClick={() => toggleFeatured(entry.id)}>
                  {entry.is_featured ? "❌ Retirer" : "✅ Mettre en avant"}
                  </button>
                </td>

                <td>
                  <Link
                    to={`/admin/ajout-produit/${entry.id}`}
                    className={styles.editButton}
                  >
                    ✍🏼
                  </Link>

                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(entry.id)}
                  >
                    🗑️
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default Stock; 