import React from 'react'

import { connect } from 'react-redux'

import classes from './sidebarMenu.scss'
import { showBLocks, showFields } from '../../store';

const SidebarMenu = (props) => {
    return (
        <div className={classes.SidebarMenu}>
            <button onClick={props.showBlocks} className={props.sideMenu == 'blocks' ? classes.Active : null}>Blocks</button>
            <button onClick={props.showFields} className={props.sideMenu == 'fields' ? classes.Active : null}>Fields</button>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        sideMenu: state.appState.sideMenu
    }
}

const mapDispatchToProps = dispatch => {
    return{
        showBlocks: () => dispatch(showBLocks()),
        showFields: () => dispatch(showFields())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);