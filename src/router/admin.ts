import express, { Router } from "express";

// import validate from "../helpers/validator";
// import AdminController from "../controller/admin";
// import { adminSchema, login } from "../schema/admin";


const router: Router = express.Router()

class AdminHandler {
    private router: Router;

    constructor(router: Router) {
        this.router = router;


        this.router.post('/register', );
        this.router.post("/login");
        this.router.post(`$`, );
        this.router.put('/update', );
        this.router.delete('/delte',);
    }

    public static create (r: Router) {
        return new AdminHandler(r);
    }

    public routerReturner () {
        return this.router;
    }
}

export default AdminHandler.create(router).routerReturner();