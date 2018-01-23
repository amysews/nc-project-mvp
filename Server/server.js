

require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const s3 = new aws.S3();
const s3Bucket = 'oldnewdbbucket';
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('promise-mysql');
const SQL = require('sql-template-strings');

const app = express();
const port = 3000;

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());



app.get('/', (req, res) => res.send('Hello world'));

app.put(`/s3/upload`, (req, res) => {
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

app.get('/s3/questions', (req, res) => {  
    const key = req.query.keyName;   /// keyname on the query
    const params = {
        Bucket: s3Bucket,
        Key: key + '.json'

    }
    let getObjectPromise = s3.getObject(params).promise();
    getObjectPromise.then((data) => {

        return data.Body.toString('utf8')
    })
        .then((newData) => {
            console.log(newData)
        })
        .catch((err) => {
            console.log(err)
        })
})








app.put('/RDS/upload', (req, res) => {
    const { first_name, surname, submitter, questioner, region, email, user_password, gender, dob, occupation } = req.body;
    console.log(req.body);

    mysql.createConnection({
        host: process.env.host,
        port: process.env.port,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    })
        .then(connection => {
            const qry = SQL`
            INSERT 
            INTO people (first_name, surname, submitter, questioner, region, email, user_password, gender, dob, occupation) 
            VALUES (${first_name}, ${surname}, ${submitter}, ${questioner}, ${region}, ${email}, ${user_password}, ${gender}, ${dob}, ${occupation})`;
            console.log(qry);
            const result = connection.query(qry)
            connection.end();
            return result;
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
})

app.get('/RDS/people', (req, res) => {
    mysql.createConnection({
        host: process.env.host,
        port: process.env.port,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    })
        .then(connection => {
            const people = connection.query("SELECT * FROM people")
            connection.end();
            return people;
        })
        .then(people => {
            console.log(people);
            res.json({ people });
        })
        .catch(err => console.log(err));
})

app.listen(port, () => console.log('listening ' + port));