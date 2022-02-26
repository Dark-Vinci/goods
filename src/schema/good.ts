import { object, string, number, date } from "yup";

class GoodSchema {
    public static create () {
        return new GoodSchema();
    }

    public get creation () {
        return object({
            body: object({
                content: string()
                    .required("goods content is required")
                    .max(100, "goods name length should not be more than 100"),
        
                size: object({
                    width: number()
                        .moreThan(0, "width must be more than 0")
                        .required("width is required"),
        
                    height: number()
                        .moreThan(0, "height must be more than 0")
                        .required("width is required")
                }),
        
                weight: number()
                    .moreThan(0, "height must be more than 0")
                    .required("weight is required"),
        
                froToLocation: object({
                    from: object({
                        busStop: string()
                            .required("starting busstop is required"),
        
                        street: string()
                            .required("starting busstop is required"),
        
                        city: string()
                            .required("starting busstop is required"),
        
                        state: string()
                            .required(),
        
                        latitude: number()
                            .required("starting busstop is required")
                            .min(0)
                            .max(90),
        
                        logitude: number()
                            .required("starting busstop is required")
                            .min(-180)
                            .max(180)
                    }),
        
                    to: object({
                        busStop: string()
                            .required("starting busstop is required"),
        
                        street: string()
                            .required("starting busstop is required"),
        
                        city: string()
                            .required("starting busstop is required"),
        
                        state: string()
                            .required("state is required"),
        
                        latitude: number()
                            .required("starting busstop is required")
                            .min(0, "invalid latitude input")
                            .max(90, "invalid latitude input"),
        
                        logitude: number()
                            .required("starting busstop is required")
                            .min(-180, "invalid longitude input")
                            .max(180, "invalid longitude input")
                    }),
                }),
        
                shouldBeDeliveredBy: date()
                    .required(),
        
                toUser: string()
                    .required("user object id is required")
            })
        });
    }
}

export default GoodSchema.create();