import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
    Schema
} from "mongoose";

import AdminDocument from "../interface/admin";
import Admin from "../model/admin";

class AdminService {
    async createUser(input: DocumentDefinition<AdminDocument>) {
        const createdUser = await Admin.create(input);
        return createdUser;
    }

    public async comparePassword(pass: string) {
        
    }

    public async createHelper(email: string) {
        const isRegistered = await this.findByEmail(email);
        const all = await this.findAll();

        const toReturn = {
            isRegistered: isRegistered,
            isFirst: all.length == 0,
            isFilled: all.length >= 5,
        }

        return toReturn;
    }


    deleteUser(id: Schema.Types.ObjectId) {
        const user = Admin.findByIdAndRemove(id);

        if (!user) {
            return "user not in db";
        }

        return "user has been deleted";
    }

    getById(id: Schema.Types.ObjectId) {
        const user = Admin.findById(id);

        if (!user) {
            return { user:null, message: "user not found" };
        }

        const toReturn = { user, message: "user found" };

        return user;
    }

    findAndUpdate(
        query: FilterQuery<AdminDocument>,
        update: UpdateQuery<AdminDocument>,
        options: QueryOptions
    ) {
        return Admin.findOneAndUpdate(query, update, options);
    }

    findAll() {
        const admins = Admin.find()
            .sort({ level: 1 });

        return admins;
    }

    async empower(id: Schema.Types.ObjectId) {
        const admin = await Admin.findById(id);

        if (!admin) {
            return { admin: null, message: "admin not found" };
        }

        if (admin.level == 5) {
            return { admin, message: "an admin power cant be more than 5"}
        }

        admin.set({ level: admin.level + 1 });

        await admin.save();

        return { admin, message: "level updated" }
    }

    async demote(id: Schema.Types.ObjectId) {
        const admin = await Admin.findById(id);

        if (!admin) {
            return { admin: null, message: "admin not found" };
        }

        if (admin.level == 1) {
            return { admin, message: "an admin power cant be less than 1"}
        }

        admin.set({ level: admin.level - 1 });

        await admin.save();

        return { admin, message: "level updated" }
    }

    async findByEmail(email: string) {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return false;
        }

        return true;
    }
}

export default AdminService;