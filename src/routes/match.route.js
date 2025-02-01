import Router from "express"
import { createMatch } from "../controllers/match.controller.js";
const matchRouter=Router();

matchRouter.route('/create').post(createMatch);
// matchRouter.route('/list').get(getTeamList);
// matchRouter.route('/').get(getTeam);

export default matchRouter;