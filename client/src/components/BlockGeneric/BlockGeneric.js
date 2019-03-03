import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux';

import { selectForMoving, 
		unselectFromMoving, 
		addFieldToBlock, 
		moveFieldInsideBlock, 
		deleteItemFromEditor,
		selectForEditing,
		moveField } from '../../store'

import KindToDom from '../KindToDom/KindToDom'

import { ItemTypes } from '../../dnd/types'
import { DragSource, DropTarget } from 'react-dnd'

import classes from './BlockGeneric.scss'

const source = {
	beginDrag(props, monitor, component) {
		props.selectForMoving({ id: props.id, editorId: props.editorId });
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
			
			let data = {
				editorId: props.editorId,
				blockId: props.id,
				newItem: {
					kind: props.selectedForDragging,
					id: props.selectedForDragging + Date.now(),
					type: getItemType(props.selectedForDragging),
					...getCoords(component, monitor.getClientOffset()),
					styles: {
						backgroundColor: '#eeeeee',
						fontSize: props.styles.fontSize,
						color: props.styles.color
					},
				}
			}

			if(props.selectedForDragging == 'Date Input'){
				data.newItem.value = '2019-01-01'
			}else if(props.selectedForDragging == 'Initials Input'){
				data.newItem.value = 'TEXT'
			}else if(props.selectedForDragging == 'Checkbox Input'){
				data.newItem.value = 'Label';
				data.newItem.checked = false;
			}else if(props.selectedForDragging == 'Dropdown Input'){
				data.newItem.options = {
					'Option 1': 'Option 1', 
					'Option 2': 'Option 2', 
					'Option 3': 'Option 3'
				}
			}else if(props.selectedForDragging == 'Signature Input'){
				data.newItem.styles.lineWidth = 5;
				data.newItem.value = ''
			}else{
				data.newItem.value = 'Your Text'
			}
			
			props.addFieldToBlock(data)
		} else { 
			try{ //Move field inside block
				if (props.children[props.selectedForMoving.id]) {
					props.moveFieldInsideBlock(monitor.getDifferenceFromInitialOffset());
				} else {
					throw new Error();
				}
			} catch(err) { // Move field
				props.moveField({
					blockId: props.id,
					editorId: props.editorId,
					coords: getCoords(component, monitor.getSourceClientOffset())
				});
			}
		}
	}
};

const getCoords = (component, client) => {
	const target = findDOMNode(component).getBoundingClientRect();
	let x = client.x - target.x;
	let y = client.y - target.y - 20; //-2rem
	return { x,y }
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
    if(['Checkbox Input', 'Date Input', 'Dropdown Field', 'Initials Input', 'Signature Input', 'Text Input'].indexOf(kind) != -1)
        return 'field'
    return null;
}

class BlockGeneric extends React.Component {

	selectForEditing = (e) => {
		e.stopPropagation();
		this.props.selectForEditing({
			editorId: this.props.editorId,
			id: this.props.id,
			kind: this.props.kind,
			type: this.props.type
		})
	}

	deleteItemFromEditor = (e) => {
		e.stopPropagation();
		this.props.deleteItemFromEditor({
			editorId: this.props.editorId, 
			id: this.props.id
		})
	}

	render() {
		let childStyles = {};
		let style = { 
			top: this.props.y, 
			left: this.props.x, 
			...this.props.styles,
			fontSize: this.props.styles.fontSize + 'px',
		}
		if(this.props.kind == 'Heading'){
			style.height = '10rem';
		}
		if(this.props.kind == 'Cover Page'){
			style.height = "95%";
		}
		if(this.props.selectedForEditing.id == this.props.id){
			style.outline = '.3rem solid skyblue';
		}
		if(this.props.kind == 'Image'){
			childStyles.backgroundImage = `url('${this.props.styles.backgroundImage}')`
			childStyles.backgroundPosition = `${this.props.styles.backgroundPosition[0]}px ${this.props.styles.backgroundPosition[1]}px`
			childStyles.backgroundSize = `${this.props.styles.backgroundSize[0]}px ${this.props.styles.backgroundSize[1]}px`
			childStyles.backgroundRepeat = this.props.styles.backgroundRepeat
		}
		return this.props.connectDropTarget(this.props.connectDragPreview(
			<div className={classes.BlockGeneric}
				onClick={this.selectForEditing} 
				style={style}>
				<KindToDom 
					styles={childStyles}
					kind={this.props.kind}
					type={this.props.type}
					editorId={this.props.editorId}
					id={this.props.id}
					background={this.props.styles.backgroundImage}
					connectDragSource={this.props.connectDragSource}
					deleteItemFromEditor={this.deleteItemFromEditor}
					children={this.props.children} />
			</div>
		))
	}
}

const mapDispatchToProps = dispatch => {
	return {
		selectForMoving: (data) => dispatch(selectForMoving(data)),
		unselectFromMoving: () => dispatch(unselectFromMoving()),
		selectForEditing: (data) => dispatch(selectForEditing(data)),
		addFieldToBlock: data => dispatch(addFieldToBlock(data)),
		moveFieldInsideBlock: coords => dispatch(moveFieldInsideBlock(coords)),
		deleteItemFromEditor: data => dispatch(deleteItemFromEditor(data)),
		moveField: target => dispatch(moveField(target))
	}
}

const mapStateToProps = (state, props) => {
	return {
		selectedForDragging: state.appState.selectedForDragging,
		selectedForMoving: state.appState.selectedForMoving,
		selectedForEditing: state.appState.selectedForEditing,
		styles: state.appState.editors[props.editorId][props.id].styles
	}
}

let Block = DropTarget([ItemTypes.FIELD_SELECTOR, ItemTypes.GENERIC_FIELD], target, collectDrop)(BlockGeneric)
Block = DragSource(ItemTypes.GENERIC_BLOCK, source, collect)(Block)

export default connect(mapStateToProps, mapDispatchToProps)(Block);