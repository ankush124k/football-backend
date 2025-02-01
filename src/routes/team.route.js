import Router from "express"
import { createTeam, getTeam, getTeamList } from "../controllers/team.controller.js";
const teamRouter=Router();

teamRouter.route('/create').post(createTeam);
teamRouter.route('/list').get(getTeamList);
teamRouter.route('/').get(getTeam);

export default teamRouter;