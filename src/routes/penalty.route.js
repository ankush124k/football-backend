import Router from "express"
import { createPenalty } from "../controllers/penalty.controller.js";
const penaltyRouter=Router();

penaltyRouter.route('/create').post(createPenalty);
// penaltyRouter.route('/list').get(getTeamList);
// penaltyRouter.route('/').get(getTeam);

export default penaltyRouter;