import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import Doctor from "../models/doctor.model.js";
import Patient from '../models/patient.model.js'
import chalk from "chalk";

import { signToken } from "../utils/helper.js";
import passport from "../configs/passport.js";


//  Doctor register controller ⭐⭐


export const registerDoctor = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields are required" });
    }
    //  check if doctor exist with provided email
    const doctorExist = await Doctor.findOne({ email });
    if (doctorExist) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Doctor already exists" });
    }
    // hash password before saving to db
    const hashedPassword = await bcrypt.hash(password, 10);
    // save doctor to db
    const newDoctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      isVerified:true
    });
    if (!newDoctor) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unable to create doctor" });
    }
    const token = signToken(newDoctor._id, newDoctor.email, "doctor");

    // assign token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // 🔹 allow cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Doctor registered successfully", token, doctor:newDoctor });
  } catch (error) {
    console.log(chalk.red("Error in registerDoctor controller", error));
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

//  Doctor login controller ⭐⭐

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "email and password are required" });
    }
    // check if doctor exist with provided email
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid credentials" });
    }
    const token = signToken(doctor._id, doctor.email, "doctor");

    // assign token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // 🔹 allow cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(StatusCodes.OK)
      .json({ message: "Doctor Login successful", token , doctor});
  } catch (error) {
    console.log(chalk.red("Error in loginDoctor controller", error));
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};



//  Register Patient controller ⭐⭐
export const registerPatient = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "All fields are required"})
        }
        //  check if patient exist with provided email
        const patientExist = await Patient.findOne({email})
        if(patientExist){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Patient already exists"})
        }
        // hash password before saving to db
        const hashedPassword = await bcrypt.hash(password, 10);
        // save patient to db
        const newPatient = await Patient.create({name, email, password: hashedPassword, isVerified:true})
        if(!newPatient){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Unable to create patient"})
        }
        const token = signToken(newPatient._id, newPatient.email, "patient")
        // assign token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none", // 🔹 allow cross-site cookies
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(StatusCodes.CREATED).json({message: "Patient registered successfully", token, patient:newPatient})
    } catch (error) {
        console.log(chalk.red("Error in registerPatient controller", error));
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong"})
    }
}


//  Login Patient controller ⭐⭐
export const loginPatient = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "email and password are required"})
        }
        // check if patient exist with provided email
        const patient = await Patient.findOne({email})
        if(!patient){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid credentials"})
        }
        // compare password
        const isMatch = await bcrypt.compare(password, patient.password)
        if(!isMatch){
            return res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid credentials"})
        }
        const token = signToken(patient._id, patient.email, "patient")
        // assign token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none", // 🔹 allow cross-site cookies
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(StatusCodes.OK).json({message: "Login successful", token, patient})
    } catch (error) {
        console.log(chalk.red("Error in loginPatient controller", error));
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong"})
    }
}



//  logout controller ⭐⭐
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,})
    return res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(chalk.red("Error in logout controller", error));
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
}



//  google login handler controllers

export const googleLogin = async (req, res, next) => {
  try {
    const userType = req.query.state || req.query.role || "patient"; // 'doctor' or 'patient'
    if (!userType || (userType !== "doctor" && userType !== "patient")) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid user type" });
    }
    passport.authenticate('google', { scope: ['profile', 'email'], state: userType, prompt:'Hey !! Select your account' })(req, res, next);
    
  } catch (error) {
    console.log(chalk.red("Error in googleLogin controller", error));
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
}

// callback handler

export const googleLoginCallback = async (req, res, next) => {
  try {
    passport.authenticate('google', { failureRedirect: '/auth/failure', session: false })
    async (req,res, next) => {
      try {
        const {user, role} = req.user
        if(!user || !role){
          return res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid user data from Google"})
        }
        const token = signToken(user._id, user.email, role)
        // assign token in cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none", // 🔹 allow cross-site cookies
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        // redirect to frontend with token
        const redirectUrl = `${process.env.FRONTEND_SUCCESS_URL}/auth/success?token=${token}&role=${role}&user={${encodeURIComponent(JSON.stringify({id:user?._id, name:user?.name, email:user?.email, profilePic:user?.profilePic}))}}`;
        return res.redirect(redirectUrl);
      } catch (error) {
        res.redirect(`${process.env.FRONTEND_SUCCESS_URL}/auth/error?message={${encodeURIComponent(error.message)}}`);
        console.log(chalk.red("Error in googleLoginCallback controller", error));
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Something went wrong" });
      }
    }
  } catch (error) {
    
  }
}


//  google failure handler
export const googleFailure = async (req, res) => {
  try {
    return res.status(StatusCodes.UNAUTHORIZED).json({message: "Google authentication failed"})
  } catch (error) {
    console.log(chalk.red("Error in googleFailure controller", error));
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
}

// profile

export const getProfile = async (req, res) => {
  try {
    const userId = req.user?._id; // ⬅️ Comes from auth middleware (JWT)
    if (!userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: 'Unauthorized: No user ID found' });
    }

    // 1️⃣ Check if the user exists as a patient
    let user = await Patient.findById(userId).select('-password -googleId');
    let role = 'patient';

    // 2️⃣ If not found as patient, check Doctor
    if (!user) {
      user = await Doctor.findById(userId).select('-password -googleId');
      role = 'doctor';
    }

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: 'User not found' });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Profile fetched successfully',
      role,
      user,
    });
  } catch (error) {
    console.log(chalk.bgRedBright('❌ Error in getProfile controller --->> '), error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Something went wrong' });
  }
};