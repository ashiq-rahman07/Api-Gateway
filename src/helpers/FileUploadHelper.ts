import multer from "multer";
import config from "../config";
import { v2 as cloudinary } from 'cloudinary';
import { ICloudinaryResponse, IUploadFile } from "../interfaces/file";
import * as fs from 'fs';




cloudinary.config({ 
    cloud_name: "drgn7g8o3", 
    api_key: "158795959676437", 
    api_secret: "_QNIXgnWhAPziMRZKoHODk3M9eU" // Click 'View Credentials' below to copy your API secret
});



const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage:storage});

const uploadToCloudinary =async(file:IUploadFile):Promise<ICloudinaryResponse | undefined>=>{
  
 return new Promise((resolve,reject)=>{
    cloudinary.uploader.upload(file.path,
    // {public_id: file.originalname},

    (error:Error, result:ICloudinaryResponse)=>{

        fs.unlinkSync(file.path);
        if(error){
            reject(error)
        }else{
            resolve(result)
        }
    })
 })
  
}



export const FileUploadHelper = {
    uploadToCloudinary,
    upload

}