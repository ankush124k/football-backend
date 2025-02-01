import { asyncHandler } from "../utils/asyncHandler.js";
import { Match } from "../models/match.model.js";
import { TeamInMatch } from "../models/teamInMatch.model.js";

const createMatch = asyncHandler(async (req, res) => {
    const { matchType, gameMode, team1Id, team2Id, startTime } = req.body;

    if (!matchType || !gameMode || !team1Id || !team2Id || !startTime) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const team1 = await TeamInMatch.create({ team: team1Id });
    const team2 = await TeamInMatch.create({ team: team2Id });

    const match = await Match.create({
        matchType,
        gameMode,
        team1: team1._id,
        team2: team2._id,
        startTime
    });

    res.status(201).json({ success: true, match });
});

export { createMatch };

