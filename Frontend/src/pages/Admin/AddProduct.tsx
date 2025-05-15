import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AddProduct.module.scss";
import { Tcategory } from "../../@types/catTypes.ts";
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
    image: "",
    stock: "",
    category_id: "",
    supplier_id: "",
  });
  const [formSup, setFormSup] = useState({
    name: "",
    contact_email: "",
    phone: "",
    adresse: "",
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

                                  //** SECTION PRODUIT */ 

// Ajout les informations du produit a modifier dans les champs concernés

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:1818/api/product/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error("Erreur chargement produit", err));
    }
  }, [id])

// Envoie du formulaire pour ajouter OU modifier un produit

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const productForm = {
      title: form.title,
      description: form.description,
      image: form.image,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      category_id: parseInt(form.category_id),
      supplier_id: parseInt(form.supplier_id),
    };

    console.log("Payload envoyé :", productForm);


    try {
      if (id) {
        await axios.put(`http://localhost:1818/api/product/${id}`, productForm);

        setMessage("✅ Produit modifié !");
        
      } else {
        await axios.post("http://localhost:1818/api/product", productForm);

        setMessage("✅ Produit ajouté !");
      }

      setForm({
        title: "",
        description: "",
        price: "",
        image: "",
        stock: "",
        category_id: "",
        supplier_id: "",
      });
    } catch (err) {
      setMessage("❌ Erreur lors de l’ajout.");
      console.error(err);
    }
  };

                                  //** SECTION CATEGORIE */ 

  async function fetchCategories() {

    try {
      const result = await axios.get("http://localhost:1818/api/category");
      setCategories(result.data);
      
    } catch (error) {
      console.error("Erreur lors du chargement des catégories", error);
    }
  }
  useEffect( () => {

    fetchCategories();

  }, []);

  // Envoie de l'input pour ajouter une categorie

  const handleAddCategory = async () => {
    
    try {

      await axios.post("http://localhost:1818/api/category", {name: newCategory} );
      setNewCategory("");
      setMessage("✅ Categorie ajouté !")
      setShowModal(null)
      fetchCategories();
      
    } catch (error) {
      alert("Erreur ajout de la catégorie")
    }
  };

                                          //** SECTION FOURNISSEUR */ 

  const handleChangeSupplier = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormSup(prev => ({ ...prev, [name]: value }));
  };
                                          

  async function fetchSuppliers() {

     try {
      const result = await axios.get("http://localhost:1818/api/supplier");
        setSuppliers(result.data);
                                              
     } catch (error) {
        console.error("Erreur lors du chargement des fournisseurs", error);
      }
  }
    useEffect( () => {
                                        
      fetchSuppliers();
                                        
    }, []);
  
  // Envoie du form pour ajouter un nouveau fournisseur

  const handleAddSupplier = async (e: React.FormEvent) => {

    e.preventDefault(); 
    setMessage("");

    try {

      const result = await axios.post("http://localhost:1818/api/supplier", formSup);

      setMessage("✅ Fournisseur ajouté !")

      setFormSup({
        name: "",
        contact_email: "",
        phone: "",
        adresse: "",
      });
      
      fetchSuppliers();
    } catch (error) {
      alert("Erreur ajout du fournisseur")
    }
  }

  return (
    <section className={styles.addProduct}>
      <h2>Ajouter un produit</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="title" placeholder="Titre" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <input name="price" type="number" placeholder="Prix (€)" value={form.price} onChange={handleChange} required />
        <input name="image" placeholder="Image (URL)" value={form.image} onChange={handleChange} />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />

        <div className={styles.inlineField}>
          <select name="category_id" value={form.category_id} onChange={handleChange} required>
                <option value=""> -- Sélectionner une catégorie -- </option>
                {categories.map((cat: Tcategory) => (
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
              )
            }

            {showModal === "addSupplier" && ( 
                <div className={styles.modalOverlay}>
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
                </div>
             
            )}

          </div>
        </div>
      )}

    </section>
  );
};

export default AddProduct;
