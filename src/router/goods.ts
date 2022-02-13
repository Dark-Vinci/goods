import { Express, Router } from "express";

class GoodHandler {
    public path: String = "/goods";
    private router = Router();

    constructor(router: Express) {
        this.router = router;
    }

    private initializeRoutes () {
        this.router.get('/create', );
        this.router.post(`$`)
        this.router.delete('/delte',)
    }
}

export default GoodHandler;