import { Foul } from "../models/foul.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const recordFoul = asyncHandler(async (req, res) => {
    const { matchId, teamId, playerId, time, type, description } = req.body;

    const foul = await Foul.create({ match: matchId, team: teamId, player: playerId, time, type, description });

    res.status(201).json({ success: true, foul });
});

export { recordFoul };
