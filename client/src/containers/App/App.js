import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Landing from '../Landing/Landing'
import TermsOfServiceModifier from '../TermsOfServiceModifier/TermsOfServiceModifier'

class App extends React.Component{

    render(){
        return(
            <BrowserRouter>
				<Switch>
					<Route path='/' exact component={Landing}/>
					<Route path='/terms-of-service' exact component={TermsOfServiceModifier}/>
					<Redirect to='/' />
				</Switch>
			</BrowserRouter>
        )
    }
}

export default App;