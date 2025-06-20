import { Product, Category, Supplier, Promotion } from "../Models/Index.js";
import { Op, Sequelize } from "sequelize";
import { productSchema } from "../Validators/productValidator.js";
import cloudinary from "../Data/cloudinary.js";

export const productController = {

    createOne: async (req, res) => {
        
        const file = req.file; 

        const {error, value} = productSchema.validate(req.body);


        if(error) return res.status(400)
            .json({ message: error.details[0].message }); 

        try {

            const newProduct = await Product.create({...value, image: "", image_public_id: ""});

            if (file) {
                const cloudResult = await cloudinary.uploader.upload(file.path, {
                  folder: `products/${newProduct.id}`,
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
                        fetch_format: "auto"
                    }
                    ]
                });

            newProduct.image = cloudResult.secure_url;
            newProduct.image_public_id = cloudResult.public_id;

            await newProduct.save();
            }

            res.status(201).json(newProduct);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur serveur !" })
        }
    },

    getAll: async (req, res) => {

        const { category, promo, minPrice, maxPrice, inStock, supplier } = req.query;

        const where = {};

        if (category) where.category_id = category;
        if (promo === "true") where["$promotions.id$"] = { [Op.ne]: null };
        if (inStock === "true") where.stock = { [Op.gt]: 0 };
        if (supplier) where.supplier_id = supplier;
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
            if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
        }

        try {
            const products = await Product.findAll({
                where,
                include: [
                    {
                        model: Category,
                        as: "category",
                    }, 
                    {
                        model: Supplier,
                        as: "supplier",
                    },
                    {
                        model: Promotion,
                        as: "promotions", 
                        through: { attributes: [] }, 
                        attributes: ["id", "title", "description", "type", "value", "start_date", "end_date"]
                      }
                ]
            });

            res.status(200).json(products);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur serveur !" })
        }
    },

    getOne: async (req,res) => {

        const productId = req.params.id;

        try {
            const product = await Product.findByPk(productId, 
                {
                    include: [
                        {
                            model: Category,
                            as: "category",
                        }, 
                        {
                            model: Supplier,
                            as: "supplier",
                        },
                        {
                            model: Promotion,
                            as: "promotions", 
                            through: { attributes: [] }, 
                            attributes: ["id", "title", "description", "type", "value", "start_date", "end_date"]
                          }
                    ]
                });

            if (!product) {
                return res.status(404).json( {message: "Produit non trouvé !"} )
            }

            res.status(200).json(product);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur serveur !" })
        }
    },

    getSearch: async (req, res) => {

        const searchProduct = req.query.search;

        if(!searchProduct) {
            return res.status(400).json({ message: "Champ de recherche manquant." });
        }; 

        try {

            const products = await Product.findAll({
                where: Sequelize.where(
                    Sequelize.fn("unaccent", Sequelize.col("Product.title")),
                    {
                        [Op.iLike]: `%${searchProduct}%`
                    }
                ), 
                include: [
                    {
                        model: Category,
                        as: "category",
                        required: false,
                    }, 
                    {
                        model: Supplier,
                        as: "supplier",
                        required: false,
                    },
                    {
                        model: Promotion,
                        as: "promotions", 
                        through: { attributes: [] }, 
                        attributes: ["id", "title", "description", "type", "value", "start_date", "end_date"]
                      }
                ],
            });

            res.status(200).json(products);
            
        } catch (error) {
            console.error("Erreur lors de la recherche :", error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    },
    
    getFeatured: async (req, res) => {

        try {

          const featuredProducts = await Product.findAll({
            where: {
                is_featured: true
              },
              include: [
                {
                  model: Category,
                  as: "category"
                },
                {
                  model: Supplier,
                  as: "supplier"
                },
                {
                    model: Promotion,
                    as: "promotions",
                    through: { attributes: [] }, 
                    attributes: ["id", "title", "description", "type", "value", "start_date", "end_date"]
                  }
              ]
          }
        );
      
          res.status(200).json(featuredProducts);
      
        } catch (error) {
          console.error("Erreur chargement des produits mis en avant :", error);
          res.status(500).json({ message: "Erreur serveur !" });
        }
      },

      toggleFeatured: async (req, res) => {

        const productId = req.params.id;
      
        try {

          const product = await Product.findByPk(productId);
      
          if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
          }
      
          product.is_featured = !product.is_featured;

          await product.save();
      
          res.status(200).json({
            message: `Produit ${product.is_featured ? "mis en avant" : "retiré des produits en avant"}`,
            is_featured: product.is_featured
          });

        } catch (error) {
          console.error("Erreur mise à jour is_featured :", error);
          res.status(500).json({ message: "Erreur serveur" });
        }
      },

    editOne: async (req, res) => {

        const file = req.file;

        const {error, value} = productSchema.validate(req.body);

        if(error) return res.status(400)
            .json({ message: error.details[0].message });

        const productId = req.params.id;

        try { 
            const product = await Product.findByPk(productId); 
    
            if(!product) {
               return res.status(404).json( {message: "Produit non trouvé !"} )
            };

            if (file && product.image_public_id) {
                await cloudinary.uploader.destroy(product.image_public_id);
            };

            if (file) {
                const cloudResult = await cloudinary.uploader.upload(file.path, {
                  folder: `products/${product.id}`,
                  public_id: "main",
                  overwrite: true,
                  format: "webp",
                  transformation: [{ width: 600, height: 600, crop: "limit" }]
                });
        
                value.image = cloudResult.secure_url;
                value.image_public_id = cloudResult.public_id;
            };
            
            Object.entries(value).forEach(( [key, val] ) => {
                if (val !== undefined && val !== null && val !== "") {
                    product[key] = val;
                }
            });

            await product.save();
            
            res.status(200).json( {message:"Produit mis à jour avec succès ✅", product} );

        } catch (error) {
            console.error(error);
            res.status(500).json( {message: "Erreur serveur !"} )
        }
    }, 

    deleteOne: async (req, res) => {

        const productId = req.params.id;

        try {
            const product = await Product.findByPk(productId);

            if(!product) {
                return res.status(404).json( {message: "Produit non trouvé !"} )
             };

            if(product.image_public_id) {
                await cloudinary.uploader.destroy(product.image_public_id);
            }

            await product.destroy();

            res.status(204).end();
            
        } catch (error) {
            console.error(error);
            res.status(500).json( {message: "Erreur serveur !"} )
        }
    }, 

    uploadImg: (req, res) => {

        const file = req.file;

        return res.json({
            url: file.path, // L’URL finale de l’image hébergée
            public_id: file.filename // Pour éventuellement la supprimer
        });

    }
};
