import mongoose, { Document } from "mongoose";

import GoodsDocument from "./good";

interface UserDocument extends Document {
    fullname: { firstName: string; lastName: string };
    age: number;
    gender: string;
    phoneNumber: string;
    password: string;
    email: string;
    address: { city: string; state: string; street: string };
    postalCode: number;
    imageURL: string;
    deliveryRatings: number[];
    sendRatings: number[];
    collectionRatings: number[];
    sentGoods: mongoose.Schema.Types.ObjectId[];
    deliveredGoods: mongoose.Schema.Types.ObjectId[];
    collectedGoods: mongoose.Schema.Types.ObjectId[];

    getSendRating(): number;
    getCollectionRatings(): number;
    getDeliveryRatings(): number;
    comparePassword(): Promise<boolean>;
    getAddress(): string;

    allSentGoods(): GoodsDocument [];
    allDeliveredGoods(): GoodsDocument [];
    allCollectedGoods(): GoodsDocument [];
}

export default UserDocument;
