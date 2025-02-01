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

const getTeamList = asyncHandler(async (req, res, next) => {
    const teams = await Team.find().populate("players");

    if (!teams || teams.length === 0) {
        throw new ApiError(404, "No teams found!");
    }

    res.status(200).json(new ApiResponse(200, { teams }, "Teams retrieved successfully!"));
});



const getTeam = asyncHandler(async (req, res) => {
    const { id, teamName } = req.query;  // Accepting ID or teamName as query parameters

    if (!id && !teamName) {
        throw new ApiError(400, "Please provide either a team ID or team name!");
    }

    // Finding team based on ID or teamName
    const team = await Team.findOne({
        $or: [{ _id: id }, { teamName: teamName }],
    }).populate("players");

    if (!team) {
        throw new ApiError(404, "Team not found!");
    }

    res.status(200).json(new ApiResponse(200, { team }, "Team details retrieved successfully!"));
});

export { createTeam ,getTeamList,getTeam};
