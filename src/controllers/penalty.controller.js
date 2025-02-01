import { asyncHandler } from "../utils/asyncHandler.js";
import { Penalty } from "../models/penalty.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Controller to create a penalty
const createPenalty = asyncHandler(async (req, res, next) => {
    const { matchId, teamId, playerId, penaltyType, time, description } = req.body;

    if (!matchId || !teamId || !playerId || !penaltyType || !time) {
        throw new ApiError(400, "Match ID, Team ID, Player ID, Penalty Type, and Time are required!");
    }

    // Create a new penalty
    const penalty = await Penalty.create({
        matchId,
        teamId,
        playerId,
        penaltyType,
        time,
        description
    });

    res.status(201).json(
        new ApiResponse(201, { penalty }, "Penalty successfully recorded!")
    );
});

// Controller to get penalties for a match
const getPenaltiesForMatch = asyncHandler(async (req, res, next) => {
    const { matchId } = req.params;

    if (!matchId) {
        throw new ApiError(400, "Match ID is required!");
    }

    // Fetch all penalties related to the match
    const penalties = await Penalty.find({ matchId }).populate("playerId", "name").populate("teamId", "teamName");

    if (!penalties || penalties.length === 0) {
        throw new ApiError(404, "No penalties found for this match!");
    }

    res.status(200).json(
        new ApiResponse(200, { penalties }, "Penalties for the match retrieved successfully!")
    );
});

export { createPenalty, getPenaltiesForMatch };
