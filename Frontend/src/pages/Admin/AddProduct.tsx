import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AddProduct.module.scss";
import { TCategory } from "../../@types/catTypes.ts";
import { TSupplier } from "../../@types/supplierTypes.ts";
import { useParams } from "react-router-dom";

const AddProduct = () => {
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState<null | "addCategory" | "addSupplier">(null);
  const [newCategory, setNewCategory] = useState("");
  const { id } = useParams();

  
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    supplier_id: "",
  });

  
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formSup, setFormSup] = useState({
    name: "",
    contact_email: "",
    phone: "",
    adresse: "",
  });

  
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:1818/api/product/${id}`)
        .then(res => {
          const { title, description, price, stock, category_id, supplier_id } = res.data;
          setForm({ title, description, price, stock, category_id, supplier_id });
        })
        .catch(err => console.error("Erreur chargement produit", err));
    }
  }, [id]);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const formData = new FormData();

      
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (id) {
        
        await axios.put(`http://localhost:1818/api/product/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("✅ Produit modifié !");
      } else {
      
        await axios.post("http://localhost:1818/api/product", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("✅ Produit ajouté !");
      }

    
      setForm({
        title: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        supplier_id: "",
      });
      setImageFile(null);
    } catch (err) {
      setMessage("❌ Erreur lors de l’ajout.");
      console.error(err);
    }
  };

  
  async function fetchCategories() {
    try {
      const result = await axios.get("http://localhost:1818/api/category");
      setCategories(result.data);
    } catch (error) {
      console.error("Erreur chargement catégories", error);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      await axios.post("http://localhost:1818/api/category", { name: newCategory });
      setNewCategory("");
      setMessage("✅ Catégorie ajoutée !");
      setShowModal(null);
      fetchCategories();
    } catch (error) {
      alert("Erreur ajout catégorie");
    }
  };


  const handleChangeSupplier = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormSup(prev => ({ ...prev, [name]: value }));
  };

  async function fetchSuppliers() {
    try {
      const result = await axios.get("http://localhost:1818/api/supplier");
      setSuppliers(result.data);
    } catch (error) {
      console.error("Erreur chargement fournisseurs", error);
    }
  }
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleAddSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:1818/api/supplier", formSup);
      setMessage("✅ Fournisseur ajouté !");
      setFormSup({
        name: "",
        contact_email: "",
        phone: "",
        adresse: "",
      });
      fetchSuppliers();
    } catch (error) {
      alert("Erreur ajout fournisseur");
    }
  };

  return (
    <section className={styles.addProduct}>
      <h2>{id ? "Modifier un produit" : "Ajouter un produit"}</h2>

      <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
        <input name="title" placeholder="Titre" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <input name="price" type="number" placeholder="Prix (€)" value={form.price} onChange={handleChange} required />

        {/* ⬇️ Nouveau champ pour uploader une image fichier */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required={!id} // image obligatoire si on ajoute, mais pas en modification
        />

        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />

        <div className={styles.inlineField}>
          <select name="category_id" value={form.category_id} onChange={handleChange} required>
            <option value=""> -- Sélectionner une catégorie -- </option>
            {categories.map((cat: TCategory) => (
              <option key={cat.id} value={cat.id}> {cat.name} </option>
            ))}
          </select>
          <button type="button" onClick={() => setShowModal("addCategory")} className={styles.addBtn}> + </button>
        </div>

        <div className={styles.inlineField}>
          <select name="supplier_id" value={form.supplier_id} onChange={handleChange} required>
            <option value=""> -- Sélectionner un fournisseur -- </option>
            {suppliers.map((sup: TSupplier) => (
              <option key={sup.id} value={sup.id}> {sup.name} </option>
            ))}
          </select>
          <button type="button" onClick={() => setShowModal("addSupplier")} className={styles.addBtn}> + </button>
        </div>

        <button type="submit">{id ? "Modifier" : "Ajouter"}</button>
      </form>

      {message && <p>{message}</p>}

      {/* Modaux pour ajouter catégorie ou fournisseur */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {showModal === "addCategory" && (
              <div>
                <h3>Ajouter une catégorie</h3>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Nom de la catégorie"
                />
                <div className={styles.modalActions}>
                  <button onClick={handleAddCategory}>Ajouter</button>
                  <button onClick={() => setShowModal(null)} className={styles.cancel}>Annuler</button>
                </div>
                {message && <p>{message}</p>}
              </div>
            )}

            {showModal === "addSupplier" && (
              <div className={styles.modal}>
                <button className={styles.close} onClick={() => setShowModal(null)}>✖</button>
                <h3>Ajouter un fournisseur</h3>
                <form onSubmit={handleAddSupplier} className={styles.form}>
                  <input name="name" placeholder="Nom" onChange={handleChangeSupplier} required />
                  <input name="contact_email" placeholder="Email" onChange={handleChangeSupplier} />
                  <input name="phone" placeholder="Téléphone" onChange={handleChangeSupplier} />
                  <textarea name="adresse" placeholder="Adresse" onChange={handleChangeSupplier} />
                  <button type="submit">Ajouter</button>
                </form>
                {message && <p>{message}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default AddProduct;
