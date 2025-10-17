import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { getPatientProfile, updatePatientProfile } from "../controllers/patient.controller.js";
import validate from "../middleware/validator.js";
import { body } from "express-validator";

const patientRouter = Router();


// patient profile

patientRouter.get("/profile", authenticate, getPatientProfile);

//  patient onboarding updation 

patientRouter.put(
  "/onboarding/update",
  authenticate,
  [
    body("name").optional().notEmpty(),
    body("phone").optional().notEmpty(),
    body("dob").optional().isISO8601(),
    body("profilePic").optional().isString(),
    body("gender").optional().isIn(["male", "female", "others"]),
    body("bloodGroup").optional().isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    body("emergencyContact").optional().isObject(),
    body("emergencyContact.name").optional().isString().notEmpty(),
    body("emergencyContact.relation").optional().isString().notEmpty(),
    body("emergencyContact.phone").optional().isString().notEmpty(),
    body("medicalHistory").optional().isObject(),
    body("medicalHistory.allergy").optional().isString().notEmpty(),
    body("medicalHistory.condition").optional().isString().notEmpty(),
    body("medicalHistory.diagnosisDate").optional().isISO8601().notEmpty(),
    body("medicalHistory.notes").optional().isString().notEmpty(),
    body("medicalHistory.currentMedications").optional().isString().notEmpty(),
    body("medicalHistory.chronicDiseases").optional().isString().notEmpty(),
    body("medicalHistory.surgeries").optional().isString().notEmpty(),

  ],
  validate,
  updatePatientProfile
);


export default patientRouter;