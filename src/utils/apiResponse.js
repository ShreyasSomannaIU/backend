class apiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400  
    }
}
export {apiResponse}

// This class can be used to create consistent API success responses