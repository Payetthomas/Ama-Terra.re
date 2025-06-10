import { Event, Category } from "../Models/Index.js";
import { eventSchema } from "../Validators/eventValidator.js";

export const eventController = {

  createOne: async (req, res) => {
    
    const { error, value } = eventSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const newEvent = await Event.create(value);
      res.status(201).json(newEvent);

    } catch (err) {
      console.error("Erreur création événement :", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  getAll: async (req, res) => {

    try {

      const events = await Event.findAll({
        include: {
          model: Category,
          as: "category",
          attributes: ["id", "name"]
        },
        order: [["event_date", "ASC"]]
      });

      res.status(200).json(events);

    } catch (err) {
      console.error("Erreur récupération événements :", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  getOne: async (req, res) => {

    const eventId = req.params.id;

    try {

      const event = await Event.findByPk(eventId, {
        include: {
          model: Category,
          as: "category",
          attributes: ["id", "name"]
        }
      });

      if (!event) {
        return res.status(404).json({ message: "Événement introuvable" });
      }

      res.status(200).json(event);

    } catch (err) {
      console.error("Erreur récupération événement :", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  editOne: async (req, res) => {

    const eventId = req.params.id;

    const { error, value } = eventSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {

      const event = await Event.findByPk(eventId);

      if (!event) {
        return res.status(404).json({ message: "Événement non trouvé" });
      }

      Object.entries(value).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          event[key] = val;
        }
      });

      await event.save();

      res.status(200).json({ message: "Événement mis à jour ✅", event });

    } catch (err) {
      console.error("Erreur mise à jour événement :", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  deleteOne: async (req, res) => {

    const eventId = req.params.id;

    try {

      const event = await Event.findByPk(eventId);

      if (!event) {
        return res.status(404).json({ message: "Événement non trouvé" });
      }

      await event.destroy();

      res.status(204).end();

    } catch (err) {
      console.error("Erreur suppression événement :", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
};
