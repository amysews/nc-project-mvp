import React from 'react';
import _ from 'lodash'

class SubmitQuestion extends React.Component {
    state = {
        questioners: [],
        submitted: false
    }

    componentDidMount() {
        return fetch('http://localhost:3002/rds/users')
            .then(buffer => buffer.json())
            .then(({users}) => {
                const questioners = users.filter(user => user.questioner)
                this.setState({ questioners })
            })
    }

    submitDatabaseQuestions = (event) => {
        event.preventDefault()

        let userArray = event.target.children[1].children
        userArray = [...userArray]
        let user_id = _.find(userArray, (user) => {
            return user.selected
        })
        user_id = user_id.value;
        const questionText = event.target.questionText.value
        const topic = event.target.topic.value
        const keywords = topic
        
        let text_in_bucket = 1
        console.log(text_in_bucket)
        // if (questionText.length > 0){
        //     text_in_bucket = 1
        // } else {
        //     text_in_bucket = 0
        // }


        return fetch('http://localhost:3002/rds/questions', {
            method: 'PUT',
            body: JSON.stringify({ user_id, topic, keywords, text_in_bucket }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => {
                if (res.status === 201) {
                    this.setState({ submitted: true });
                }
            })
            .catch(err => {
                console.log(err)
            })
       
    }



    render() {
        const { questioners, submitted } = this.state;
        return (
            <div>
                <h1>Submit new Question</h1>
                <form onSubmit={this.submitDatabaseQuestions}>
                    User:<br/>
                    <select name="user">
                        {questioners.map((questioner, i) => {
                            return <option id="user_id" key={i} value={questioner.id}>{questioner.first_name} {questioner.surname}</option>
                        })}
                    </select><br/>
                    Question:<br/>
                    <textarea id="questionText" name="questionText" /><br/>
                    Topic:<br/>
                    <input id="topic" type="text" name="topic" /><br/>
                    <button type="submit">Submit</button>
                </form>
                <span>{submitted ? 'Question submitted' : null}</span>
            </div>
        )
    }
}



export default SubmitQuestion;