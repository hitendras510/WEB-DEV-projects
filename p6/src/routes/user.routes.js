import { Router } from "express";
import { registerUser } from "../controllers/user.controllers";

const router = Router();

router.route("/register").post(
    XMLHttpRequestUpload.fields([
        {
            name: "avatar",
            maxCount: 1
        },{
            name: "coverImage",
            maxCount: 1
        }
    ]),
registerUser);

export default router;
