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
        // Fetches question meta data
        return fetch(`http://localhost:3002/rds/questions/${id}`)
            .then(buffer => buffer.json())
            .then(metaData => questionMetaData = metaData.question)
            .then(() => {
                // Fetches question data (text) from the bucket using the id for that question
                return fetch(`http://localhost:3002/s3/textstorage?keyName=q${questionMetaData.id}`)
            })
            .then(buffer => buffer.json())
            .then(questionText => {
                questionMetaData.text = questionText.text;
                // Fetches asker info 
                return fetch(`http://localhost:3002/rds/users/${questionMetaData.user_id}`)
            })
            .then(buffer => buffer.json())
            .then(userMetaData => {
                questionMetaData.user = userMetaData;
            })
            .then(() => {
                // Fetches all of the answers with their meta data for that question
                return fetch(`http://localhost:3002/rds/questions/${id}/answers`)
            })
            .then(buffer => buffer.json())
            .then(metaData => answerMetaData = metaData.answers)
            .then(() => {
                const promises = answerMetaData.map(answer => {
                    // Fetches all of the answer data (text) from the bucket using the answer id's
                    return fetch(`http://localhost:3002/s3/textstorage?keyName=a${answer.id}`).then(buffer => buffer.json())
                })
                return Promise.all(promises)
            })
            .then(answerText => {
                answerText.forEach((answer, i) => {
                    answerMetaData[i]['text'] = answerText[i].text
                })
            })
            .then(() => {
                const promises = answerMetaData.map(answer => {
                    return fetch(`http://localhost:3002/rds/users/${answer.user_id}`).then(buffer => buffer.json())
                })
                return Promise.all(promises)
            })
            .then((userMetaData) => {
                console.log(userMetaData)
                userMetaData.forEach((user, i) => {
                    answerMetaData[i].user = user
                })
                this.setState({ question: questionMetaData, answers: answerMetaData })
            })

    }



    render() {
        const { question, answers } = this.state;
        if (!question.user) question.user = {};
        return (
            <div>
                <h1>{question.text}</h1>
                <p>{question.user.first_name} {question.user.surname}</p>
                <p>{question.time_stamp}</p>
                <p>{question.keywords}</p>
                {answers.map((answer, i) => {
                    return (
                        <div key={i}>
                            <p>{answer.text}</p>
                            <p>{answer.user.first_name} {answer.user.surname}</p>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}

export default QA_Page;