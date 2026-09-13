// Why do we need routes?????
// The controller contains the work, but the route tells Express:
// "When this HTTP request arrives, which controller should handle it????

import {Router} from "express";
import {register,login} from "./auth.controller.js";


const router = Router();

router.post("/register", register);
router.post("/login", login);


export default router;