import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";
import chalk from "chalk";
import { GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./server.config.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Determine user type from state query
        const userType = req?.query?.state || "patient"; // 'doctor' or 'patient'
        if (!userType || (userType !== "doctor" && userType !== "patient")) {
          return done(new Error("Invalid user type"), null);
        }

        // Extract data from profile
        const email = profile?.emails?.[0]?.value || null;
        const name = profile?.displayName || "No Name";
        const photo = profile?.photos?.[0]?.value || null;

        if (!email) {
          return done(new Error("No email found in Google profile"), null);
        }

        if (userType === "doctor") {
          let doctor = await Doctor.findOne({ email });

          if (!doctor) {
            // Create new doctor
            doctor = new Doctor({
              googleId: profile.id,
              name,
              email,
              profilePic: photo,
              password: null, // no password as it's Google login
              isVerified: true,
            });
            await doctor.save();
          } else if (!doctor.googleId) {
            doctor.googleId = profile.id;
            await doctor.save();
          }

          return done(null, { doctor, role: "doctor" });

        } else if (userType === "patient") {
          let patient = await User.findOne({ email });

          if (!patient) {
            // Create new patient
            patient = new Patient({
              googleId: profile.id,
              name,
              email,
              avatar: photo,
              password: null, // no password as it's Google login
            });
            await patient.save();
          } else if (!patient.googleId) {
            patient.googleId = profile.id;
            await patient.save();
          }

          return done(null, { patient, role: "patient" });
        }

      } catch (error) {
        console.error(chalk.bgRedBright("Error in GoogleStrategy:"), error);
        return done(error, null);
      }
    }
  )
);

// Required for session support
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
