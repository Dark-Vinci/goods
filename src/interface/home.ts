import { Document } from "mongoose";

interface HomeDocument extends Document {
    createdAt: Date;
    updatedAt: Date;
    isPublished: boolean;
    heading: string;
    quote: string;
    imageURL: string;
    body: string;
    content1: string;
    content2: string;

    others: any [];
}

export default HomeDocument;