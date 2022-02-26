import express, { Router } from "express";

const router: Router = express.Router();

class HomeHandler {
    private router: Router = Router();

    constructor(router: Router) {
        this.router = router;


        this.router.get('/create', );
        this.router.post(`$`, );
        this.router.put('/update', );
        this.router.delete('/delte',);
    }

    public static create(r: Router) {
        return new HomeHandler(r);
    }

    public routerReturner () {
        return this.router;
    }
}

export default HomeHandler.create(router).routerReturner();