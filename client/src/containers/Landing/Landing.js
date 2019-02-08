import React from 'react'
import { connect } from 'react-redux'

import Editor from '../Editor/Editor'
import Home from '../Home/Home'

import Aux from '../../hoc/Aux'

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const Landing = (props) => {
    return(
        props.isLogged ? (
            <DragDropContextProvider backend={HTML5Backend}>
                <Editor /> 
            </DragDropContextProvider>
        ): <Home />        
    )
}

const mapStateToProps = (state) => {
    return{
        isLogged: state.auth.isLogged
    }
}

export default connect(mapStateToProps)(Landing);