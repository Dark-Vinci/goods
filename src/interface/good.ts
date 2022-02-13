import mongoose, { Document } from "mongoose";

interface GoodsDocument extends Document {
    weigth: number;
    size: { width: number, height: number };
    createdBy: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    isDelivered: boolean;
    imageURL: string;
    shouldBeDeliveredBy: Date;
    estimatedDateOfDelivery: Date;
    froToLocation: { from: string, to: string };
    fromToUser: { from: mongoose.Schema.Types.ObjectId, to: mongoose.Schema.Types.ObjectId, through: mongoose.Schema.Types.ObjectId };
    deliveryDate: { collectedAt: Date; deliveredAt: Date; };
}

export default GoodsDocument;