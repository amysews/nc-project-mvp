import React from 'react';

class QA_Page extends React.Component {
    state = {
        question: {},
        answers: []
    }

    componentDidMount() {
        this.getOneQuestion(this.props.match.params.question_id)
    }

    getOneQuestion = (id) => {
        let questionMetaData;
        return fetch(`http://localhost:3002/rds/question/${id}`)
            .then(resBuffer => resBuffer.json())
            .then(metaData => questionMetaData = metaData.question)
            .then(() => {
                return fetch(`http://localhost:3002/s3/question?keyName=q${questionMetaData.id}`)
            })
            .then(buffer => buffer.json())
            .then(questionText => {
                questionMetaData.text = questionText.question;
                console.log(questionMetaData)
                this.setState({ question: questionMetaData })
            })
    }

    render () {
        const { question } = this.state;
        return (
            <div>
                <h1>{question.text}</h1>
                <p>{question.question_time_stamp}</p>
                <p>{question.question_keywords}</p>
            </div>
        )
    }
}

export default QA_Page;