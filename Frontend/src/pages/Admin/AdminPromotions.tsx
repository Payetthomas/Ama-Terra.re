import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminPromotions.module.scss";

import { TPromotion } from "../../@types/promotionTypes";
import { TProductPromo } from "../../@types/cardTypes";
import ModalPromotion from "../../components/Modals/ModalPromotion/ModalPromotion";

const AdminPromotions = () => {
  const [promotions, setPromotions] = useState<TPromotion[]>([]);
  const [products, setProducts] = useState<TProductPromo[]>([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editPromo, setEditPromo] = useState<TPromotion | null>(null);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setEditPromo(null);
  };

  // 🔁 Chargement initial des promotions et des produits
  useEffect(() => {
    fetchPromotions();
    fetchProducts();
  }, []);

  const fetchPromotions = async () => {
    try {
      const res = await axios.get("http://localhost:1818/api/promotion");
      setPromotions(res.data);
    } catch (err) {
      console.error("Erreur chargement promotions", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:1818/api/product");
      setProducts(res.data);
    } catch (err) {
      console.error("Erreur chargement produits", err);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("❗ Confirmer la suppression de cette promotion ?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:1818/api/promotion/${id}`);
      fetchPromotions();
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  const now = new Date();
  const currentPromos = promotions.filter(p => new Date(p.start_date) <= now && new Date(p.end_date) >= now);
  const futurePromos = promotions.filter(p => new Date(p.start_date) > now);

  return (
    <div className={styles.adminPromotions}>
      <h1>Gestion des Promotions</h1>

      <button
        className={styles.createButton}
        onClick={() => {
          setEditPromo(null);
          handleOpenModal();
        }}
      >
        ➕ Ajouter une promotion
      </button>

      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={handleCloseModal} />
          <ModalPromotion
            promotion={editPromo ?? undefined}
            products={products}
            onClose={() => {
              fetchPromotions();
              handleCloseModal();
            }}
          />
        </>
      )}

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <PromoSection
            title="📢 Promotions en cours"
            promotions={currentPromos}
            onEdit={(promo) => {
              setEditPromo(promo);
              handleOpenModal();
            }}
            onDelete={handleDelete}
          />

          <PromoSection
            title="⏳ Promotions à venir"
            promotions={futurePromos}
            onEdit={(promo) => {
              setEditPromo(promo);
              handleOpenModal();
            }}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

type PromoSectionProps = {
  title: string;
  promotions: TPromotion[];
  onEdit: (promo: TPromotion) => void;
  onDelete: (id: number) => void;
};

const PromoSection = ({ title, promotions, onEdit, onDelete }: PromoSectionProps) => {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {promotions.length === 0 ? (
        <p className={styles.empty}>Aucune promotion.</p>
      ) : (
        <ul className={styles.list}>
          {promotions.map((promo) => (
            <li key={promo.id} className={styles.promoItem}>
              <div className={styles.info}>
                <h3>{promo.title}</h3>
                <p>{promo.description}</p>
                <p className={styles.meta}>
                  Produits :
                  {promo.products && promo.products.length > 0
                    ? promo.products.map((p) => p.title).join(", ")
                    : " Aucun produit"}
                  {" | "}Type : {promo.type} | Valeur : {promo.value}
                </p>
                <p>
                  Du {new Date(promo.start_date).toLocaleDateString()} au{" "}
                  {new Date(promo.end_date).toLocaleDateString()}
                </p>
              </div>
              <div className={styles.actions}>
                <button className={styles.edit} onClick={() => onEdit(promo)}>✏️ Modifier</button>
                <button className={styles.delete} onClick={() => onDelete(promo.id)}>🗑️ Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AdminPromotions;
