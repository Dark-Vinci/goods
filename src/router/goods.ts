import express, { Router } from "express";

const router: Router = express.Router();

class GoodHandler {
    private router = Router();

    constructor(router: Router) {
        this.router = router;


        this.router.get('/create', );
        this.router.post(`$`)
        this.router.delete('/delte',)
    }

    public static create(r: Router) {
        return new GoodHandler(r);
    }

    public routerReturner () {
        return this.router;
    }
}

export default GoodHandler.create(router).routerReturner();