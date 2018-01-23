require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const aws  = require('aws-sdk');
const s3 = new aws.S3();
const s3Bucket = 'oldnewdbbucket';
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello world'));

app.put(`/s3/upload`, (req, res)=>{
    const { question, fileName } = req.body;
    const params = {
        Bucket: s3Bucket,
        Key: fileName + '.json',
        Body: question
    }

    s3.putObject(params, (err, data) => {
        if (err) console.log(err)
        else console.log(data, 'success')
      })
})

app.listen(port, () => console.log('listening ' + port));