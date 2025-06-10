import { Promotion, Product } from "../Models/Index.js";
import { promotionSchema } from "../Validators/promotionValidator.js";

export const promotionController = {
  createOne: async (req, res) => {
    const { error, value } = promotionSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      const { start_date, end_date, product_ids = [] } = value;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const start = new Date(start_date);
      const end = new Date(end_date);

      if (start < today) {
        return res.status(400).json({ message: "La date de début ne peut pas être dans le passé." });
      }

      start.setHours(0, 0, 0, 0);

      if (start.toDateString() === end.toDateString()) {
        end.setHours(23, 59, 59, 999);
      }

      value.start_date = start;
      value.end_date = end;

      const promotion = await Promotion.create(value);

      // Associe les produits via la table pivot
      if (product_ids.length > 0) {
        const products = await Product.findAll({
          where: { id: product_ids }
        });
        await promotion.addProducts(products);
      }

      res.status(201).json(promotion);

    } catch (err) {
      console.error("❌ Erreur dans createOne :", err);
      res.status(500).json({ message: "Erreur serveur !" });
    }
  },

  getAll: async (req, res) => {
    try {
      const promotions = await Promotion.findAll({
        include: {
          model: Product,
          as: "products"
        }
      });

      res.status(200).json(promotions);

    } catch (err) {
      res.status(500).json({ message: "Erreur serveur !" });
    }
  },

  getOne: async (req, res) => {
    try {
      const promo = await Promotion.findByPk(req.params.id, {
        include: {
          model: Product,
          as: "products"
        }
      });

      if (!promo) return res.status(404).json({ message: "Promotion introuvable." });

      res.status(200).json(promo);

    } catch (err) {
      res.status(500).json({ message: "Erreur serveur !" });
    }
  },

  editOne: async (req, res) => {
    const { error, value } = promotionSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      const promo = await Promotion.findByPk(req.params.id);
      if (!promo) return res.status(404).json({ message: "Promotion introuvable." });

      const { start_date, end_date, product_ids } = value;

      const today = new Date();
      today.setHours(0, 0, 0, 100);

      const start = new Date(start_date);
      const end = new Date(end_date);

      if (start < today) {
        return res.status(400).json({ message: "La date de début ne peut pas être dans le passé." });
      }

      start.setHours(0, 0, 0, 0);

      if (start.toDateString() === end.toDateString()) {
        end.setHours(23, 59, 59, 999);
      }

      value.start_date = start;
      value.end_date = end;

      Object.entries(value).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          promo[key] = val;
        }
      });

      await promo.save();

      // Optionnel : mettre à jour les produits liés
      if (product_ids) {
        const products = await Product.findAll({ where: { id: product_ids } });
        await promo.setProducts(products); // Remplace les anciennes associations
      }

      res.status(200).json({ message: "Promotion mise à jour ✅", promo });

    } catch (err) {
      console.error("Erreur modification promotion :", err);
      res.status(500).json({ message: "Erreur serveur !" });
    }
  },

  deleteOne: async (req, res) => {
    try {
      const promo = await Promotion.findByPk(req.params.id);
      if (!promo) return res.status(404).json({ message: "Promotion introuvable." });

      await promo.destroy();
      res.status(204).end();

    } catch (err) {
      res.status(500).json({ message: "Erreur serveur !" });
    }
  }
};
