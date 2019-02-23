import React from 'react'

import { connect } from 'react-redux'
import { selectForDragging, unselectFromDragging } from '../../store'

import { ItemTypes } from '../../dnd/types'
import { DragSource } from 'react-dnd';
import { getEmptyImage } from "react-dnd-html5-backend";

import classes from './BlockSelector.scss'

const selectorSource = {
    beginDrag(props, monitor, component) {
        setTimeout(() => props.selectForDragging(props.kind), 0);
        return {};
    },
    endDrag(props, monitor, component){
        props.unselectFromDragging()
    }
};

const collect = (connect, monitor) => {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    }
}

class BlockSelector extends React.Component{

    componentDidMount(){
        //hide default drag preview
        this.props.connectDragPreview(getEmptyImage())
    }
    
    render(){
        return this.props.connectDragSource(
            <div className={classes.BlockSelector} >
                {this.props.kind}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        selectForDragging: (kind) => dispatch(selectForDragging(kind)),
        unselectFromDragging: () => dispatch(unselectFromDragging())
    }
}

export default connect(null, mapDispatchToProps)(DragSource(ItemTypes.BLOCK_SELECTOR, selectorSource, collect)(BlockSelector));