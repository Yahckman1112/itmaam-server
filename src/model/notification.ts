import mongoose from "mongoose";
const Joi = require('joi-browser')



const notificationSchema = new mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    
  
  
}, {timestamps: true})

export const Notification = mongoose.model('Notification', notificationSchema)

export const validate = (payload:any)=>{
    const schema = Joi.object({
        title:Joi.string().required(),
        body:Joi.string().required()
    })

    return schema.validate(payload)
}