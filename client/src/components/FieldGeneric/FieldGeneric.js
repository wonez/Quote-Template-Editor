import React from 'react'
import { connect } from 'react-redux'

import TypeToDom from '../TypeToDom/TypeToDom'

import { ItemTypes } from '../../dnd/types'
import { DragSource } from 'react-dnd'

import { selectForMoving, unselectFromMoving } from '../../store'

const source = {
    beginDrag(props, monitor, component) {
      props.selectForMoving({ kind: props.kind, itemId: props.id, editorId: props.editorId, blockId: props.blockId });
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
    render(){
        return this.props.connectDragSource(
            <div key={this.props.id} style={{ border: '1px solid red', position: 'absolute', left: this.props.x, top: this.props.y}}>
                gfsd  
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        selectForMoving: (data) => dispatch(selectForMoving(data)),
        unselectFromMoving: () => dispatch(unselectFromMoving())
    }
}

export default connect(null, mapDispatchToProps)(DragSource(ItemTypes.GENERIC_FIELD, source, collect)(FieldGeneric));