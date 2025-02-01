import mongoose from "mongoose";

const teamInMatchSchema = new mongoose.Schema({
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    playingEleven: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
    substitutes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Goal" }],
    fouls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foul" }],
    penalties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Penalty" }],
    substitutions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Substitution" }]
});

export const TeamInMatch = mongoose.model("TeamInMatch", teamInMatchSchema);
