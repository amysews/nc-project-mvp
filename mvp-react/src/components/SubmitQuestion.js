import React from 'react';
import _ from 'lodash'

import {fetchUsers, postTopicMetadata, postQuestionToBucket} from '../api'

class SubmitQuestion extends React.Component {
    state = {
        questioners: [],
        submitted: false,
        userId: '',
        topic: '',
        question: ''
    }

    componentDidMount() {
        fetchUsers()
            .then(({users}) => {
                const questioners = users.filter(user => user.questioner)
                this.setState({ questioners })
            })
    }    

    handleSubmit = (event) => {
        event.preventDefault();

        const {userId, topic, question} = this.state;

        if (!userId || !topic || !question) return;

        return postTopicMetadata(topic, userId)
            .then(({questionId}) => {
                return postQuestionToBucket(question, questionId)
            })
            .then(console.log)
            .catch(console.error)
    }

    handleUserChange = (event) => {
        this.setState({
            userId: event.target.value
        })
    }
    handleQuestionChange = (event) => {
        this.setState({
            question: event.target.value
        })
    }
    handleTopicChange = (event) => {
        this.setState({
            topic: event.target.value
        })
    }

    render() {
        const { questioners, submitted, userId, topic, question } = this.state;
        return (
            <div>
                <h1>Submit new Question</h1>
                <form onSubmit={this.handleSubmit}>
                    User:<br/>
                    <select name="user" onChange={this.handleUserChange} value={userId}>
                        <option value="" disabled>Select your option</option>
                        {questioners.map((questioner, i) => {
                            return (
                                <option 
                                    id="user_id" 
                                    key={i} 
                                    value={questioner.id}
                                >
                                    {questioner.first_name} {questioner.surname}
                                </option>
                            )
                        })}
                    </select><br/>
                    Question:<br/>
                    <textarea 
                        id="questionText" 
                        name="questionText" 
                        value={question}
                        placeholder='Enter a question'
                        onChange={this.handleQuestionChange}
                    /><br/>
                    Topic:<br/>
                    <input 
                        id="topic" 
                        type="text" 
                        name="topic" 
                        onChange={this.handleTopicChange}
                        value={topic}
                        placeholder='Enter a topic'
                    /><br/>
                    <button type="submit">Submit</button>
                </form>
                <span>{submitted ? 'Question submitted' : null}</span>
            </div>
        )
    }
}



export default SubmitQuestion;