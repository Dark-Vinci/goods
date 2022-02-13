import config from "config";
import { get } from "lodash";
import { LeanDocument, UpdateQuery, FilterQuery } from "mongoose";

import User from "../model/user";
import { sign, decode } from "../helpers/jwt";
import UserDocument from "../interface/user";
import Session from "../model/session";
import SessionDocument from "../interface/session";

class SessionService {
    async createSession(userId: string, userAgent: string) {
        const session = await Session.create({ user: userId, userAgent });
    
        return session.toJSON();
    }

    createAccessToken({ user, session }: {
        user: 
            | Omit<UserDocument, "password">
            | LeanDocument<Omit<UserDocument, "password">>
            | any;
        session:
            | Omit<SessionDocument, "password">
            | LeanDocument<Omit<SessionDocument, "password">>;
    }) {
        const accessToken = sign(
            { ...user, session: session._id },
            { expiresIn: config.get("accessTokenTlt")}
        );
    
        return accessToken;
    }

    async reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
        const { decoded } = decode(refreshToken);
    
        if (!decoded || !get(decoded, "_id")) {
            return false;
        }
    
        const session = await Session.findById(get(decoded, "_id"));
    
        if (!session || !session?.valid) {
            return false;
        }
    //! should be tidied
        const user = await User.findById(session.user);
    
        if (!user) {
            return false;
        }
    
        const accessToken = this.createAccessToken({ user, session });
    
        return accessToken;
    }

    async updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
        return await Session.updateOne(query, update);
    }

    async findSessions(query: FilterQuery<SessionDocument>) {
        return await Session.find(query).lean();
    }
}

export default SessionService;