import { object, string } from "yup";

class AdminSchema {
    public static create () {
        return new AdminSchema();
    }

    public get creation () {
        return object({
            body: object({
                name: string()
                    .required("name is required")
                    .min(2, "name length cant be less than 2")
                    .max(30, "name length cant be more than 30"),
        
                password: string()
                    .required("password is required")
                    .min(7, "length of password cant be less than 7")
                    .max(100, "password should not be more than 100 to aid remembrance"),
        
                email: string()
                    .email("not a valid email")
                    .required("email is required")
            })
        });
    }

    public get login () {
        return object({
            body: object({
                password: string()
                    .required("password is required")
                    .min(7, "length of password cant be less than 7")
                    .max(100, "password should not be more than 100 to aid remembrance"),
        
                email: string()
                    .email("not a valid email")
                    .required("email is required")
            })
        })
    }
}

export default AdminSchema.create();