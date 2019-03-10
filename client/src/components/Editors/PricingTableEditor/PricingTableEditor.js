import React, { Component } from 'react';
import { connect } from 'react-redux'

import FontSize from '../../Attributes/FontSize/FontSize';
import Color from '../../Attributes/Color/Color';
import FontFamily from '../../Attributes/FontFamily/FontFamily';
import BackgroundColor from '../../Attributes/BackgroundColor/BackgroundColor';
import TableSize from '../../Attributes/TableSize/TableSize'

import { updateStyles, updateRowCount } from '../../../store'

import classes from './PricingTableEditor.scss'

class PricingTableEditor extends Component {

    updateFont = (e) => {
        this.props.updateStyles({...this.props.selectedForEditing}, {
            key: 'fontSize',
            val: e.target.value
        })
    }

    updateColor = (e) => {
        this.props.updateStyles({...this.props.selectedForEditing}, {
            key: 'color',
            val: e.target.value
        })
    }

    updateFontFamily = (e) => {
        this.props.updateStyles({...this.props.selectedForEditing}, {
            key: 'fontFamily',
            val: e.target.value
        })
    } 

    updateBackgroundColor = e => {
        this.props.updateStyles({...this.props.selectedForEditing}, {
            key: 'backgroundColor',
            val: e.target.value
        })
    }

    rowsChangeHandler = (num) => {
        let old = Object.keys(this.props.table[Object.keys(this.props.table)[0]].cells).length
        if(old + num < 1) return;
        this.props.updateRowCount(this.props.selectedForEditing, {
            old,
            new: old + num
        })
    }

    render() {
        return (
            <div className={classes.PricingTableEditor}>
                <FontSize value={this.props.styles.fontSize} changeHandler={this.updateFont}/>
                <Color value={this.props.styles.color} changeHandler={this.updateColor} />
                <FontFamily value={this.props.styles.fontFamily} changeHandler={this.updateFontFamily} />
                <BackgroundColor value={this.props.styles.backgroundColor} changeHandler={this.updateBackgroundColor} />
                <TableSize title={"Items: "} table={this.props.table} changeHandler={this.rowsChangeHandler} />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        styles: state.appState.editors[props.selectedForEditing.editorId][props.selectedForEditing.id].styles,
        table: state.appState.editors[props.selectedForEditing.editorId][props.selectedForEditing.id].table                
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateStyles: (identifier, value) => dispatch(updateStyles(identifier, value)),
        updateRowCount: (identifier, values) => dispatch(updateRowCount(identifier, values)),        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingTableEditor);