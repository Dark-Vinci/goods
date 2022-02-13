import mongoose, { Schema } from "mongoose";

import UserDocument from "../interface/user";
import GoodsDocument from "../interface/good";
import hashPassword from "../helpers/hasher";
import comparePassword from "../helpers/comparePassword";


const UserSchema = new Schema<UserDocument>({
    fullname: {
        firstName: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 30,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 30,
            trim: true,
        }
    },

    age: {
        type: Number,
        required: true,
        validate: {
            validator: function (v: number): boolean {
                return v >= 18;
            },

            message: "user must be greater or equal to 18 years"
        }
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    postalCode: {
        type: Number,
        max: 999999,
        min: 0,
        validate: {
            validator: function (v: number): boolean {
                let vString = v.toString();

                if (vString.length !== 6) {
                    return false;
                }

                return true;
            },

            message: "not a valid postal code",
        }
    },

    address: {
        city: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },

        street: {
            type: String,
            required: true,
        }
    },

    sendRatings: {
        type: [ Number ]
    },

    deliveryRatings: {
        type: [ Number ]
    },

    collectionRatings: {
        type: [ Number ]
    },

    sentGoods: {
        type: [ mongoose.Schema.Types.ObjectId ],
    },

    deliveredGoods: {
        type: [ mongoose.Schema.Types.ObjectId ],
    },

    collectedGoods: {
        type: [ mongoose.Schema.Types.ObjectId ],
    },

    email: {
        type: String,
        unique: true,
        minlength: 4,
        required: true,
    },

    gender: {
        type: String,
        enum: [ "male", "female" ],
        required: true,
    },

    password: {
        type: String,
        maxlength: 1024,
        minlength: 20,
        required: true,
    },

    imageURL: {
        type: String,
    }
}, { timestamps: true });

UserSchema.virtual("fullname").get(function () {
    // @ts-ignore
    let user = this as UserDocument;

    let fullname = `${ user.fullname.firstName } ${ user.fullname.lastName }`;
    return fullname;
});

UserSchema.methods.getDeliveryRatings = function (): number {
    // @ts-ignore
    let user = this as UserDocument;
    let count = 0;

    let ratingSum = user.deliveryRatings.reduce((acc, rat) => {
        count++;
        return acc + rat;
    });

    return ratingSum / count;
}

UserSchema.methods.getCollectionRatings = function (): number {
    // @ts-ignore
    let user = this as UserDocument;
    let count = 0;

    let ratingSum = user.collectionRatings.reduce((acc, rat) => {
        count++;
        return acc + rat;
    });

    return ratingSum / count;
}

UserSchema.methods.getSendRatings = function (): number {
    // @ts-ignore
    let user = this as UserDocument;
    let count = 0;

    let ratingSum = user.sendRatings.reduce((acc, rat) => {
        count++;
        return acc + rat;
    });

    return ratingSum / count;
}

// UserSchema.methods.
UserSchema.pre("save", async function (next: any) {
    let user = this as UserDocument;

    if (user.isModified("password")) {
        user.password = await hashPassword(user.password);
    }

    next();
});

UserSchema.methods.comparePassword = async function (p: string): Promise<boolean> {
    let user = this as UserDocument;

    const isValid = await comparePassword(user.password, p);

    return isValid;
}

UserSchema.methods.getAddress = function (): string {
    let user = this as UserDocument;

    return `${ user.address.street }, ${ user.address.city }, ${ user.address.state }`
}

UserSchema.methods.allCollectedGoods = function(): GoodsDocument [] {
    let user = this as UserDocument;

    // @ts-ignore
    const toreturn = user.findById(user._id)
        .select({ collectedGoods: 1 })
        .populate({ path: "collectedGoods" })

    return toreturn;
}

UserSchema.methods.allDeliveredGoods = function(): GoodsDocument [] {
    let user = this as UserDocument;

    // @ts-ignore
    const toreturn = user.findById(user._id)
        .select({ deliveredGoods: 1 })
        .populate({ path: "deliveredGoods" });

    return toreturn;
}

UserSchema.methods.allSentGoods = function(): GoodsDocument [] {
    let user = this as UserDocument;

    // @ts-ignore
    const toreturn = user.findById(user._id)
        .select({ sentGoods: 1 })
        .populate({ path: "sentGoods" });

    return toreturn;
}

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;