import { Express, Router } from "express";

import validate from "../helpers/validator";
import AdminController from "../controller/admin";
import { adminSchema, login } from "../schema/admin";

class AdminHandler {
    public path: String = "/admin";
    private router: Router = Router();
    private adminController = new AdminController();

    constructor(router: Express) {
        this.router = router;
    }

    public initializeRoutes () {
        this.router.post('/register', validate(adminSchema), this.adminController.register);
        this.router.post("/login", validate(login), this.adminController.login);
        this.router.post(`$`, );
        this.router.put('/update', );
        this.router.delete('/delte',);
    }
}

export default AdminHandler;