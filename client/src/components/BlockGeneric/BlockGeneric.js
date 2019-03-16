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

import { getItemType, setFieldDefaults } from '../../helpers'

import { ItemTypes } from '../../dnd/types'
import { DragSource, DropTarget } from 'react-dnd'

import { handleBackground } from '../../helpers'

import classes from './BlockGeneric.scss'

import Heading from '../Blocks/Heading/Heading';
import CoverPage from '../Blocks/CoverPage/CoverPage';
import Paragraph from '../Blocks/Paragraph/Paragraph';
import TermsOfService from '../Blocks/TermsOfService/TermsOfService';
import Image from '../Blocks/Image/Image'
import Table from '../Blocks/Table/Table';
import PricingTable from '../Blocks/PricingTable/PricingTable';


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
			setFieldDefaults(props.selectedForDragging, data.newItem)
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

	getStyles = () => {
		let backgroundStyles = {};
		let style = { 
			...this.props.styles,
			fontSize: this.props.styles.fontSize + 'px',
			top: this.props.y, 
			left: this.props.x, 
		}
		if(this.props.kind == 'Heading'){
			style.height = '10rem';
		}
		if(this.props.kind == 'Cover Page'){
			backgroundStyles = handleBackground(this.props.styles)
		}
		if(this.props.selectedForEditing.id == this.props.id){
			style.outline = '.3rem solid skyblue';
		}
		if(this.props.kind == 'Image'){
			backgroundStyles = handleBackground(this.props.styles)
		}
		return {backgroundStyles, style}
	}

	getItem = (backgroundStyles) => {
		switch(this.props.kind){
			case 'Heading': 
				return <Heading connectDragSource={this.props.connectDragSource}
								deleteItemFromEditor={this.deleteItemFromEditor}
								editorId={this.props.editorId} id={this.props.id}
								children={this.props.children}/>
			case 'Cover Page': 
				return <CoverPage 	styles={backgroundStyles}
									connectDragSource={this.props.connectDragSource}
									deleteItemFromEditor={this.deleteItemFromEditor}
									editorId={this.props.editorId} id={this.props.id}
									children={this.props.children} />
			case 'Paragraph': 
				return <Paragraph 	connectDragSource={this.props.connectDragSource}
									deleteItemFromEditor={this.deleteItemFromEditor}
									editorId={this.props.editorId} id={this.props.id}
									children={this.props.children} />
			case 'Terms Of Service': 
				return <TermsOfService 	connectDragSource={this.props.connectDragSource}
										deleteItemFromEditor={this.deleteItemFromEditor}
										editorId={this.props.editorId} id={this.props.id}
										children={this.props.children} />
			case 'Image': 
				return <Image 	styles={backgroundStyles}
								connectDragSource={this.props.connectDragSource}
								deleteItemFromEditor={this.deleteItemFromEditor}
								editorId={this.props.editorId} id={this.props.id}
								children={this.props.children} />
			case 'Table':
				return <Table 	connectDragSource={this.props.connectDragSource}
								deleteItemFromEditor={this.deleteItemFromEditor}
								table={this.props.table}
								editorId={this.props.editorId} id={this.props.id}
								children={this.props.children} />
			case 'Pricing Table':
				return <PricingTable 	connectDragSource={this.props.connectDragSource}
										deleteItemFromEditor={this.deleteItemFromEditor}
										discount={this.props.discount}
										table={this.props.table}
										editorId={this.props.editorId} id={this.props.id}
										children={this.props.children} />

		}
	}

	render() {
		const styles = this.getStyles()
		return this.props.connectDropTarget(this.props.connectDragPreview(
			<div className={classes.BlockGeneric}
				onClick={this.selectForEditing} 
				style={styles.style}>
				{this.getItem(styles.backgroundStyles)}
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