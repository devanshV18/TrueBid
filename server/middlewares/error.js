class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500

    if(err.name === "jsonwebTokenError"){
        const msg = "Invalid jsonwebtoken, Try Again"
        err = new Errorhandler(message, 400)
    }

    if(err.name === "TokenExpiredError"){
        const msg = "json web token Expired, Try again"
        err = new Errorhandler(message, 400)
    }

    if(err.name === "castError"){
        const msg = `Invalid ${err.path}`
        err = new Errorhandler(message, 400)
    }

    const errorMessage = err.errors ? Object.values(err.errors).map(error => error.message).join(" ") : err.message

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage
    })
}

export default ErrorHandler