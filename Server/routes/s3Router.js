const express = require('express');
const s3Router = express.Router();

const aws = require('aws-sdk');

const { accessKeyId, secretAccessKey, region } = require('./config')
aws.config.region = region;
aws.config.credentials = { accessKeyId, secretAccessKey }


const s3 = new aws.S3();
const textBucket = 'textstorage-northcoders';
const rawAudioBucket = 'rawaudiostorage-northcoders';
const mp3AudioBucket = 'mp3audiostorage-northcoders';
const mysql = require('promise-mysql');
const SQL = require('sql-template-strings');

s3Router.put(`/textstorage`, (req, res) => {
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
			res.json({ text })
		})
		.catch((err) => {
			console.log(err)
		})
})

s3Router.get('/sign', (req, res) => {
	const filename = req.query.objectName;
    const mimeType = 'audio/webm';
    const ext = '.webm';
    const fileKey = filename + ext;

    const params = {
      Bucket: rawAudioBucket,
      Key: fileKey,
      Expires: 6000,
      ContentType: mimeType,
      ACL: 'public-read' // || 'private'
    };

	// Getting pre-signed url - no actual data is being passed here
    s3.getSignedUrl('putObject', params, function(err, url) {
      if (err) {
        console.log(err);
        return res.send(500, "Cannot create S3 signed URL");
      }

      console.log('url: ', url)
      res.json({
        signedUrl: url,
        publicUrl: 'https://s3.amazonaws.com/'+ rawAudioBucket + '/' + fileKey,
        filename: filename
      });
    });
})

module.exports = s3Router;