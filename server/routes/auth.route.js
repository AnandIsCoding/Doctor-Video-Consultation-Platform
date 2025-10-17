import Router from "express";
import { body } from "express-validator";
import validate from "../middleware/validator.js";
import {
  googleFailure,
  googleLogin,
  googleLoginCallback,
  loginDoctor,
  loginPatient,
  registerDoctor,
  registerPatient,
} from "../controllers/auth.controller.js";

const authRouter = Router();

// Define  authentication routes here

//  register doctor
authRouter.post(
  "/doctor/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isStrongPassword()
      .withMessage(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"
      ),
    body("name").notEmpty().withMessage("Name is required"),
  ],

  validate,
  registerDoctor
);

//  login doctor
authRouter.post(
  "/doctor/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isStrongPassword()
      .withMessage(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"
      ),
  ],
  loginDoctor
);

//  register patient

authRouter.post(
  "/patient/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isStrongPassword()
      .withMessage(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"
      ),
    body("name").notEmpty().withMessage("Name is required"),
  ],
  registerPatient
);

//  login patient
authRouter.post(
  "/patient/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isStrongPassword()
      .withMessage(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"
      ),
  ],
  loginPatient
);


// google
authRouter.get("/google", googleLogin);

authRouter.get('/google/callback', googleLoginCallback);
authRouter.get('/google/failure', googleFailure);



export default authRouter;
