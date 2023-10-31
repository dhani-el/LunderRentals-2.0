require('dotenv').config();
const multer = require('multer');
const crypto = require('crypto')
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner');
const {S3Client,GetObjectCommand, PutObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3') 

const upload = multer({Storage:multer.memoryStorage});
const randomName = (bytes=32)=> crypto.randomBytes(bytes).toString('hex');

const BUCKET_NAME =  process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.S3_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY

const s3Client  =  new S3Client({
    credentials:{
        accessKeyId:ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
    region:BUCKET_REGION
})

async function toS3(imageName, buffer, mimetype){
    const params = {
        Bucket: BUCKET_NAME,
        Key: imageName,
        Body:buffer,
        ContentType:mimetype
    }
    const command = new PutObjectCommand(params) ;
    await s3Client.send(command);
}

async function fromS3(imageName){
    const params = {
        Bucket:BUCKET_NAME,
        Key:imageName
    }
    const command = new GetObjectCommand(params);
    const URL = await getSignedUrl(s3Client, command, {expiresIn:3600});
    return URL
}

async function deleteFromS3(imageName){
    const params = {
        Bucket:BUCKET_NAME,
        Key:imageName,
    }
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command)
}

module.exports = {upload,randomName,toS3,fromS3,deleteFromS3}