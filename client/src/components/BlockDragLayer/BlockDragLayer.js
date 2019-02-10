import React from 'react'

import { connect } from 'react-redux'

import classes from './BlockDragLayer.scss'

import BlockDragPreview from '../BlockDragPreview/BlockDragPreview'

import { setCoordinatesWhenDragging } from '../../store'

import { DragLayer } from 'react-dnd';
import { ItemTypes } from '../../dnd/types'


const collect = (monitor, props) => {
    if(!props.selectedForDragging){
        return {
            itemType: monitor.getItemType(),
            isDragging: monitor.isDragging()
        }
    }
    //store x, y in redux
    // if(monitor.getSourceClientOffset()) 
    //     props.setCoordinatesWhenDragging(monitor.getSourceClientOffset())
    return{
        itemType: monitor.getItemType(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }
}

class BlockDragLayer extends React.Component {

    getItemStyles = () => {
        const { currentOffset } = this.props;
        if (!currentOffset) {
            return {
                display: 'none'
            };
        }
        const { x, y } = currentOffset;
        return {
            top: y + 50,
            left: x + 50
        };
    }

    render(){

        if(!this.props.isDragging){
            return null
        }

        return (
            <div className={classes.BlockDragLayer} style={this.getItemStyles()}>
                <BlockDragPreview type={this.props.selectedForDragging}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        selectedForDragging: state.appState.selectedForDragging
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setCoordinatesWhenDragging: (data) => dispatch(setCoordinatesWhenDragging(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragLayer(collect)(BlockDragLayer));