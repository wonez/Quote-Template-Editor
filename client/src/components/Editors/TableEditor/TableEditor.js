import React, { Component } from 'react';
import { connect } from 'react-redux'

import FontSize from '../../Attributes/FontSize/FontSize';
import Color from '../../Attributes/Color/Color';
import FontFamily from '../../Attributes/FontFamily/FontFamily';
import BackgroundColor from '../../Attributes/BackgroundColor/BackgroundColor';

import { updateStyles } from '../../../store'

import classes from './TableEditor.scss'
import RowsAndColumns from '../../Attributes/RowsAndColumns/RowsAndColumns';

class TableEditor extends Component {

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

    render() {
        return (
            <div className={classes.TableEditor}>
                <FontSize value={this.props.styles.fontSize} changeHandler={this.updateFont}/>
                <Color value={this.props.styles.color} changeHandler={this.updateColor} />
                <FontFamily value={this.props.styles.fontFamily} changeHandler={this.updateFontFamily} />
                <BackgroundColor value={this.props.styles.backgroundColor} changeHandler={this.updateBackgroundColor} />
                <RowsAndColumns selectedForEditing={this.props.selectedForEditing} />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        styles: state.appState.editors[props.selectedForEditing.editorId][props.selectedForEditing.id].styles
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateStyles: (identifier, value) => dispatch(updateStyles(identifier, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableEditor);