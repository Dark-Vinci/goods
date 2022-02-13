import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
    Schema
} from "mongoose";

import HomeDocument from "../interface/home";
import Home from "../model/home";

class HomeService {
    async createHome(input: DocumentDefinition<HomeDocument>) {
        const createdHome = await Home.create(input);
        return createdHome;
    }

    async deleteHome(id: Schema.Types.ObjectId) {
        const user = await Home.findByIdAndRemove(id);

        if (!user) {
            return "user not in db";
        }

        return "user has been deleted";
    }

    async getById(id: Schema.Types.ObjectId) {
        const user = await Home.findById(id);

        if (!user) {
            return { user:null, message: "user not found" };
        }

        const toReturn = { user, message: "user found" };

        return toReturn;
    }

    async findAndUpdate(
        query: FilterQuery<HomeDocument>,
        update: UpdateQuery<HomeDocument>,
        options: QueryOptions
    ) {
        const user = await Home.findOneAndUpdate(query, update, options);
        return user;
    }

    async publish(id: Schema.Types.ObjectId) {
        const home = await Home.findByIdAndUpdate(id, {
            $set: { isPublished: true }
        }, { new: true });

        if (!home) {
            return { home: null, message: "home not found" }
        }

        return { home, message: "home updated" }
    }

    async getAllPublished() {
        const homes = await Home.find().sort({ createdAt: 1 });
        return homes;
    }
}

export default HomeService;