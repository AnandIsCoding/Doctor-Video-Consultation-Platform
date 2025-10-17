import mongoose from "mongoose";
import { specializations, healthcareCategoriesList } from "../utils/constants.js";

const dailyTimeRangeSchema = new mongoose.Schema({
  start: { type: String, required: true }, // "09:00",
  end: { type: String, required: true },   // "17:00"
}, { _id: false });

const availabilitySchema = new mongoose.Schema({
  startDate: { type: String, required: true }, // "2023-10-01"
  endDate: { type: String, required: true },   // "2023-10-31"
  excludedWeekdays: { type: Number, default: [] } // [0,6] for Sunday to Saturday
}, {
  _id: false
})

const doctorSchema = new mongoose.Schema({
  role: { type: String, enum: ["doctor"], default: "doctor" },
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
  specialization: {
    type: String,
    enum: specializations
  },
  category: {
    type: String,
    enum: healthcareCategoriesList
  },
  qualification: { type: String },
  experience: { type: Number, min: 0 },
  about: { type: String },
  fees: { type: Number, min: 100 },
  hospitalInfo: {
    name: { type: String },
    address: { type: String },
    city: { type: String },
  },
  availabilityRange: availabilitySchema,
  dailyTimeRange: dailyTimeRangeSchema,
  slotDurationInMinutes: { type: Number, default: 5 },
  isVerified: { type: Boolean, default: false },
}, {
  timestamps: true
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
