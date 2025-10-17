import jwt from 'jsonwebtoken'
import Doctor from '../models/doctor.model.js'
import Patient from '../models/patient.model.js'
import {StatusCodes} from 'http-status-codes'
import chalk from 'chalk'
import { JWT_SECRET } from '../configs/server.config.js'

export const authenticate = async(req,res,next) =>{
    try {
        const header = req.headers.authorization;
        const token = header.startsWith('Bearer ') ? header.slice(7) : null;
        if(!token){
            return res.status(StatusCodes.UNAUTHORIZED).json({success:false, message:'Token missing'})
        }
        // decode
        const decoded = jwt.verify(token, JWT_SECRET)
        req.auth = decoded
        if(decoded?.role === 'doctor'){
            const doctor = await Doctor.findById(decoded.id)
            req.user = doctor
        }else if(decoded?.role === 'patient'){
            const patient = await Patient.findById(decoded.id)
            req.user = patient
        }
        if(!req.user){
            console.log(chalk.bgRedBright('Error in assigning req.user in auth middleware'), error)
            return res.status(StatusCodes.UNAUTHORIZED).json({success:false, message:'Invalid User details in db'})
        }
        next()
    } catch (error) {
        console.log(chalk.bgRedBright('Error in auth middleware --> '),error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Something went wrong !!'})
    }
}