import { 
    object, string, 
    number, boolean, 
    ref 
} from "yup";

class UserSchema {
    public static create () {
        return new UserSchema();
    }

    public get creator () {
        return object({
            body: object ({
                firstName: string()
                    .required("firstname is required")
                    .min(2, "length of first name cant be less than 2")
                    .max(30, "first name should not be more than 30"),
        
                lastName: string()
                    .required("lastname is required")
                    .min(2, "length of last name cant be less than 2")
                    .max(30, "last name should not be more than 30"),
        
                age: number()
                    .lessThan(100, "age should be less than 100")
                    .moreThan(17, "age should be greater than 17"),
        
                postalCode: number()
                    .lessThan(999999, "not a valid postal code")
                    .required(),
        
                address: object({
                    city: string()
                        .max(100, "city name shouldnt be more than 100")
                        .required(),
        
                    state: string()
                        .max(100, "city name shouldnt be more than 100")
                        .required(),
        
                    street: string()
                        .max(100, "city name shouldnt be more than 100")
                        .required(),
                }),
        
                email: string()
                    .required("email is required")
                    .email(),
        
                isMale: boolean()
                    .required(),
        
                password: string()
                    .required("password is required")
                    .min(7, "password should be more than 6 in length")
                    .matches(/^[a-zA-Z0-9_.-]*$/, "password can only contain latin letters")
                    .max(100, "password shouldnt be more than 100 to aid remembrance"),
        
                passwordConfirmation: string().oneOf(
                        [ref("password"), null],
                        "password must match"
                    ),
            })
        });
    }
}

export default UserSchema.create();