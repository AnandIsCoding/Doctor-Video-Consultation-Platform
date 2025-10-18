import jwt from "jsonwebtoken";
import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";
import { StatusCodes } from "http-status-codes";
import chalk from "chalk";
import { JWT_SECRET } from "../configs/server.config.js";

export const authenticate = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
        error: "User token missing",
      });
    }
    const decodedData = jwt.verify(userToken, JWT_SECRET);
    if (decodedData?.role === "doctor") {
      const doctor = await Doctor.findById(decoded.id);
      req.user = doctor;
    } else if (decodedData?.role === "patient") {
      const patient = await Patient.findById(decoded.id);
      req.user = patient;
    }
    if (!req.user) {
      console.log(
        chalk.bgRedBright("Error in assigning req.user in auth middleware"),
        error
      );
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: "Invalid User details in db" });
    }
    next();
  } catch (error) {
    console.log(chalk.bgRedBright("Error in auth middleware --> "), error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Something went wrong !!" });
  }
};
