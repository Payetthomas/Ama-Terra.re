import { useEffect, useState } from "react";
import { TPromotion } from "../../../@types/promotionTypes";
import { TProductPromo } from "../../../@types/cardTypes";
import axios from "axios";
import styles from "./ModalPromotion.module.scss";

type TModalPromotionProps = {
  promotion?: TPromotion;
  products: TProductPromo[];
  onClose: () => void;
};

const ModalPromotion = ({ promotion, products, onClose }: TModalPromotionProps) => {
  const [message, setMessage] = useState("");

  // Initialisation du formulaire, sans les champs inutiles à l'envoi
  const [form, setForm] = useState<Omit<TPromotion, "id" | "product">>({
    product_id: 0,
    type: "percentage",
    value: 0,
    start_date: "",
    end_date: "",
    title: "",
    description: "",
  });

  const isEdit = promotion?.id !== undefined;

  // Pré-remplissage du formulaire si on est en mode édition
  useEffect(() => {
    if (isEdit && promotion) {
      setForm({
        product_id: promotion.product_id,
        type: promotion.type,
        value: promotion.value,
        start_date: new Date(promotion.start_date).toISOString().slice(0, 10),
        end_date: new Date(promotion.end_date).toISOString().slice(0, 10),
        title: promotion.title,
        description: promotion.description,
      });
    }
  }, [promotion, isEdit]);

  // Mise à jour des champs du formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // On prépare les données à envoyer à l'API
    const promoForm = {
      ...form,
      product_id: parseInt(String(form.product_id)),
      value: parseFloat(String(form.value)),
      start_date: new Date(form.start_date),
      end_date: new Date(form.end_date),
    };

    try {
      if (isEdit && promotion?.id) {
        await axios.put(`http://localhost:1818/api/promotion/${promotion.id}`, promoForm);
        setMessage("✅ Promotion modifiée !");
      } else {
        await axios.post(`http://localhost:1818/api/promotion`, promoForm);
        setMessage("✅ Promotion ajoutée !");
      }

      // Fermeture du modal après succès
      onClose();
    } catch (error) {
      setMessage("❌ Erreur lors de l’envoi.");
      console.error(error);
    }
  };

  return (
    <section className={styles.addPromotion} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

    <button className={styles.close} onClick={onClose}>×</button>
      <h2>{isEdit ? "Modifier la promotion" : "Ajouter une promotion"}</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Choix du produit */}
        <select name="product_id" value={form.product_id} onChange={handleChange} required>
          <option value="">-- Choisir un produit --</option>
          {products.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.title}
            </option>
          ))}
        </select>

        {/* Type de promotion */}
        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="percentage">Pourcentage</option>
          <option value="fixed">Prix fixe</option>
        </select>

        {/* Valeur de la promotion */}
        <input
          type="number"
          name="value"
          placeholder={form.type === "percentage" ? "Pourcentage %" : "Prix remisé"}
          value={form.value}
          onChange={handleChange}
          required
        />

        {/* Dates de validité */}
        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          required
        />

        {/* Titre et description */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre de la promotion"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (facultatif)"
        />

        <button type="submit">{isEdit ? "Modifier" : "Ajouter"}</button>
      </form>
        </div>

      {message && <p>{message}</p>}
    </section>
  );
};

export default ModalPromotion;
