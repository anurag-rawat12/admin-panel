import { Router } from "express";
import { Signin , Signup  } from "../controller/auth.controller.js";

const authRouter = Router();

// Middleware to parse incoming JSON requests
authRouter.post("/sign-up", Signup);
authRouter.post("/sign-in", Signin);

export default authRouter;