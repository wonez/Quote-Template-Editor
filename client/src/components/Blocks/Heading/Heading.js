import React from 'react'

import classes from './Heading.scss'

import { connect } from 'react-redux';

import { selectForMoving, unselectFromMoving } from '../../../store'

import { ItemTypes } from '../../../dnd/types'
import { DragSource } from 'react-dnd';

const headingSource = {
  beginDrag(props, monitor, component) {
    props.selectForMoving(props.id);
    return {};
  },
  endDrag(props, monitor, component){
    props.unselectFromMoving();
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Heading extends React.Component {
    render(){
        return this.props.connectDragSource(
            <div className={classes.Heading} style={{top: this.props.y, cursor: 'move'}}>
                <div className={classes.Toolbar}>
                    <div className={classes.Select} onClick={this.props.selectForEditing}></div>
                    <p>Heading Block</p>
                    <div className={classes.Delete} onClick={this.props.deleteItemFromEditor}>Delete</div>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        selectForMoving: (id) => dispatch(selectForMoving(id)),
        unselectFromMoving: () => dispatch(unselectFromMoving())
    }
}

export default connect(null, mapDispatchToProps)(DragSource(ItemTypes.HEADING_BLOCK, headingSource, collect)(Heading));