// get patient profile

import chalk from "chalk"
import Patient from "../models/patient.model.js"
import { StatusCodes } from "http-status-codes"


//  get patient profile
export const getPatientProfile = async (req, res) => {
    try {
        const { role, _id } = req.user
        if (!role) {
            console.log('Role not found in getPatientProfile controller in patient controller, role was -> ', role)
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'User role not found' })
        }
        if (role !== 'patient') {
            console.error('user is not a patient and user`s role is ->  ', role)
            return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Permission Denied' })
        }
        if (!_id) {
            console.log('id not found in getPatientProfile controller in patient controller, _id was -> ', _id)
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'User id not found' })
        }
        //  query doctor from db
        const patient = await Patient.findById(_id).select('-password -googleId')
        if (!patient) {
            console.log(chalk.bgRedBright('Patient not found in DB, patient.controller.js , patient is -> '), patient)
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Patient not found' })
        }
        return res.status(StatusCodes.OK).json({ success: true, message: 'Profile fetched successfully' })
    } catch (error) {
        console.log(chalk.bgRed('Error in fetching patient profile in getPatientProfile controller --> '), error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Something went wrong' })
    }
}

// update patient profile

export const updatePatientProfile = async (req, res) => {
    try {
        const { _id, role } = req.user
        if (role !== 'patient') {
            console.error('user is not a patient and user`s role is ->  ', role)
            return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Permission Denied' })
        }
        const updated = { ...req.body }
        if (updated.dob) {
            updated.age = Math.floor(
                (Date.now() - updated.dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
            );
        }

        updated.isVerified = true
        const patient = await Patient.findByIdAndUpdate(_id, updated, { new: true }).select("-password -googleId")
        if (!patient) {
            return res.status(StatusCodes.EXPECTATION_FAILED).json({ success: false, message: 'Something went wrong in profile updation ', patient })
        }
        return res.status(StatusCodes.OK).json({ success: true, message: 'Profile Updated Successfully', patient })

    } catch (error) {
        console.log(chalk.bgRedBright('Error in update profile controller ---> '), error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Something went wrong' })
    }
}


