import mongoose from "mongoose";
const goalSchema = new mongoose.Schema({
    match: { type: mongoose.Schema.Types.ObjectId, ref: "Match", required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    player: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
    time: { type: Number, required: true }, // Minute of the match
    type: { type: String, enum: ["Normal", "Penalty", "Own Goal"], required: true }
});

export const Goal = mongoose.model("Goal", goalSchema);
