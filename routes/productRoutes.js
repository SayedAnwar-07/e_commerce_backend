import express from "express";
import ExpressFormidable from "express-formidable";
import { authenticate, authorizedAdmin } from '../middlewares/authMiddleware.js';
import {
    addProduct,
    updateProduct,
    removeProducts,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductsReviews,
    fetchTopProducts,
    fetchNewProducts,
} from "../controllers/productControllers.js";
import checkId from "../middlewares/checkId.js";

const router = express.Router();

router.route("/")
    .get(fetchProducts)
    .post(authenticate, authorizedAdmin, ExpressFormidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);

router.route("/top").get(fetchTopProducts);
router.route("/new").get(fetchNewProducts);

router.route("/:id")
    .get(fetchProductById)
    .put(authenticate, authorizedAdmin, ExpressFormidable(), updateProduct)
    .delete(authenticate, authorizedAdmin, removeProducts);

router.route("/:id/reviews")
    .post(authenticate, authorizedAdmin, checkId, addProductsReviews);

export default router;
