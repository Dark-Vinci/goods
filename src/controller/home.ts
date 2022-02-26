import { Response, Request } from "express";

class HomeController {
    public static create () {
        return new HomeController();
    }
}

export default HomeController.create();