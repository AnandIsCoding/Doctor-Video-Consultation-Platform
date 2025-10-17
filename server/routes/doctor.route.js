import Router from "express";
import { body, query } from "express-validator";
import validate from "../middleware/validator.js";
import {
  getDoctorProfile,
  getDoctors,
  updateDoctorProfile,
} from "../controllers/doctor.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const doctorRoute = Router();

doctorRoute.get(
  "/list",
  [
    query("search").optional().isString(),
    query("specialization").optional().isString(),
    query("city").optional().isString(),
    query("category").optional().isString(),
    query("minFees").optional().isInt({ min: 0, max: 0 }),
    query("sortBy")
      .optional()
      .isIn(["fees", "experience", "name", "createdAt"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
  ],
  validate,
  getDoctors
);

//  doctor profile
doctorRoute.get("/profile", authenticate, getDoctorProfile);

//  update profile while onboarding

doctorRoute.put(
  "/onboarding/update",
  authenticate,
  [
    body("name").optional().notEmpty(),
    body("profilePic").optional().notEmpty(),
    body("specialization").optional().notEmpty(),
    body("qualification").optional().notEmpty(),
    body("category").optional().notEmpty(),
    body("experience").optional().isInt({ min: 0 }),
    body("about").optional().isString(),
    body("fees").optional().isInt({ min: 0 }),
    body("hospitalInfo").optional().isObject(),
    body("slotDurationInMinutes").optional().isInt({ min: 5, max: 180 }),
    body("availabilityRange.startDate").optional().isISO8601(),
    body("availabilityRange.endDate").optional().isISO8601(),
    body("availabilityRange.excludedWeekdays").optional().isArray(),
    body('dailyTimeRange.start').optional().isString(),
    body('dailyTimeRange.end').optional().isString(),
    body("dailyTimeRange").optional().isArray({ min: 1, max: 100 })
  ],
  validate,
  updateDoctorProfile
);

export default doctorRoute;
