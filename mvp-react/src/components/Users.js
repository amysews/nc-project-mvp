import React from 'react';

class Users extends React.Component {
	state = {
		users: []
	}
	
	componentDidMount() {
		this.getAllUsers()
	}

	getAllUsers = () => {
		return fetch('http://localhost:3002/rds/users')
			.then(resBuffer => resBuffer.json())
			.then((res) => {
				this.setState({
					users: res.users
				})
			})
			.catch(err => console.log(err))
	}


	render() {
		const { users } = this.state;
		return (
			<div>
				<ul>
					{users.map((user, i) => {
						return <li key={i}>{user.first_name} {user.surname}</li>
					})
					}
				</ul>
			</div>
		)
	}
}
export default Users;