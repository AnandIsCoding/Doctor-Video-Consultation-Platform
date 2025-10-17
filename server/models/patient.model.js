import mongoose from "mongoose";

const emergencyContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    relation: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const medicalHistorySchema = new mongoose.Schema(
  {
    allergy: { type: String, required: true, default: "None" },
    condition: { type: String, required: true },
    diagnosisDate: { type: Date },
    notes: { type: String },
    currentMedications: { type: String, default: "None" },
    chronicDiseases: { type: String, default: "None" },
    surgeries: { type: String, default: "None" },
  },
  { _id: false }
);

const patientSchema = new mongoose.Schema(
  {
    role:{ type: String, enum: ["patient"], default: "patient" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    profilePic: {
      type: String,
      default:
        "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
    },
    phone: { type: String },
    dob: { type: Date },
    age: { type: Number },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    emergencyContact: emergencyContactSchema,
    medicalHistory: medicalHistorySchema,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

patientSchema.pre("save", function (next) {
  if (this.dob && this.isModified("dob")) {
    this.age = Math.floor(
      (Date.now() - this.dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    );
  }
  next();
});

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;
