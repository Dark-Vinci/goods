import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
    Schema
} from "mongoose";

import GoodDocument from "../interface/home";
import Goods from "../model/home";

class GoodsService {
    async createUser(input: DocumentDefinition<GoodDocument>) {
        const createdUser = await Goods.create(input);
        return createdUser;
    }

    async deleteUser(id: Schema.Types.ObjectId) {
        const user = await Goods.findByIdAndRemove(id);

        if (!user) {
            return "user not in db";
        }

        return "user has been deleted";
    }

    async getById(id: Schema.Types.ObjectId) {
        const user = await Goods.findById(id);

        if (!user) {
            return { user:null, message: "user not found" };
        }

        const toReturn = { user, message: "user found" };

        return toReturn;
    }

    async findAndUpdate(
        query: FilterQuery<GoodDocument>,
        update: UpdateQuery<GoodDocument>,
        options: QueryOptions
    ) {
        const user = await Goods.findOneAndUpdate(query, update, options);
        return user;
    }

    async publish(id: Schema.Types.ObjectId) {
        const home = await Goods.findByIdAndUpdate(id, {
            $set: { isPublished: true }
        }, { new: true });

        if (!home) {
            return { home: null, message: "home not found" }
        }

        return { home, message: "home updated" }
    }
}

export default GoodsService;