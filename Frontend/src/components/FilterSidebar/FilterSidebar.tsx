import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./FilterSidebar.module.scss";
import { TCategory } from "../../@types/catTypes";
import { TSupplier } from "../../@types/supplierTypes";
import axios from "axios";

const FilterSidebar = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [suppliers, setSuppliers] = useState<TSupplier[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, supRes] = await Promise.all([
          axios.get("http://localhost:1818/api/category"),
          axios.get("http://localhost:1818/api/supplier"),
        ]);
        setCategories(catRes.data);
        setSuppliers(supRes.data);
      } catch (error) {
        console.error("Erreur chargement filtres :", error);
      }
    };

    fetchData();
  }, []);

  const updateFilter = (key: string, value: string | boolean) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "" || value === false) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  return (
    <aside className={styles.sidebar}>
      <h3>Filtres</h3>

      {/* Catégories */}
      <label>
        Catégorie :
        <select
          value={searchParams.get("category") || ""}
          onChange={(e) => updateFilter("category", e.target.value)}
        >
          <option value="">Toutes</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      {/* Fournisseurs */}
      <label>
        Fournisseur :
        <select
          value={searchParams.get("supplier") || ""}
          onChange={(e) => updateFilter("supplier", e.target.value)}
        >
          <option value="">Tous</option>
          {suppliers.map((sup) => (
            <option key={sup.id} value={sup.id}>
              {sup.name}
            </option>
          ))}
        </select>
      </label>

      {/* Prix min / max */}
      <label>
        Prix min :
        <input
          type="number"
          value={searchParams.get("minPrice") || ""}
          onChange={(e) => updateFilter("minPrice", e.target.value)}
        />
      </label>

      <label>
        Prix max :
        <input
          type="number"
          value={searchParams.get("maxPrice") || ""}
          onChange={(e) => updateFilter("maxPrice", e.target.value)}
        />
      </label>

      {/* Tri prix */}
      <label>
        Trier par prix :
        <select
          value={searchParams.get("order") || ""}
          onChange={(e) => updateFilter("order", e.target.value)}
        >
          <option value="">Aucun</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
      </label>

      {/* En promotion */}
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={searchParams.get("promo") === "true"}
          onChange={(e) => updateFilter("promo", e.target.checked)}
        />
        En promotion
      </label>

      {/* En stock */}
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={searchParams.get("inStock") === "true"}
          onChange={(e) => updateFilter("inStock", e.target.checked)}
        />
        En stock
      </label>

      {/* Réinitialiser */}
      <button onClick={resetFilters} className={styles.reset}>
        🔄 Réinitialiser
      </button>
    </aside>
  );
};

export default FilterSidebar;
