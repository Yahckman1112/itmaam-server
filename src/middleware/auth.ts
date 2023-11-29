import jwt from 'jsonwebtoken'


export default function (req:any, res:any, next:any){
    const token = req.header('x-auth-token')
    if(!token) return res.status(400).send('Access denied. no token')

    try {
        const decode = jwt.verify(token, '12345')
        req.user = decode
        next()
    } catch (error) {
        res.status(400).send('Invalid token')
    }
}