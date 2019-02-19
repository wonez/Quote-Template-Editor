import React from 'react'
import { connect } from 'react-redux'

import KindToDom from '../KindToDom/KindToDom'

import classes from './FieldGeneric.scss'

import { ItemTypes } from '../../dnd/types'
import { DragSource } from 'react-dnd'

import { selectForMoving, unselectFromMoving, updateValue, selectForEditing } from '../../store'

const source = {
    beginDrag(props, monitor, component) {
      props.selectForMoving({ kind: props.kind, itemId: props.id, editorId: props.editorId, blockId: props.blockId, value: props.value });
      return {};
    },
    endDrag(props, monitor, component) {
      props.unselectFromMoving();
    }
};
  
const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
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

    selectForEditing = (e) => {
        e.stopPropagation();
        this.props.selectForEditing({
            id: this.props.id,
            editorId: this.props.editorId,
            blockId: this.props.blockId
        })
    }

    render(){
        return this.props.connectDragSource(
            <div key={this.props.id} 
                onClick={this.selectForEditing}
                className={this.props.selectedForEditing.id == this.props.id ? classes.Editing : null}
                style={{ position: 'absolute', left: this.props.x, top: this.props.y}}>
                <KindToDom 
                    focused={this.props.selectedForEditing.id == this.props.id}
                    kind={this.props.kind}
                    type={this.props.type}
                    editorId={this.props.editorId}
                    blockId={this.props.blockId}
                    id={this.props.id}
                    value={this.props.value}
                    changeHandler={this.changeHandler}
                    connectDragSource={this.props.connectDragSource}
                    deleteItemFromEditor={this.props.deleteItemFromEditor}
                    children={this.props.children} />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        selectedForEditing: state.appState.selectedForEditing, /// if inside block : else outside of block
        value: props.blockId ? state.appState.editors[props.editorId][props.blockId].children[props.id].value : state.appState.editors[props.editorId][props.id].value
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        selectForMoving: (data) => dispatch(selectForMoving(data)),
        selectForEditing: data => dispatch(selectForEditing(data)),
        unselectFromMoving: () => dispatch(unselectFromMoving()),
        updateValue: (identifier, value) => dispatch(updateValue(identifier, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragSource(ItemTypes.GENERIC_FIELD, source, collect)(FieldGeneric));