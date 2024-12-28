import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModals.js";

// Add products
const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, image, brand, quantity, category, description, price } = req.fields;

        // Validations
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }
        if (!brand) {
            return res.status(400).json({ error: "Brand is required" });
        }
        if (!description) {
            return res.status(400).json({ error: "Description is required" });
        }
        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        }
        if (!price) {
            return res.status(400).json({ error: "Price is required" });
        }
        if (!quantity) {
            return res.status(400).json({ error: "Quantity is required" });
        }

        // Create new product
        const product = new Product({
            name,
            image,
            brand,
            category,
            description,
            price,
            quantity,
        });

        await product.save();
        res.json(product);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});


// Update product by id
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { name, image, brand, quantity, category, description, price } = req.fields;

        // Validations
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }
        if (!brand) {
            return res.status(400).json({ error: "Brand is required" });
        }
        if (!description) {
            return res.status(400).json({ error: "Description is required" });
        }
        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        }
        if (!price) {
            return res.status(400).json({ error: "Price is required" });
        }
        if (!quantity) {
            return res.status(400).json({ error: "Quantity is required" });
        }

        const product = await Product.findByIdAndUpdate(req.params.id, { ...req.fields }, { new: true })
        await product.save();
        res.json(product);

    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
});


// delete product by id
const removeProducts = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product removed successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get Products
const fetchProducts = asyncHandler(async (req, res) => {
    try {
        const pageSize = 6;
        const keyword = req.query.keyword ? {
            name: { $regex: req.query.keyword, $options: "i" }
        } : {}

        const count = await Product.countDocuments(keyword) // No spread needed here
        const products = await Product.find(keyword).limit(pageSize) // No spread needed here

        res.json({
            products,
            page: 1,
            pages: Math.ceil(count / pageSize),
            hasMore: false,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

// Get products by id
const fetchProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product)
        } else {
            res.status(404);
            throw new Error("Product not found")
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Product not found' });
    }
});


// Fetching all products
const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
            .populate("category")
            .limit(12)
            .sort({ createAt: -1 });

        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

// add review
const addProductsReviews = asyncHandler(async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                r => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                res.status(400).json("Product already reviewd")
            }

            const review = {
                user: req.user._id,
                name: req.user.username,
                rating: Number(rating),
                comment,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;

            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

            await product.save();
            res.status(201).json({ message: "Review added" })
        } else {
            res.status(404)
            throw new Error("Product not found")
        }


    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Product not found' });
    }
});

// All top products
const fetchTopProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(4)
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: error.message, stack: error.stack })
    }
});


// All New products
const fetchNewProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(5)
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
});


export {
    addProduct,
    updateProduct,
    removeProducts,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductsReviews,
    fetchTopProducts,
    fetchNewProducts,
};