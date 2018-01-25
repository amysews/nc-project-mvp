import React from 'react';

class CreateUser extends React.Component {
    state = {
        submitted: false
    }
    
    putNewUser = (event) => {
		event.preventDefault()

		const first_name = event.target.first_name.value;
		const surname = event.target.surname.value;
		const region = event.target.region.value;
		const email = event.target.email.value;
		const user_password = event.target.user_password.value;
		const gender = event.target.gender.value;
		const dob = event.target.dob.value;
		const occupation = event.target.occupation.value;

		let answerer, questioner;
		if (event.target.submitterType.value === "questioner") {
			answerer = 0;
			questioner = 1;
		} else {
			answerer = 1;
			questioner = 0;
		}

		return fetch('http://localhost:3002/rds/users', {
			method: 'PUT',
			body: JSON.stringify({ first_name, surname, answerer, questioner, region, email, user_password, gender, dob, occupation }),
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

    render () {
        const { submitted } = this.state;
        return (
            <div>
                <h4>Create new user form</h4>
                <form id='createUser' onSubmit={this.putNewUser}>
                    <input id='first_name' type='text' placeholder="First name"></input><br />
                    <input id='surname' type='text' placeholder="Last name"></input><br />
                    <input type="radio" name="submitterType" value="questioner" />Submit questions<br />
                    <input type="radio" name="submitterType" value="answerer" />Submit answers<br />
                    <input id='region' type='text' placeholder="Region"></input><br />
                    <input id='email' type='email' placeholder="Email address"></input><br />
                    <input id='user_password' type='text' placeholder="Password"></input><br />
                    <input type="radio" name="gender" value="Male" />Male<br />
                    <input type="radio" name="gender" value="Female" />Female<br />
                    <input id='dob' type='text' placeholder="YYYY-MM-DD"></input><br />
                    <input id='occupation' type='text' placeholder="Occupation"></input><br />
                    <button type='submit'>Submit!</button>
                </form>
                <span>{submitted ? 'User submitted' : null }</span>
            </div>
        )
    }
}

export default CreateUser;