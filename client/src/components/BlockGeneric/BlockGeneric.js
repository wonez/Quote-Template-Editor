import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux';

import { selectForMoving, unselectFromMoving, addFieldToBlock, moveFieldInsideBlock, deleteFieldFromBlock, deleteItemFromEditor } from '../../store'

import KindToDom from '../KindToDom/KindToDom'

import { ItemTypes } from '../../dnd/types'
import { DragSource, DropTarget } from 'react-dnd'

import classes from './BlockGeneric.scss'

const source = {
	beginDrag(props, monitor, component) {
		props.selectForMoving({ itemId: props.id, editorId: props.editorId });
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

const collectDrop = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver({ shallow: false })
	};
}

const target = {
	drop(props, monitor, component) {
		if (props.selectedForDragging != '') { // Adding field to block
			calculatePositionAndAddFieldToBlock(props.addFieldToBlock, monitor.getClientOffset(), component, {
				kind: props.selectedForDragging,
				blockId: props.id,
				editorId: props.editorId,
				value: 'Text'
			})
		} else { 
			try{ //Move field inside block
				if (props.children[props.selectedForMoving.itemId]) {
					props.moveFieldInsideBlock(monitor.getDifferenceFromInitialOffset());
				} else {
					throw new Error();
				}
			} catch(err) { // Move field
				calculatePositionAndAddFieldToBlock(props.addFieldToBlock, monitor.getSourceClientOffset(), component, {
					kind: props.selectedForMoving.kind,
					blockId: props.id,
					editorId: props.editorId,
					value: props.selectedForMoving.value
				})
				if(props.selectedForMoving.blockId){//Move field from block to block	
					props.deleteFieldFromBlock(props.selectedForMoving);
				}else{//Move field from template to block
					props.deleteItemFromEditor(props.selectedForMoving)
				}		
			}
		}
	}
};

const calculatePositionAndAddFieldToBlock = (addFieldToBlock, client, component, data) => {
	const target = findDOMNode(component).getBoundingClientRect();
	let x = client.x - target.x;
	let y = client.y - target.y - 20; //-2rem 
	addFieldToBlock({
		editorId: data.editorId,
		blockId: data.blockId,
		newItem: {
			kind: data.kind,
			id: data.kind + Date.now(),
			value: data.value,
			x,
			y,
		}
	})
}

class BlockGeneric extends React.Component {
	render() {
		let style = { 
			top: this.props.y, 
			left: this.props.x, 
			...this.props.style 
		}
		if(this.props.kind == 'Heading'){
			style.height = '10rem';
		}
		if(this.props.kind == 'Cover Page'){
			style.height = "95%";
		}
		return this.props.connectDropTarget(this.props.connectDragPreview(
			<div className={classes.BlockGeneric} style={style}>
				<KindToDom 
					kind={this.props.kind}
					type={this.props.type}
					editorId={this.props.editorId}
					id={this.props.id}
					connectDragSource={this.props.connectDragSource}
					selectForEditing={this.props.selectForEditing}
					deleteItemFromEditor={() => this.props.deleteItemFromEditor({editorId: this.props.editorId, itemId: this.props.id})}
					children={this.props.children} />
			</div>
		))
	}
}

const mapDispatchToProps = dispatch => {
	return {
		selectForMoving: (data) => dispatch(selectForMoving(data)),
		unselectFromMoving: () => dispatch(unselectFromMoving()),
		addFieldToBlock: data => dispatch(addFieldToBlock(data)),
		moveFieldInsideBlock: coords => dispatch(moveFieldInsideBlock(coords)),
		deleteFieldFromBlock: data => dispatch(deleteFieldFromBlock(data)),
		deleteItemFromEditor: data => dispatch(deleteItemFromEditor(data))
	}
}

const mapStateToProps = state => {
	return {
		selectedForDragging: state.appState.selectedForDragging,
		selectedForMoving: state.appState.selectedForMoving
	}
}

let Block = DropTarget([ItemTypes.FIELD_SELECTOR, ItemTypes.GENERIC_FIELD], target, collectDrop)(BlockGeneric)
Block = DragSource(ItemTypes.GENERIC_BLOCK, source, collect)(Block)

export default connect(mapStateToProps, mapDispatchToProps)(Block);