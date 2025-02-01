import mongoose from "mongoose";
const penaltySchema = new mongoose.Schema({
    match: { type: mongoose.Schema.Types.ObjectId, ref: "Match", required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    player: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
    time: { type: Number, required: true },
    result: { type: String, enum: ["Scored", "Missed", "Saved"], required: true },
    penaltyType: { type: String, enum: ['Yellow Card', 'Red Card', 'Foul'], required: true },
    description: { type: String, required: false } // Optional field for extra details
});

export const Penalty = mongoose.model("Penalty", penaltySchema);

