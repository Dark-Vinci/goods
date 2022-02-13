import mongoose, { Schema } from "mongoose";

import HomeDocument from "../interface/home";

const homeModel = new Schema<HomeDocument>({
    isPublished: {
        type: Boolean,
        default: false,
        required: true,
    },

    quote: {
        type: String,
        required: false,
        trim: true,
    },

    heading: {
        type: String,
        required: true,
        trim: true,
    },

    imageURL: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        required: true,
        trim: true,
    },

    content1: {
        type: String,
        required: true,
    },

    content2: {
        type: String,
        required: true,
    },

    others: {
        type: [ Object ]
    }
}, { timestamps: true });

const Home = mongoose.model<HomeDocument>("Home", homeModel);

export default Home;