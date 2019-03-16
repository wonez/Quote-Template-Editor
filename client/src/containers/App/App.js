import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios'

import Landing from '../Landing/Landing'

class App extends React.Component{

    componentDidMount(){
        axios.get('/app/get-current').then(res => {
            console.log(res);
        })
    }

    render(){
        return(
            <BrowserRouter>
				<Switch>
					<Route path='/' exact component={Landing}/>
					<Redirect to='/' />
				</Switch>
			</BrowserRouter>
        )
    }
}

export default App;