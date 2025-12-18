import {Router} from "express";
import { validateQuery } from "../../middleware/validate.middleware.js";
import { votingCategoriesQuerySchema, votingSchema } from "./voting.schema.js";
import VotingController from "./voting.controller.js";

const router = Router();

router.get("/",validateQuery(votingSchema),VotingController.voting);

router.get("/alldata",VotingController.getVotes);

router.get("/statistics",validateQuery(votingCategoriesQuerySchema),VotingController.votesStatistics);

export default router;
