import Category from '../models/categoryModels.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({ error: "Name is required" })
        };

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.json({ error: "Already exists" })
        };

        const category = await new Category({ name }).save();
        res.json(category)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
});

// update category by admin
const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        category.name = name;

        const updatedCategory = await category.save();
        res.json(updatedCategory);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// delete category
const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        await Category.findByIdAndDelete(req.params.categoryId);
        res.json({ message: "Category removed successfully", name: category.name });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


// All categories
const listCategory = asyncHandler(async (req, res) => {
    try {
        const allCategories = await Category.find({});
        res.json(allCategories);

    } catch (error) {
        console.error(error);
        return res.status(400).json(error.message);
    }
});

// Get gategory by id
const getCategoryById = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findById({ _id: req.params.id })
        res.json(category);

    } catch (error) {
        console.error(error);
        return res.status(400).json(error.message);
    }
})

export { createCategory, updateCategory, deleteCategory, listCategory, getCategoryById }