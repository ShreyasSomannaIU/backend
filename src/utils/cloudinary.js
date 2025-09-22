import { v2 } from "cloudinary"
import fs from "fs"

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        // upload file on cloudinary
        const response = await v2.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // after uploading file on cloudinary we will remove that file from local storage
        //console.log("File uploaded on cloudinary", response.url)
        fs.unlinkSync(localFilePath )
        return response
    } catch(error){
        fs.unlinkSync(localFilePath) // remove file from local storage if some error occurs
        return null
    }
}
export { uploadOnCloudinary }