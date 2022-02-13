import { Express, Router } from "express";

class HomeHandler {
    // public path: String = "/goods";
    private router: Router = Router();

    constructor(router: Express) {
        this.router = router;
    }

    private initializeRoutes () {
        this.router.get('/create', );
        this.router.post(`$`, );
        this.router.put('/update', );
        this.router.delete('/delte',);
    }
}

export default HomeHandler;