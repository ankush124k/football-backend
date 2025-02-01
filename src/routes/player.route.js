import Router from "express"
import { loginPlayer, registerPlayer } from "../controllers/player.controller.js";

const playerRoute=Router();

playerRoute.route('/login').get(loginPlayer);
playerRoute.route('/register').post(registerPlayer);

export default playerRoute;