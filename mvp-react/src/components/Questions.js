import React from 'react';
import { Link } from 'react-router-dom';

class Questions extends React.Component {
	state = {
		questions: []
	}

	componentDidMount() {
		this.getAllQuestions()
	}

	getAllQuestions = () => {
		let questionsMetaData = [];
		// first fetch the metadata with Q_ID
		return fetch('http://localhost:3002/rds/questions')
			.then(resBuffer => resBuffer.json())
			.then(data => {
				questionsMetaData = data.questions;
				console.log(questionsMetaData)
				const promises = questionsMetaData.map(question => {
					// then fetch the text file out of the bucket using the Q_ID
					return fetch(`http://localhost:3002/s3/textstorage?keyName=q${question.id}`).then(buffer => buffer.json())
				})
				return Promise.all(promises);
			})
			.then(questionText => {
				console.log(questionText)
				questionsMetaData.forEach((question, i) => {
					questionsMetaData[i]["text"] = questionText[i].text
				})
				this.setState({ questions: questionsMetaData })
			})
	}

	render() {
		const { questions } = this.state;
		return (
			<div>
				<ul>
					{questions.map((question, i) => {
						return <Link to={'/questions/' + question.id} question={question} key={i}><li>{question.text}</li></Link>
					})}
				</ul>
			</div>

		)
	}

}
export default Questions;