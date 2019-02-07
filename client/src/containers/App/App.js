import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../Login/Login';
import Register from '../Register/Register'
import Landing from '../Landing/Landing'

class App extends React.Component{
    render(){
        return(
            <BrowserRouter>
				<Switch>
					<Route path='/register' exact component={Register}/>
					<Route path='/login' exact component={Login}/>
					<Route path='/' exact component={Landing}/>
					{/* <Protected isLogged={this.props.isLogged} path="/editPost" component={EditPost}/> */}
					<Redirect to='/' />
				</Switch>
			</BrowserRouter>
        )
    }
}

export default App;