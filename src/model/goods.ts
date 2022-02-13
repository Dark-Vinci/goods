import mongoose, { Schema } from "mongoose";

import GoodsDocument from "../interface/good";

const GoodSchema = new Schema<GoodsDocument>({
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength:60,
        trim: true,
        lowercase: true,
    },

    size: {
        width: {
            type: Number,
            min: 0,
            required: true,
            set: (v: number): number => {
                return Math.round(v);
            },
            get: (v: number): number => {
                return Math.round(v)
            }
        },

        height: {
            type: Number,
            min: 0,
            required: true,
            set: (v: number): number => {
                return Math.round(v);
            },
            get: (v: number): number => {
                return Math.round(v)
            }
        }
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    isDelivered: {
        type: Boolean,
        default: false,
        required: true,
    },

    froToLocation: {
        from: {
            type: String,
            required: true,
            minlength: 1,
        },

        to: {
            type: String,
            required: true,
            minlength: 1,
        }
    },

    shouldBeDeliveredBy: {
        type: Date,
    },

    deliveryDate: {
        collectedAt:{
            type: Date,
        },

        deliveredAt: {
            type: Date,
        }
    },

    fromToUser: {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        to: {
            type: mongoose.Schema.Types.ObjectId,
        },

        through: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }
    },

    estimatedDateOfDelivery: {
        type: Date,
    },

    imageURL: {
        type: String,
        required: true,
    }
}, { timestamps: true });

GoodSchema.virtual("dimension").get(function() {
    // @ts-ignore
    let good = this as GoodsDocument;
    // let user = this as GoodsDocument;
    const toReturn = `${ good.size.height } * ${ good.size.width }`;
    return toReturn;
});

const Good = mongoose.model<GoodsDocument>("Good", GoodSchema);


export default Good;