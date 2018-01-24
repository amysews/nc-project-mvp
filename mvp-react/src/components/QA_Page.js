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
        let answerMetaData;
        return fetch(`http://localhost:3002/rds/question/${id}`)
            .then(buffer => buffer.json())
            .then(metaData => questionMetaData = metaData.question)
            .then(() => {
                return fetch(`http://localhost:3002/s3/textstorage?keyName=q${questionMetaData.id}`)
            })
            .then(buffer => buffer.json())
            .then(questionText => {
                questionMetaData.text = questionText.text;
            })
            .then(() => {
                return fetch(`http://localhost:3002/rds/question/${id}/answers`)
            })
            .then(buffer => buffer.json())
            .then(metaData => answerMetaData = metaData.answers)
            .then(() => {
                const promises = answerMetaData.map(answer => {
                    return fetch(`http://localhost:3002/s3/textstorage?keyName=a${answer.id}`).then(buffer => buffer.json())
                })
                return Promise.all(promises)
            })
            .then(answerText => {
                answerText.forEach((answer, i) => {
                    answerMetaData[i]['text'] = answerText[i].text
                })
                this.setState({ question: questionMetaData, answers: answerMetaData })
            })

    }



    render () {
        const { question, answers } = this.state;
        return (
            <div>
                <h1>{question.text}</h1>
                <p>{question.question_time_stamp}</p>
                <p>{question.question_keywords}</p>
                {answers.map((answer, i) => {
                return (
                 <div key={i}>
                    <p>{answer.text}</p>
                 </div>
                )
                })
                }
            </div>
        )
    }
}

export default QA_Page;