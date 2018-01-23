const express = require('express');
const rdsRouter = express.Router();

const aws = require('aws-sdk');
const s3 = new aws.S3();
const s3Bucket = 'oldnewdbbucket';
const mysql = require('promise-mysql');
const SQL = require('sql-template-strings');

rdsRouter.put('/upload', (req, res) => {
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
            res.status(201).send()
        })
        .catch(err => console.log(err));
})

rdsRouter.get('/people', (req, res) => {
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

module.exports = rdsRouter;