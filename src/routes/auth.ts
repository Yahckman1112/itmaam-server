import express from 'express'
import { User } from '../model/user';
import  bcrypt  from 'bcrypt';
const Joi  = require('joi-browser');
const router = express.Router()






router.post('/', async(req:any,res:any, next:any)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    try {
        let user = await User.findOne({email:req.body.email})
        if (!user) return res.status(400).send('Invalid email or Pwd')

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).send('Invalid email or pwd')
        // @ts-ignore
        const token = user.generateAuthToken()
        res.send(token)
    } catch (err) {
        res.status(500).send(err)
    }
})


const validate=(user:any)=>{
    const schema= Joi.object({
        email:Joi.string().required().email(),
        password: Joi.string().required()
    })

    return schema.validate(user)
}




export default router