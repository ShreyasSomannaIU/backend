const v2 = require("cloudinary").v2
const fs = require("fs")

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        // upload file on cloudinary
        const response = await v2.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // after uploading file on cloudinary we will remove that file from local storage
        console.log("File uploaded on cloudinary", response.secure_url)
        return response
    } catch(error){
        fs.unlinkSync(localFilePath) // remove file from local storage if some error occurs
        return null
    }
}
module.exports = { uploadOnCloudinary } 