import jwt from "jsonwebtoken";
import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";
import { StatusCodes } from "http-status-codes";
import chalk from "chalk";
import { JWT_SECRET } from "../configs/server.config.js";

export const authenticate = async (req, res, next) => {
  try {
    // ✅ First check if cookies exist and token is present
    if (!req.cookies || !req.cookies.token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);

    let user = null;

    if (decoded?.type === "doctor") {
      user = await Doctor.findById(decoded.id);
    } else if (decoded?.type === "patient") {
      user = await Patient.findById(decoded.id);
    }

    if (!user) {
      console.log(chalk.bgRedBright("Error in assigning req.user in auth middleware user is --> "), user);
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: "Invalid user details in DB" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(chalk.bgRedBright("❌ Error in auth middleware --> "), error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Something went wrong !!" });
  }
};
