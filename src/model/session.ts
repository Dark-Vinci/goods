import mongoose, { Schema } from "mongoose";

import SessionDocument from "../interface/session";

const SessionSchema = new Schema<SessionDocument>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    valid: {
        type: Boolean,
        required: true,
        default: true
    },

    userAgent: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Session = mongoose.model<SessionDocument>("Session", SessionSchema);

export default Session;