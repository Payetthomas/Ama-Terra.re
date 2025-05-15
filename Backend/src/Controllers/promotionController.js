import { Promotion, Product } from "../Models/Index.js";
import { promotionSchema } from "../Validators/promotionValidator.js";

export const promotionController = {

  createOne: async (req, res) => {
    const { error, value } = promotionSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      const existing = await Promotion.findOne({ where: { product_id: value.product_id } });
      if (existing) return res.status(409).json({ message: "Promotion déjà existante pour ce produit." });

      const promotion = await Promotion.create(value);
      res.status(201).json(promotion);

    } catch (err) {
      console.error("Erreur création promotion :", err);
      res.status(500).json({ message: "Erreur serveur !" });
    }
  },

  
  getAll: async (req, res) => {

    try {
      const promotions = await Promotion.findAll({
        include: { model: Product, as: "product" }
      });
      res.status(200).json(promotions);

    } catch (err) {
      res.status(500).json({ message: "Erreur serveur !" });
    }
  },

  
  getOne: async (req, res) => {

    try {
      const promo = await Promotion.findByPk(req.params.id, {
        include: { model: Product, as: "product" }
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

      Object.entries(value).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          promo[key] = val;
        }
      });

      await promo.save();
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
  },
};
