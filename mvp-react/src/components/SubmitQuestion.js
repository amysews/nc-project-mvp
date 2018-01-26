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
        const answered = 1
        let text_in_bucket;

        if (questionText.length > 0){
            text_in_bucket = 1
                        } else {
            text_in_bucket = 0
        }
        console.log(text_in_bucket, 'iiii')

        function updateTopicName (){                //update database with metadata from the question form.
            return fetch('http://localhost:3002/rds/questions', {
                method: 'PUT',
                body: JSON.stringify({ user_id, topic, keywords, answered, text_in_bucket }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })       
                .then(res => {
                    // console.log(res)
                    // if (res.status === 201) {
                    //     this.setState({ submitted: true });                  /// this is coming back undefined , cannot set state
                    // }
                })
        }
    
        function getIdOfQuestion (){        //fetch db metadata for question text file name. Incomplete.
            return fetch('http://localhost:3002/rds/questions')
            .then(buffer=>buffer.json())
            .then(data=>{
                console.log(data, 'data')
            })
        }




        function putQuestionInS3 (questionText) {       //put question text into bucket.  File is delivered but undefined
            console.log('*****')
            return fetch(`http://localhost:3002/s3/textstorage`, {
                method: 'PUT',
                body: JSON.stringify({ questionText }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(buffer => {
                return buffer})
          
        }
        function UpdateTopicAndBucket () {                  //run functions in order of renaming
            return updateTopicName().then(() => {
                return getIdOfQuestion()
            })
            .then(() => {
                return putQuestionInS3(questionText)
            })
            .then(res => {
                console.log(res)
                return res
            })
            .catch(console.log)
        }
        UpdateTopicAndBucket() 
        .then((data)=>{
            //console.log(data)
        })
            // this ^ needs to be within the above fetch request
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