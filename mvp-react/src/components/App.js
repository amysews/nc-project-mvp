import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Users from './Users';
import Questions from './Questions';
import QA_Page from './QA_Page';


class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Navbar />
					<Switch>
						<Route exact path="/users" component={Users}></Route>
						<Route exact path="/questions" component={Questions}></Route>
						<Route exact path="/questions/:question_id" component={QA_Page}></Route>
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}


export default App;