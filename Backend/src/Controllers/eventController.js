import { Event } from "../Models/Index.js";
import { eventSchema } from "../Validators/eventValidator.js";
import cloudinary from "../Data/cloudinary.js"

export const eventController = {

  createOne: async (req, res) => {

    const file = req.file; 

    const { error, value } = eventSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      
      const newEvent= await Event.create({...value, image:"", image_public_id:""});

      if (file) {
        const cloudResult = await cloudinary.uploader.upload(file.path, 
            {
              folder: `events/${newEvent.id}`,
              public_id: "main",
              overwrite: true,
              format: "webp",
              transformation: [
                {
                  width: 400,
                  height: 400,
                  crop: "pad",
                  background: "auto",
                  quality: "auto",
                  fetch_format: "auto",
                },
              ],
            });
          
          
          newEvent.image = cloudResult.secure_url;
          newEvent.image_public_id = cloudResult.public_id;

          await newEvent.save();
        }

        res.status(201).json(newEvent);

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur !" })
      };

  },

  getAll: async (req, res) => {
    try {
      const events = await Event.findAll();
      res.status(200).json(events);
    } catch (err) {
      console.error("Erreur récupération événements :", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  getOne: async (req, res) => {
    const eventId = req.params.id;

    try {
      const event = await Event.findByPk(eventId);

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

    const file = req.file;

    const { error, value } = eventSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const eventId = req.params.id;

    try {

      const event = await Event.findByPk(eventId);

      if (!event) {
        return res.status(404).json({ message: "Événement non trouvé" });
      };

      if (file && event.image_public_id) {
        await cloudinary.uploader.destroy(event.image_public_id);
      };

      if (file) {
        const cloudResult = await cloudinary.uploader.upload(file.path, {
          folder: `events/${uploadResult.id}`,
          public_id: "main",
          overwrite: true,
          format: "webp",
          transformation: [{ width: 600, height: 600, crop: "limit" }]
        });

        value.image = cloudResult.secure_url;
        value.image_public_id = cloudResult.public_id;
    };

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

      if (event.image_public_id) {
        await cloudinary.uploader.destroy(event.image_public_id);
      }

      await event.destroy();

      res.status(204).end();

    } catch (err) {
      console.error("Erreur suppression événement :", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
};
