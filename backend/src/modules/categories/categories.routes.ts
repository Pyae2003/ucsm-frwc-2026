import { Router } from 'express';
import {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory,
	reorderCategories,
} from "./categories.controller.js";
import { validateBody, validateParams, authMiddleware } from '../../middleware/index.js';
import {
	createCategorySchema,
	updateCategorySchema,
	categoryIdSchema,
	reorderCategoriesSchema,
} from "./categories.schema.js";

const router = Router();

// Public routes
router.get("/", getCategories);
router.get("/:id", validateParams(categoryIdSchema), getCategory);

// Protected routes (admin only)
router.post("/", validateBody(createCategorySchema), createCategory);
router.patch("/reorder", validateBody(reorderCategoriesSchema), reorderCategories);
router.patch('/:id', validateParams(categoryIdSchema), validateBody(updateCategorySchema), updateCategory);
router.delete('/:id', validateParams(categoryIdSchema), deleteCategory);

export default router;

