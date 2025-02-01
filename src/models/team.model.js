import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        teamName: { type: String, required: true, unique: true },
        teamId: { type: String, unique: true },
        playerCount: { type: Number, required: false },
        coachName: { type: String, required: false }, // Changed from Number to String
        goalScored: { type: Number, required: false },
        goalConceed: { type: Number, required: false },
        numberOfWins: { type: Number, required: false },
        numberOfloss: { type: Number, required: false },
        numberOfMatchPlayed: { type: Number, required: false },
        captainName: { type: String, required: false },
        players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }], // Fixed to array
        matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }] // Also should be an array
    },
    { timestamps: true }
);

// Middleware to generate a unique team ID before saving
teamSchema.pre("save", async function (next) {
    if (!this.teamId) {
        let isUnique = false;
        let newTeamId;

        while (!isUnique) {
            newTeamId = `AK${Math.random().toString(36).substring(2, 6).toUpperCase()}`; // Generates AK + 4 random alphanumeric characters
            const existingTeam = await mongoose.models.Team.findOne({ teamId: newTeamId });
            if (!existingTeam) {
                isUnique = true;
            }
        }

        this.teamId = newTeamId;
    }
    next();
});

export const Team = mongoose.model("Team", teamSchema);
