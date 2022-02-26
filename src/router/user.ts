import express, { Router } from "express";

const router: Router = express.Router();

class UserHandler {
    private router: Router = Router();

    constructor(router: Router) {
        this.router = router;

        this.router.get('/create', );
        this.router.post(`$`, );
        this.router.put('/update', );
        this.router.delete('/delte',);
    }

    public static create (r: Router) {
        return new UserHandler(r);
    }

    public routerReturner () {
        return this.router;
    }
}

export default UserHandler.create(router).routerReturner();