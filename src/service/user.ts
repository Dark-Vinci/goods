import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
    Schema
} from "mongoose";

import UserDocument from "../interface/user";
import User from "../model/user";

class UserService {
    async createUser(input: DocumentDefinition<UserDocument>): Promise<UserDocument> {
        const createdUser = await User.create(input);
        return createdUser;
    }

    async deleteUser(id: Schema.Types.ObjectId) {
        const user = await User.findByIdAndRemove(id);

        if (!user) {
            return "user not in db";
        }

        return "user has been deleted";
    }

    async getById(id: Schema.Types.ObjectId): Promise<object> {
        const user = await User.findById(id);

        if (!user) {
            return { user: null, message: "user not found" };
        }

        const toReturn = { user, message: "user found" };

        return toReturn;
    }

    async findAndUpdate(
        query: FilterQuery<UserDocument>,
        update: UpdateQuery<UserDocument>,
        options: QueryOptions
    ) {
        const user = await User.findOneAndUpdate(query, update, options);
        return user;
    }
}

export default UserService;