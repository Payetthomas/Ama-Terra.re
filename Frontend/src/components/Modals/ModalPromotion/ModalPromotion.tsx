import axios from "axios";
import { useEffect, useState } from "react";
import { TProductPromo } from "../../../@types/cardTypes";
import { TPromotion } from "../../../@types/promotionTypes";
import styles from "./ModalPromotion.module.scss";

type TModalPromotionProps = {
    promotion?: TPromotion;
    products: TProductPromo[];
    onClose: () => void;
};

const ModalPromotion = ({
    promotion,
    products,
    onClose,
}: TModalPromotionProps) => {
    const [message, setMessage] = useState("");

    const [form, setForm] = useState<
        Omit<TPromotion, "id" | "product" | "products">
    >({
        type: "percentage",
        value: 0,
        start_date: "",
        end_date: "",
        title: "",
        description: "",
    });

    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const isEdit = promotion?.id !== undefined;

    useEffect(() => {
        if (isEdit && promotion) {
            setForm({
                type: promotion.type,
                value: promotion.value,
                start_date: new Date(promotion.start_date)
                    .toISOString()
                    .slice(0, 10),
                end_date: new Date(promotion.end_date)
                    .toISOString()
                    .slice(0, 10),
                title: promotion.title,
                description: promotion.description,
            });

            if (promotion.products && Array.isArray(promotion.products)) {
                const ids = promotion.products.map((p) => p.id);
                setSelectedProducts(ids);
            }
        }
    }, [promotion, isEdit]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const toggleProductSelection = (productId: number) => {
        setSelectedProducts((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId],
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        const payload = {
            ...form,
            value: Number.parseFloat(String(form.value)),
            start_date: new Date(form.start_date),
            end_date: new Date(form.end_date),
            product_ids: selectedProducts,
        };

        try {
            if (isEdit && promotion?.id) {
                await axios.put(
                    `http://localhost:1818/api/promotion/${promotion.id}`,
                    payload,
                );
                setMessage("✅ Promotion modifiée !");
            } else {
                await axios.post(
                    "http://localhost:1818/api/promotion",
                    payload,
                );
                setMessage("✅ Promotion ajoutée !");
            }

            onClose();
        } catch (err) {
            console.error(err);
            setMessage("❌ Erreur lors de l’envoi.");
        }
    };

    return (
        <section className={styles.addPromotion} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button type="button" className={styles.close} onClick={onClose}>
                    ×
                </button>
                <h2>
                    {isEdit ? "Modifier la promotion" : "Créer une promotion"}
                </h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    

                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="percentage">Pourcentage</option>
                        <option value="fixed">Prix fixe</option>
                    </select>

                    <input
                        type="number"
                        name="value"
                        value={form.value}
                        onChange={handleChange}
                        placeholder={
                            form.type === "percentage"
                                ? "Pourcentage %"
                                : "Montant fixe"
                        }
                        required
                    />

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

                    <div className={styles.productsList}>
                        <label>Produits concernés :</label>
                        <div className={styles.productSelector}>
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className={`${styles.productCard} ${selectedProducts.includes(product.id) ? styles.selected : ""}`}
                                    onClick={() => toggleProductSelection(product.id)}
                                >
                                    <img
                                        src={product.image || "/images/placeholder.png"}
                                        alt={product.title}
                                    />
                                    <div className={styles.info}>
                                        <h4>{product.title}</h4>
                                        {product.price && <p>{product.price} €</p>}
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(product.id)}
                                        readOnly
                                    />
                                </div>
                            ))}
                        </div>
                        {selectedProducts.length === 0 && (
                            <div className={styles.empty}>Aucun produit sélectionné.</div>
                        )}
                    </div>

                    <button type="submit">
                        {isEdit ? "Modifier" : "Ajouter"}
                    </button>
                </form>

                {message && <p>{message}</p>}
            </div>
        </section>
    );
};

export default ModalPromotion;
