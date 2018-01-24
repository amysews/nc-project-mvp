const express = require('express');
const s3Router = express.Router();

const aws = require('aws-sdk');
const s3 = new aws.S3();
const textBucket = 'textstorage-northcoders';
const rawAudioBucket = 'rawaudiostorage-northcoders';
const mp3AudioBucket = 'mp3audiostorage-northcoders';
const mysql = require('promise-mysql');
const SQL = require('sql-template-strings');

s3Router.put(`/upload`, (req, res) => {
	const { text, fileName } = req.body;
	const params = {
		Bucket: textBucket,
		Key: fileName + '.txt',
		Body: text
	}

	s3.putObject(params, (err, data) => {
		if (err) console.log(err)
		else {
			console.log(data, 'success')
			res.status(201).send();
		}
	})
})

s3Router.get('/textstorage', (req, res) => {
	const key = req.query.keyName;   /// keyname on the query
	const params = {
		Bucket: textBucket,
		Key: key + '.txt'
	}
	let getObjectPromise = s3.getObject(params).promise();
	getObjectPromise.then((data) => {

		return data.Body.toString('utf8')
	})
		.then((text) => {
			console.log(text)
			res.json({ text })
		})
		.catch((err) => {
			console.log(err)
		})
})

module.exports = s3Router;