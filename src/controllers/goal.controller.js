import { Goal } from "../models/goal.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addGoal = asyncHandler(async (req, res) => {
    const { matchId, teamId, playerId, time, type } = req.body;

    const goal = await Goal.create({ match: matchId, team: teamId, player: playerId, time, type });

    res.status(201).json({ success: true, goal });
});

export { addGoal };
