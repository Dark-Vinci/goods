import { Express, Router } from "express";

class UserHandler {
    private router: Router = Router();

    constructor(router: Express) {
        this.router = router;
    }

    public initializeRoutes () {
        this.router.get('/create', );
        this.router.post(`$`, );
        this.router.put('/update', );
        this.router.delete('/delte',);
    }
}

export default UserHandler;