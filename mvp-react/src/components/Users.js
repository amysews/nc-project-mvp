import React from 'react';

class Users extends React.Component {
	state = {
		users: []
	}
	
	componentDidMount() {
		this.getAllUsers()
	}

	getAllUsers = () => {
		return fetch('http://localhost:3002/rds/people')
			.then(resBuffer => resBuffer.json())
			.then((res) => {
				this.setState({
					users: res.people
				})
			})
			.catch(err => console.log(err))
	}


	render() {
		const { users } = this.state;
		return (
			<div>
				<ul>
					{users.map((person, i) => {
						return <li key={i}>{person.first_name} {person.surname}</li>
					})
					}
				</ul>
			</div>
		)
	}
}
export default Users;