import React from 'react'
import { connect } from 'react-redux'

import Editor from '../Editor/Editor'
import Home from '../Home/Home'

const Landing = (props) => {
    return(
        <div>
            {props.isLogged ?  <Editor /> : <Home /> } 
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        isLogged: state.auth.isLogged
    }
}

export default connect(mapStateToProps)(Landing);