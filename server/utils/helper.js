import jwt from 'jsonwebtoken'
import { JWT_EXPERY, JWT_SECRET } from '../configs/server.config.js';


export const signToken = (id, email, type) =>{
    return jwt.sign({id, email, type}, JWT_SECRET, {expiresIn:JWT_EXPERY});
}