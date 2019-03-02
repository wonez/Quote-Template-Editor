import React from 'react'
import { connect } from 'react-redux'

import {
    addItemToEditor,
    deleteItemFromEditor,
    moveItemInsideEditor,
    pageBreak,
    selectForEditing,
    moveField
} from '../../store'

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
    const target = findDOMNode(component).getBoundingClientRect();// x y target
    const argument = {
        editorId: data.editorId,
        newItem: {
            type,
            kind: data.kind,
            id: data.kind + Date.now(),
            x: source.x - target.x,
            y: source.y - target.y,
        }
    }
    if(type == 'block'){
        argument.newItem.styles = {
            fontSize: 10,
            textAlign: 'free',
            color: '#000000',
            fontFamily: 'Arial',
        }
        if(data.kind == 'Image'){
            argument.newItem.styles.backgroundImage  = '',
            argument.newItem.styles.backgroundRepeat = 'no-repeat';
            argument.newItem.styles.backgroundPosition = [0, 0];
            argument.newItem.styles.backgroundSize = [100, 100]
        }else{
            argument.newItem.styles.backgroundColor = '#ffffff'
        }
    }else{
        argument.newItem.styles = {
            backgroundColor: '#eeeeee',
            fontSize: 10,
            color: '#000000',
        }
        if(data.kind == 'Date Input'){
            argument.newItem.value = '2019-01-01'
        }else if(data.kind == 'Initials Input'){
            argument.newItem.value = 'TEXT'
        }else if(data.kind == 'Checkbox Input'){
            argument.newItem.value = 'Label';
            argument.newItem.checked = false;
        }else if(data.kind == 'Dropdown Input'){
            argument.newItem.options = {
                'Option 1': 'Option 1', 
                'Option 2': 'Option 2', 
                'Option 3': 'Option 3'
            }
            argument.newItem.value = 'Option 1';
        }else{
            argument.newItem.value = 'Your Text'
        }
    }
    if(data.kind == 'Cover Page'){
        console.log('aaa');
        // argument.newItem.chilren = {
            
        // }
    }
    addItemToEditor(argument)
}

const getItemType = (text) => {
    let kind = text;
    try {
        Array.from(kind).forEach((chr, i) => {
            if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(chr) != -1)
                throw i;
        })
    } catch (i) {
        kind = kind.substring(0, i)
    }
    if (['Cover Page', 'Heading', 'Image', 'Page Break', 'Paragraph', 'Pricing Table', 'Table', 'Terms Of Service'].indexOf(kind) != -1)
        return 'block'
    if(['Checkbox Input', 'Date Input', 'Dropdown Input', 'Initials Input', 'Signature Input', 'Text Input'].indexOf(kind) != -1)
        return 'field'
    return null;
}

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: false })
    };
}

class TemplateEditor extends React.Component {

    render() {
        return this.props.connectDropTarget(
            <div className={classes.TemplateEditor} onClick={this.props.selectForEditing}>
                {Object.keys(this.props.items).map(key => {
                    let data = this.props.items[key];
                    if(data.type == 'block'){
                        return (
                            <BlockGeneric 
                                editorId={this.props.id}
                                key={data.id}
                                connectDropTarget={this.props.connectDropTarget}
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
        deleteItemFromEditor: (data) => dispatch(deleteItemFromEditor(data)),
        moveItemInsideEditor: data => dispatch(moveItemInsideEditor(data)),
        pageBreak: editorId => dispatch(pageBreak(editorId)),
        selectForEditing: () => dispatch(selectForEditing({})),
        moveField: target => dispatch(moveField(target))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget([ItemTypes.GENERIC_BLOCK, ItemTypes.BLOCK_SELECTOR, ItemTypes.FIELD_SELECTOR, ItemTypes.GENERIC_FIELD], editorTarget, collect)(TemplateEditor));