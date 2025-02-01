import { Substitution } from "../models/substitution.model.js";
import { TeamInMatch } from "../models/teamInMatch.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const substitutePlayer = asyncHandler(async (req, res) => {
    const { matchId, teamId, playerOutId, playerInId, time } = req.body;

    const team = await TeamInMatch.findOne({ match: matchId, team: teamId });

    if (!team || !team.playingEleven.includes(playerOutId) || !team.substitutes.includes(playerInId)) {
        return res.status(400).json({ message: "Invalid substitution" });
    }

    team.playingEleven = team.playingEleven.filter(p => p.toString() !== playerOutId);
    team.substitutes = team.substitutes.filter(p => p.toString() !== playerInId);

    team.playingEleven.push(playerInId);
    team.substitutes.push(playerOutId);

    await team.save();

    const substitution = await Substitution.create({ match: matchId, team: teamId, playerOut: playerOutId, playerIn: playerInId, time });

    res.status(201).json({ success: true, substitution });
});

export { substitutePlayer };
