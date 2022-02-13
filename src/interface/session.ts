import { Document } from "mongoose";

import UserDocument from "./user";

interface SessionDocument extends Document {
    user: UserDocument["_id"];
    valid: boolean;
    userAgent: string;
    createdAt: string;
    updatedAt: string;
}


export default SessionDocument;