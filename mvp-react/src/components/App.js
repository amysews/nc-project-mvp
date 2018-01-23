import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Users from './Users';
import Questions from './Questions';



class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar />
                   <Switch>
                    <Route exact path = "/users" component={Users}></Route>
                    <Route exact path = "/questions" component={Questions}></Route>


                   </Switch>
                </div>
            </BrowserRouter>
        )
    }
}


export default App;