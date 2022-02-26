import { Request, Response, NextFunction } from "express";
import { omit } from "lodash";

// import Admin from "../model/admin";
import AdminService from "../service/admin";
import resp from "../helpers/response";

class AdminController {
    private adminService = new AdminService();

    static create (): AdminController {
        return new AdminController();
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        const { email, password, name } = req.body;

        const { isRegistered, isFirst, isFilled } = await this.adminService.createHelper(email);

        if (isRegistered) {
            const response = resp.errorResponse(409, "error", { message: "theres is a user with same email" });

            return res.status(409).json(response);
        }

        if (isFilled) {
            const response = resp.errorResponse(400, "error", { message: "there cant be more than 5 admins" });

            return res.status(409).json(response);
        }

        const userCreateInput = { email, password, name, level: 1 };
        
        if (isFirst) {
            userCreateInput.level = 5
        }

        const user = await this.adminService.createUser(userCreateInput);

        const userData = omit(user, "password");
        const response = resp.okResponse(201, "OK!", userData);
        const authToken = user.generateAuthToken();

        res.header("x-auth-token", authToken).status(200).json(response);
    }

    public async empower(req: Request, res: Response, next: NextFunction) {

    }

    public async delete(req: Request, res: Response, next: NextFunction) {

    }

    public async login (req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        const isRegistered = await this.adminService.findByEmail(email);

        if (!isRegistered) {
            const response = resp.errorResponse(404, "error", { error: "invalid email or password" });
            return res.status(404).json(response);
        }
    }
}

export default AdminController.create();