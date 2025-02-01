import mongoose from "mongoose";    

const foulSchema = new mongoose.Schema({
    match: { type: mongoose.Schema.Types.ObjectId, ref: "Match", required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    player: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
    time: { type: Number, required: true },
    type: { type: String, enum: ["Handball", "Offside", "Foul", "Yellow Card", "Red Card"], required: true },
    description: { type: String }
});

export const Foul = mongoose.model("Foul", foulSchema);
