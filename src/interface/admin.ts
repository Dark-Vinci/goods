import { Document } from "mongoose";

interface AdminInterface extends Document {
    name: string;
    password: string;
    email: string;
    level: number;

    comparePassword(): Promise<boolean>;
    generateAuthToken(): string;
}

export default AdminInterface;