import express, { Router } from "express";

const router: Router = express.Router()

class SessionHandler {
    private router: Router = Router();
    
    constructor(router: Router) {
        this.router = router;
        console.log(this.router);

        this.router.get("/create", );
        this.router.post(`$`, );
        this.router.put('/update', );
        this.router.delete('/delte',);
    }

    public static create (r: Router) {
        return new SessionHandler(r);
    }

    public routerReturner () {
        return this.router;
    }
}

export default SessionHandler.create(router).routerReturner();