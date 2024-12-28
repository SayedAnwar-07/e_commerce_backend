import express from "express";
import { authenticate, authorizedAdmin } from '../middlewares/authMiddleware.js'

import {
    createCategory,
    updateCategory,
    deleteCategory,
    listCategory,
    getCategoryById
} from "../controllers/categoryControllers.js";



const router = express.Router();

router.route("/")
    .post(authenticate, authorizedAdmin, createCategory);

router.route("/categories").get(listCategory);

router.route("/:id").get(getCategoryById);


router.route("/:categoryId")
    .put(authenticate, authorizedAdmin, updateCategory);

router.route('/:categoryId')
    .delete(authenticate, authorizedAdmin, deleteCategory);


export default router