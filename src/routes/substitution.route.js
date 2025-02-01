import Router from "express"
import { substitutePlayer } from "../controllers/substitution.controller.js";
const SubstitutionRouter=Router();

SubstitutionRouter.route('/create').post(substitutePlayer);
// SubstitutionRouter.route('/list').get(getTeamList);
// SubstitutionRouter.route('/').get(getTeam);

export default SubstitutionRouter;