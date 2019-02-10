import React from 'react'
import { connect } from 'react-redux'

import {addItemToEditor, 
        deleteItemFromEditor, 
        selectForEditing,
        moveItemInsideEditor } from '../../store'

import Heading from '../../components/Blocks/Heading/Heading'

import classes from './TemplateEditor.scss'

import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from '../../dnd/types'

const editorTarget = {
    drop(props, monitor, component) {
        if(props.selectedForDragging != ''){
            const source = monitor.getSourceClientOffset()// x y client 
            const target = findDOMNode(component).getBoundingClientRect();// x y target
            props.addItemToEditor({ 
                editorId: props.id,
                newItem: {    
                    kind: props.selectedForDragging, 
                    id: props.selectedForDragging + Date.now(),  
                    x: source.x - target.x,
                    y: source.y - target.y,
                }
            })
        }else{
            let coords = monitor.getDifferenceFromInitialOffset()
            props.moveItemInsideEditor(coords)
        }
    }
};
  
const collect = (connect, monitor) => {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver({ shallow: false })
    };
}

class TemplateEditor extends React.Component{

    getCorrespondingItem = (data) => {
        switch(data.kind){
            case 'Heading': return <Heading 
                                        editorId = {this.props.id}
                                        key={data.id}
                                        selectForEditing={() => {this.props.selectForEditing({itemId: data.id, editorId: this.props.id})}}
                                        deleteItemFromEditor={() => {this.props.deleteItemFromEditor({itemId: data.id, editorId: this.props.id})}} 
                                        {...data} />
        }
    }

    render(){
        return this.props.connectDropTarget(
            <div className={classes.TemplateEditor}>
                {Object.keys(this.props.items).map( key => (
                    this.getCorrespondingItem(this.props.items[key])
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedForDragging: state.appState.selectedForDragging,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addItemToEditor: (data) => dispatch(addItemToEditor(data)),
        deleteItemFromEditor: (data) => dispatch(deleteItemFromEditor(data)),
        selectForEditing: data => dispatch(selectForEditing(data)),
        moveItemInsideEditor: data => dispatch(moveItemInsideEditor(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget([ItemTypes.HEADING_BLOCK, ItemTypes.BLOCK_SELECTOR], editorTarget, collect)(TemplateEditor));