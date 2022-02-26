import jwt from "jsonwebtoken";
import config from "config";

class JWTHelper {
    private privateKey = config.get("jwtKey") as string;

    public sign(object: Object, options?: jwt.SignOptions | undefined) {
        return jwt.sign(object, this.privateKey, options);
    }

    public decode(token: string) {
        try {
            const decoded = jwt.verify(token, this.privateKey);
            
            return { valid: true, expired: false, decoded };
        } catch (error: any) {
            console.log({ error });
    
            return {
                valid: false,
                expired: error.message === "jwt expired",
                decoded: null,
            }
        }
    }

    public static create() {
        return new JWTHelper();
    }
}

export default JWTHelper.create();