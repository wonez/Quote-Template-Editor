import React from 'react'
import { connect } from 'react-redux'

import {
    addItemToEditor,
    moveItemInsideEditor,
    pageBreak,
    selectForEditing,
    moveField
} from '../../store'

import { getItemType, setFieldDefaults, setBlockDefaults } from '../../helpers'

import classes from './TemplateEditor.scss'

import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from '../../dnd/types'
import BlockGeneric from '../../components/BlockGeneric/BlockGeneric';
import FieldGeneric from '../../components/FieldGeneric/FieldGeneric';

const editorTarget = {
    drop(props, monitor, component) {
        if (monitor.didDrop()) {
            return;
        }
        if (props.selectedForDragging != '') { // add item to editor
            if(props.selectedForDragging == 'Page Break'){
                props.pageBreak(props.id)
            }else{
                calculatePositionAndAddItemToEditor(props.addItemToEditor, monitor.getClientOffset(), component, {
                    editorId: props.id,
                    kind: props.selectedForDragging,
                });
            }
        } else { // move item inside editor
            if(props.selectedForMoving.blockId){// move item from block to editor
                props.moveField({
                    editorId: props.id,
                    coords: getCoords(component, monitor.getSourceClientOffset())
                })
            }else{
                let coords = monitor.getDifferenceFromInitialOffset()
                props.moveItemInsideEditor(coords)
            }
        }
    }
};

const getCoords = (component, client) => {
    const target = findDOMNode(component).getBoundingClientRect()
    return{
        x: client.x - target.x,
        y: client.y - target.y
    }
}

const calculatePositionAndAddItemToEditor = (addItemToEditor, source, component, data) => {
    const type = getItemType(data.kind);
    let argument = {
        editorId: data.editorId,
        newItem: {
            type,
            kind: data.kind,
            id: data.kind + Date.now(),
            ...getCoords(component, source)
        }
    }
    if(type == 'block'){
        argument.newItem.styles = {
            fontSize: 10,
            textAlign: 'free',
            color: '#000000',
            fontFamily: 'Arial',
        }
        setBlockDefaults(data.kind, argument.newItem)
    }else if(type=='field'){
        argument.newItem.styles = {
            backgroundColor: '#eeeeee',
            fontSize: 10,
            color: '#000000',
        }
        setFieldDefaults(data.kind, argument.newItem)
    }
    addItemToEditor(argument)
}

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: false })
    };
}

class TemplateEditor extends React.Component {
    render(){    
        return this.props.connectDropTarget(
            <div className={classes.TemplateEditor} onClick={this.props.selectForEditing}>
                {Object.keys(this.props.items).map(key => {
                    let data = this.props.items[key];
                    if(data.type == 'block'){
                        return (
                            <BlockGeneric 
                                editorId={this.props.id}
                                key={data.id}
                                {...data} />
                        )
                    }else if(data.type == 'field'){
                        return(
                            <FieldGeneric 
                                editorId={this.props.id}
                                key={data.id}
                                {...data} />
                        )
                    }
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedForDragging: state.appState.selectedForDragging,
        selectedForMoving: state.appState.selectedForMoving
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItemToEditor: (data) => dispatch(addItemToEditor(data)),
        moveItemInsideEditor: data => dispatch(moveItemInsideEditor(data)),
        pageBreak: editorId => dispatch(pageBreak(editorId)),
        selectForEditing: () => dispatch(selectForEditing({})),
        moveField: target => dispatch(moveField(target))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget([ItemTypes.GENERIC_BLOCK, ItemTypes.BLOCK_SELECTOR, ItemTypes.FIELD_SELECTOR, ItemTypes.GENERIC_FIELD], editorTarget, collect)(TemplateEditor));