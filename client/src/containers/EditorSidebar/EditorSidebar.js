import React from 'react'

import { connect } from 'react-redux'

import SidebarMenu from '../../components/SidebarMenu/SidebarMenu'
import AllBlocks from '../../components/AllBlocks/AllBlocks'
import AllFields from '../../components/AllFields/AllFields'

import classes from './EditorSidebar.scss'
import BlockDragLayer from '../../components/BlockDragLayer/BlockDragLayer';

class EditorSidebar extends React.Component{
    render(){
        return(
            <div className={classes.EditorSidebar}>
                <SidebarMenu />
                <div className={classes.Content}>
                    {this.props.sideMenu == 'blocks' ? <AllBlocks /> : <AllFields /> }
                </div>
                <BlockDragLayer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sideMenu: state.appState.sideMenu
    }
}

export default connect(mapStateToProps)(EditorSidebar);