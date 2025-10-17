import validator from "express-validator";
import {StatusCodes} from "http-status-codes";
const { body, validationResult } = validator;


export default function validate (req,res, next){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() , message: errors.array()[0].msg });
  }
  next()
}