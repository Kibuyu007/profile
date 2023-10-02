import jwt from "jsonwebtoken";


export const verifyJwt = async(req, res, next) => {

    const token =req.cookies.accessToken;

    if(!token){

        return res.status(401).json({message: "you are not authorized.."})
    }


    jwt.verify(token, process.env.MYCODE, (err, decode) => {

        if(err){
            return res.status(401).json({message: "invalid token..."})
        }

        req.user = decode

        next()
    })
}