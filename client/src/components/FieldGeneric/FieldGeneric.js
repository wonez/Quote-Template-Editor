import React from 'react'
import { connect } from 'react-redux'

import classes from './FieldGeneric.scss'

import { updateStyles } from '../../store'

import { ItemTypes } from '../../dnd/types'
import { DragSource } from 'react-dnd'

import { selectForMoving, unselectFromMoving, updateValue, selectForEditing, handleCheck } from '../../store'
import TextInput from '../Fields/TextInput/TextInput';
import DateInput from '../Fields/DateInput/DateInput';
import InitialsInput from '../Fields/InitialsInput/InitialsInput';
import Checkbox from '../Fields/Checkbox/Checkbox';
import DropDownField from '../Fields/DropdownField/DropDownField';
import SignatureInput from '../Fields/SignatureInput/SignatureInput';

import { handleBackground } from '../../helpers'

import ReactResizeDetector from 'react-resize-detector';
import Logo from '../Fields/Logo/Logo';

const source = {
    beginDrag(props, monitor, component) {
      props.selectForMoving({ kind: props.kind, id: props.id, editorId: props.editorId, blockId: props.blockId, value: props.value });
      return {};
    },
    endDrag(props, monitor, component) {
      props.unselectFromMoving();
    }
};
  
const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

class FieldGeneric extends React.Component{

    changeHandler = (e) => { 
        this.props.updateValue({
            id: this.props.id,
            editorId: this.props.editorId,
            blockId: this.props.blockId
        }, e.target.value);
    }

    canvasHandler = data => {
        this.props.updateValue({
            id: this.props.id,
            editorId: this.props.editorId,
            blockId: this.props.blockId
        }, data)
    }

    checkHandler = () => {
        this.props.handleCheck({
            id: this.props.id,
            editorId: this.props.editorId,
            blockId: this.props.blockId
        });
    }

    selectForEditing = (e) => {
        e.stopPropagation();
        this.props.selectForEditing({
            id: this.props.id,
            editorId: this.props.editorId,
            blockId: this.props.blockId,
			kind: this.props.kind,
			type: this.props.type
        })
    }

    getStyles = () => {
        let style = {
            position: 'absolute',
            top: this.props.y,
            ...this.props.styles
        }
        if(this.props.blockStyles.textAlign == 'center'){
            style.left = '50%';
            style.transform = 'translateX(-50%)'; 
        } else if(this.props.blockStyles.textAlign == 'left'){
            style.left = 5; 
        } else if(this.props.blockStyles.textAlign == 'right'){
            style.right = 5; 
        } else {
            style.left = this.props.x;
        }
        if(style.fontSize){
            style.fontSize = style.fontSize+'px';
        }
        return style;
    }

    getItem = () => {
        switch(this.props.kind){
            case 'Text Input': 
                return <TextInput value={this.props.value} changeHandler={this.changeHandler} />
            case 'Date Input':
                return <DateInput value={this.props.value} changeHandler={this.changeHandler} />
            case 'Initials Input':
                return <InitialsInput value={this.props.value} changeHandler={this.changeHandler} />
            case 'Checkbox Input':
                return <Checkbox value={this.props.value} changeHandler={this.changeHandler}
                                 checked={this.props.checked} checkHandler={this.checkHandler} />
            case 'Logo':
                return <Logo styles={handleBackground(this.props.styles)} />
            default: null;
        }
    }

    onResize = (width, height) => {
        console.log(width, height)
        this.props.updateStyles({editorId: this.props.editorId, blockId: this.props.blockId, id: this.props.id }, {
            key: 'width',
            val: `${width}px`
        })
        this.props.updateStyles({editorId: this.props.editorId, blockId: this.props.blockId, id: this.props.id }, {
            key: 'height',
            val: `${height}px`
        })
    }

    render(){

        if(['Signature Input', 'Dropdown Input'].includes(this.props.kind)){
            return this.props.connectDragPreview(
                <div key={this.props.id} 
                    onClick={this.selectForEditing}
                    className={this.props.selectedForEditing.id == this.props.id ? classes.Editing : null}
                    style={this.getStyles()}>
                    {this.props.kind == 'Signature Input' ? (
                            <SignatureInput editorId={this.props.editorId} blockId={this.props.blockId} id={this.props.id}
                                            value={this.props.value} 
                                            canvasHandler={this.canvasHandler}
                                            connectDragSource={this.props.connectDragSource} />
                    ) : (
                        <DropDownField  value={this.props.value} changeHandler={this.changeHandler}
                                        options={this.props.options}
                                        connectDragSource={this.props.connectDragSource} /> 
                    )}
                </div>
            )
        }else{
            return this.props.connectDragSource(
                <div key={this.props.id}
                    onClick={this.selectForEditing}
                    className={this.props.selectedForEditing.id == this.props.id ? ( 'Text Input' == this.props.kind ? [classes.Editing, classes.Resizible].join(' ') : classes.Editing ) : null}
                    style={this.getStyles()}>
                    { 'Text Input' == this.props.kind ? <ReactResizeDetector handleWidth handleHeight skipOnMount refreshMode="debounce" refreshRate={500} onResize={this.onResize} /> : null }
                    {this.getItem()}
                </div>
            )
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        selectedForEditing: state.appState.selectedForEditing, /// if inside block : else outside of block
        value: props.blockId ? state.appState.editors[props.editorId][props.blockId].children[props.id].value : state.appState.editors[props.editorId][props.id].value,
        blockStyles: props.blockId ? state.appState.editors[props.editorId][props.blockId].styles : {}
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        selectForMoving: (data) => dispatch(selectForMoving(data)),
        selectForEditing: data => dispatch(selectForEditing(data)),
        unselectFromMoving: () => dispatch(unselectFromMoving()),
        updateValue: (identifier, value) => dispatch(updateValue(identifier, value)),
        handleCheck: identifier => dispatch(handleCheck(identifier)),
        updateStyles: (identifier, value) => dispatch(updateStyles(identifier, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragSource(ItemTypes.GENERIC_FIELD, source, collect)(FieldGeneric));