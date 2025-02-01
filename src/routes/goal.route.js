import Router from "express"
import { addGoal } from "../controllers/goal.controller.js";
const goalRouter=Router();

goalRouter.route('/create').post(addGoal);
// goalRouter.route('/list').get(getTeamList);
// goalRouter.route('/').get(getTeam);

export default goalRouter;