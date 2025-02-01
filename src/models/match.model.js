import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    matchType: { type: String, enum: ["7v7", "8v8", "11v11"], required: true },
    gameMode: { type: String, enum: ["Friendly", "Tournament"], required: true },
    team1: { type: mongoose.Schema.Types.ObjectId, ref: "TeamInMatch", required: true },
    team2: { type: mongoose.Schema.Types.ObjectId, ref: "TeamInMatch", required: true },
    duration: { type: Number, default: 90 }, // Match duration in minutes
    breakTime: { type: Number, default: 15 }, // Break time in minutes
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    status: { type: String, enum: ["Scheduled", "Ongoing", "Completed"], default: "Scheduled" },
}, { timestamps: true });

export const Match = mongoose.model("Match", matchSchema);
