import chalk from 'chalk'
import Doctor from '../models/doctor.model.js'
import { StatusCodes } from 'http-status-codes'


// list of doctors

export const getDoctors = async(req,res) =>{
    try {
        const {search, specialization, city, category, minFees, sortBy='createdAt', sortOrder='desc', page=1, limit=20} = req.query
        const filter = {isVerified:true}
        if(specialization){
            filter.specialization = {$regex : `^${specialization}$`, $options:`i`}
        }
        if(city) filter['hospitalInfo.city'] = {$regex : city, $options:`i`}
        if(category) filter.category = category
        if(minFees){
            filter.fees.$gte = Number(minFees) 
        }
        if(search){
            filter.$or  = [
                {name : {$regex: search, $options:'i'}},
                {specialization : {$regex: search, $options:'i'}},
                {'hospitalInfo.name' : {$regex: search, $options:'i'}}
            ]
        }
        // sort
        const sort = { [sortBy] : sortOrder === 'asc' ? 1 : -1}
        const skip = (Number(page) - 1) * Number(limit)
        const doctors = await Doctor.find(filter).select('-password -googleId').sort(sort).skip(Number(skip)).limit(Number(limit))
        const totalDoctorNumber = Doctor.countDocuments(filter);
        // response
        return res.status(StatusCodes.OK).json({success:true, message:'Doctors fetched successfully', doctors, totalDoctorNumber})
    } catch (error) {
      console.log(chalk.bgRedBright('Error in getDoctor controller ---->> '),error) 
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Something went wrong'})  
    }
}


// get doctor profile

export const getDoctorProfile = async(req,res) =>{
    try {
        const {role, _id} = req.user
        if(!role){
            console.log('Role not found in getDoctorProfile controller in doctor controller, role was -> ',role)
            return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'User role not found'})
        }
        if(role !== 'doctor'){
            console.error('user is not a doctor and user`s role is ->  ',role)
            return res.status(StatusCodes.UNAUTHORIZED).json({success:false, message:'Permission Denied'})
        }
        if(!_id){
            console.log('id not found in getDoctorProfile controller in doctor controller, id was -> ', _id)
            return res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'User id not found'})
        }
        //  query doctor from db
        const doctor = await Doctor.findById(_id).select('-password -googleId')
        if(!doctor){
            console.log(chalk.bgRedBright('Doctor not found in DB, doctor.controller.js , doctor is -> '),doctor)
            return  res.status(StatusCodes.BAD_REQUEST).json({success:false, message:'User not found'})
        }
        return res.status(StatusCodes.OK).json({success:true, message:'Profile fetched successfully'})
    } catch (error) {
        console.log(chalk.bgRed('Error in fetching doctor profile in getDoctorProfile controller --> '),error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Something went wrong'})
    }
}


//  update while onboarding

export const updateDoctorProfile = async(req,res) =>{
    try {
        const {_id, role} = req.user
        if(role !== 'doctor'){
            console.error('user is not a doctor and user`s role is ->  ',role)
            return res.status(StatusCodes.UNAUTHORIZED).json({success:false, message:'Permission Denied'})
        }
        const updated = {...req.body}
        updated.isVerified = true
        const doctor = await Doctor.findByIdAndUpdate(_id , updated , {new:true}).select("-password -googleId")
        if(!doctor){
            return res.status(StatusCodes.EXPECTATION_FAILED).json({success:false, message:'Something went wrong in profile updation ', newDoc})
        }
        return res.status(StatusCodes.OK).json({success:true, message:'Profile Updated Successfully', doctor})

    } catch (error) {
        console.log(chalk.bgRedBright('Error in update profile controller ---> '),error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:'Something went wrong'})
    }
}