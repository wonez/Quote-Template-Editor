import React from 'react'

import { connect } from 'react-redux'

import SidebarMenu from '../../components/SidebarMenu/SidebarMenu'
import AllBlocks from '../../components/AllBlocks/AllBlocks'
import AllFields from '../../components/AllFields/AllFields'
import Edit from '../Edit/Edit'

import classes from './EditorSidebar.scss'
import GenericDragLayer from '../../components/GenericDragLayer/GenericDragLayer';

class EditorSidebar extends React.Component{

    
    render(){
        
        let content = null;

        if(this.props.selectedForEditing.id){
            content = <Edit />
        }else if(this.props.sideMenu == 'blocks'){
            content = <AllBlocks />
        }else{
            content = <AllFields />
        }
        

        return(
            <div className={classes.EditorSidebar}>
                <SidebarMenu />
                <div className={classes.Content}>
                    {content}
                </div>
                <GenericDragLayer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sideMenu: state.appState.sideMenu,
        selectedForEditing: state.appState.selectedForEditing,
    }
}

export default connect(mapStateToProps)(EditorSidebar);