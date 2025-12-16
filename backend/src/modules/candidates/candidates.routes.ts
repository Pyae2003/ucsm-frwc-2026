import { Router } from "express";
import candidatesController from "./candidates.controller.js";
import { validateBody, validateParams } from "../../middleware/validate.middleware.js";
import { candidatesIdSchema, CreateCandidatesValidatorSchema, UpdateCandidatesValidatorSchema } from "./candidates.schema.js";
// import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/" , candidatesController.GettingAllCandidates);

router.post("/create"  ,validateBody(CreateCandidatesValidatorSchema) ,candidatesController.addedCandidates);

router.patch("/update/:id" ,validateParams(candidatesIdSchema),validateBody(UpdateCandidatesValidatorSchema), candidatesController.updatedCandidates);

router.delete("/delete/:id" ,validateParams(candidatesIdSchema), candidatesController.deletedCandidates);

router.get("/singledata/:id" , candidatesController.onlyOneCandidates);


export default router