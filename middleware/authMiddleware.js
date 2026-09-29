const jwt=require("jsonwebtoken");
console.log("AUTH MIDDLEWARE LOADED");
const verifyToken=(req,res,next)=>{

    const authHeader=req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({
            message:"Authorization header required"
        });
    }

    console.log("AUTH HEADER:",authHeader);

    const token=authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        req.user=decoded;

        next();

    }catch(err){

        console.log("JWT ERROR:",err.message);

        res.status(401).send({
            message:"Invalid or expired token"
        });
    }
};

module.exports=verifyToken;