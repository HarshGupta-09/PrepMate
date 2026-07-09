
const asyncHandler = (reqHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(reqHandler(req,res,next)).catch((error)=>{
            next(error);// will skip the normal middlewares and directly will call the global error middleware
        })
    }

}
export default asyncHandler;