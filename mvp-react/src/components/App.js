import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Users from './Users';
import Questions from './Questions';
import QA_Page from './QA_Page';
import CreateUser from './CreateUser';
import SubmitQuestion from './SubmitQuestion';
import SubmitQuestionAudio from './SubmitQuestionAudio';


class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Navbar />
					<Switch>
						<Route exact path="/" component={CreateUser}></Route>
						<Route exact path="/users" component={Users}></Route>
						<Route exact path="/questions" component={Questions}></Route>
						<Route exact path="/questions/:question_id" component={QA_Page}></Route>
						<Route exact path="/submitQuestion" component={SubmitQuestionAudio}></Route>
						{/* <Route exact path="/submitQuestion" component={SubmitQuestion}></Route> */}
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}


export default App;