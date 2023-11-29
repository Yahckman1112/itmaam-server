

export default function(err:any, req:any,res:any,next:any){
res.status(500).send('internal server error')
}