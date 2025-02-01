import mongoose from "mongoose";

const substitutionSchema = new mongoose.Schema({
    match: { type: mongoose.Schema.Types.ObjectId, ref: "Match", required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    playerOut: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
    playerIn: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
    time: { type: Number, required: true }
});

export const Substitution = mongoose.model("Substitution", substitutionSchema);
