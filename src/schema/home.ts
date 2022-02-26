import { string, object } from "yup";

class HomeSchema {
    public static create () {
        return new HomeSchema();
    }

    public get homeCreator () {
        return object({
            body: object({
                quote: string()
                    .min(10, "invalid quote"),
        
                heading: string()
                    .required()
                    .min(10, "invalid heading"),
        
                body: string()
                    .required()
                    .min(10, "invalid heading"),
        
                content1: string()
                    .min(10, "invalid heading"),
        
                content2: string()
                    .min(10, "invalid heading"),
        
                others: object({
                    propA: string(),
                    propB: string(),
                    propC: string(),
                })
            })
        });
    }
}

export default HomeSchema.create();