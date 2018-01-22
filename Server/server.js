const express = require('express');
const bodyParser = require('body-parser');
const aws  = require('aws-sdk');
const s3 = new aws.S3();
const s3Bucket = 'oldnewdbbucket'

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.put(`${port}/s3/upload`, (req, res)=>{
    console.log(req.body)
    const params = {
        Bucket: s3Bucket,
        Key: ''
    }
})

app.listen(port, ()=>console.log('listening'));