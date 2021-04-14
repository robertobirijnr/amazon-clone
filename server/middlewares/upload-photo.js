const aws = require('aws-sdk')
const multer = require('multer')
const multers3 = require('multer-s3')

// '6K8hIxBw6b9cPRag/8JXT6Bm37b/IuWtoTAzl1xN'
// 'AKIAZNQG7EZZD7A6Z53X'

aws.config.update({
    secretAccessKey:process.env.AWSSecretKey ,
    accessKeyId: process.env.AWSAccessKeyId
})


const s3 = new aws.S3();

const upload = multer({
    storage: multers3({
        s3: s3,
        bucket: 'bobalaska',
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, {
                fieldName: file.fieldname 
            })
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload