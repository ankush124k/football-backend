import { asyncHandler } from "../utils/asyncHandler.js";
import { Team } from "../models/team.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTeam = asyncHandler(async (req, res, next) => {
    const { teamName, players } = req.body;

    if (!teamName || !players || !Array.isArray(players)) {
        throw new ApiError(400, "Team name and players array are required!!");
    }

    if (players.length < 1) {
        throw new ApiError(403, "Add at least one player to the team");
    }

    const existingTeam = await Team.findOne({ teamName });

    if (existingTeam) {
        throw new ApiError(401, "Team with this name already exists");
    }

    const team = await Team.create({
        teamName,
        players
    });

    // Populate player details
    const createdTeam = await Team.findById(team._id).populate("players");

    res.status(200).json(
        new ApiResponse(200, { createdTeam }, "Your team is created!!")
    );
});

export { createTeam };
