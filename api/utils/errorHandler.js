const errorHandler = (statuscode , message)=>{
    const err = new Error()
    err.statusCode = statuscode
    err.message = message
    return err
}

export default errorHandler