import React from 'react'

import { connect } from 'react-redux'

import classes from './BlockDragLayer.scss'

import BlockDragPreview from '../BlockDragPreview/BlockDragPreview'

import { setCoordinatesWhenDragging } from '../../store'

import { DragLayer } from 'react-dnd';
import KindToDom from '../KindToDom/KindToDom'


const collect = (monitor, props) => {
    if(!props.selectedForDragging){
        return {
            itemType: monitor.getItemType(),
            isDragging: monitor.isDragging()
        }
    }
    return{
        itemType: monitor.getItemType(),
        currentOffset: monitor.getClientOffset(),
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
            top: y + 1,
            left: x + 1
        };
    }

    render(){

        if(!this.props.isDragging){
            return null
        }

        let style = this.getItemStyles();

        if(this.props.selectedForDragging == 'Cover Page'){
            style.height = "85%";
        }

        return (
            <div className={classes.BlockDragLayer} style={style}>
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