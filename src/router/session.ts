import { Express, Router } from "express";

class SessionHandler {
    // public path: String = "/home";
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

export default SessionHandler;