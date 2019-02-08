import React from 'react'
import { connect } from 'react-redux'

import Editor from '../Editor/Editor'
import Home from '../Home/Home'

import Aux from '../../hoc/Aux'

const Landing = (props) => {
    return(
        <Aux>
            {props.isLogged ?  <Editor /> : <Home /> } 
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return{
        isLogged: state.auth.isLogged
    }
}

export default connect(mapStateToProps)(Landing);