import React from 'react'

import { connect } from 'react-redux'

import classes from './GenericDragLayer.scss'

import GenericDragPreview from '../GenericDragPreview/GenericDragPreview'

import { DragLayer } from 'react-dnd';


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

class GenericDragLayer extends React.Component {

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
        if(this.props.selectedForDragging == 'Text Input'){
            style.width = 'auto'
        }

        return (
            <div className={classes.GenericDragLayer} style={style}>
                <GenericDragPreview type={this.props.selectedForDragging}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        selectedForDragging: state.appState.selectedForDragging
    }
}

export default connect(mapStateToProps)(DragLayer(collect)(GenericDragLayer));