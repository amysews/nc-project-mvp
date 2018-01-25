import React from 'react';

class SubmitQuestion extends React.Component {
    state = {
        questioners: []
    }

    componentDidMount() {
        return fetch('http://localhost:3002/rds/users')
            .then(buffer => buffer.json())
            .then(({users}) => {
                const questioners = users.filter(user => user.questioner)
                this.setState({ questioners })
            })
    }

    render() {
        const { questioners } = this.state;
        return (
            <div>
                <h1>Submit new Question</h1>
                <form>
                    User:<br/>
                    <select name="user">
                        {questioners.map((questioner, i) => {
                            return <option key={i} value={questioner.id}>{questioner.first_name} {questioner.surname}</option>
                        })}
                    </select><br/>
                    Question:<br/>
                    <textarea name="questionText" /><br/>
                    Topic:<br/>
                    <input type="text" name="topic" /><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default SubmitQuestion;