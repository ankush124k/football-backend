import Router from "express"
import { recordFoul } from "../controllers/foul.controller.js";
const foulRouter=Router();

foulRouter.route('/create').post(recordFoul);
// foulRouter.route('/list').get(getTeamList);
// foulRouter.route('/').get(getTeam);

export default foulRouter;