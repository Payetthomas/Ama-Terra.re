import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AddPromotion.module.scss";
import { TProduct } from "../../@types/cardTypes";


const AddPromotion = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    product_id: "",
    type: "percentage", // default
    value: "",
    start_date: "",
    end_date: "",
    title: "",
    description: "",
  });

  // Récupérer les produits existants
  useEffect(() => {
    axios.get("http://localhost:1818/api/product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Erreur chargement produits", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      ...form,
      product_id: parseInt(form.product_id),
      value: parseFloat(form.value),
    };

    try {
      await axios.post("http://localhost:1818/api/promotion", payload);
      setMessage("✅ Promotion ajoutée !");
      setForm({
        product_id: "",
        type: "percentage",
        value: "",
        start_date: "",
        end_date: "",
        title: "",
        description: "",
      });
    } catch (err) {
      setMessage("❌ Erreur lors de l’ajout");
      console.error(err);
    }
  };

  return (
    <section className={styles.addPromotion}>
      <h2>Ajouter une promotion</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <select name="product_id" value={form.product_id} onChange={handleChange} required>
          <option value="">-- Choisir un produit --</option>
          {products.map((prod) => (
            <option key={prod.id} value={prod.id}>{prod.title}</option>
          ))}
        </select>

        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="percentage">Pourcentage</option>
          <option value="fixed">Prix fixe</option>
        </select>

        <input
          type="number"
          name="value"
          placeholder={form.type === "percentage" ? "Pourcentage %" : "Prix remisé"}
          value={form.value}
          onChange={handleChange}
          required
        />

        <input type="date" name="start_date" value={form.start_date} onChange={handleChange} required />
        <input type="date" name="end_date" value={form.end_date} onChange={handleChange} required />

        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Titre de la promotion" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description (facultatif)" />

        <button type="submit">Valider</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
};

export default AddPromotion;
