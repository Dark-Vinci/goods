import { Request, Response, NextFunction } from "express";
import { omit } from "lodash";

import Admin from "../model/admin";
import AdminService from "../service/admin";
import response from "../helpers/response";

class AdminController {
    private adminService = new AdminService();

    public async register(req: Request, res: Response, next: NextFunction) {
        const { email, password, name } = req.body;

        const { isRegistered, isFirst, isFilled } = await this.adminService.createHelper(email);

        if (isRegistered) {
            const resp = response(409, "error", null, { message: "theres is a user with same email" });
            return res.status(409).json(resp);
        }

        if (isFilled) {
            const resp = response(400, "error", null, { message: "there cant be more than 5 admins" });
            return res.status(409).json(resp);
        }

        const userCreateInput = { email, password, name, level: 1 };
        
        if (isFirst) {
            userCreateInput.level = 5
        }

        const user = await this.adminService.createUser(userCreateInput);

        const userData = omit(user, "password");
        const resp = response(201, "OK!", userData, null);
        const authToken = user.generateAuthToken();

        res.header("x-auth-token", authToken).status(200).json(resp);
    }

    async empower(req: Request, res: Response, next: NextFunction) {

    }

    async delete(req: Request, res: Response, next: NextFunction) {

    }

    async login (req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        const isRegistered = await this.adminService.findByEmail(email);

        if (!isRegistered) {
            const resp = response(404, "error", null, { error: "invalid email or password" });
            return res.status(404).json(resp);
        }

        
    }
}

export default AdminController;