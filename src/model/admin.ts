import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";

import AdminDocument from "../interface/admin";
import hashPassword from "../helpers/hasher";
import comparePassword from "../helpers/comparePassword";

const AdminSchema = new Schema<AdminDocument>({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 60,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        maxlength: 1024,
        minlength: 10,
    },

    level: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        default: 1,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 100,
    }
});

AdminSchema.pre("save", async function (next: any) {
    let admin = this as AdminDocument;

    if (admin.isModified("password")) {
        admin.password = await hashPassword(admin.password);
    }

    next();
});

AdminSchema.methods.comparePassword = async function (p: string): Promise<boolean> {
    let admin = this as AdminDocument;

    const isValid = await comparePassword(admin.password, p);

    return isValid;
}

AdminSchema.methods.generateAuthToken = function () {
    let admin = this as AdminDocument;

    const token = jwt.sign({ 
        isAdmin: true, 
        _id: admin._id ,
        level: admin.level,
    }, config.get('jwtPassword'));

    return token;
}

const Admin = mongoose.model<AdminDocument>("Admin", AdminSchema);

export default Admin;