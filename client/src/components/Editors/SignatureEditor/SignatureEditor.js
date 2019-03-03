import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteItemFromEditor, updateStyles } from '../../../store'

import Color from '../../Attributes/Color/Color';
import BackgroundColor from '../../Attributes/BackgroundColor/BackgroundColor';
// import 

import classes from './SignatureEditor.scss'
import LineWidth from '../../Attributes/LineWidth/LineWidth';

class SignatureEditor extends Component {

    updateColor = (e) => {
        this.props.updateStyles({...this.props.selectedForEditing}, {
            key: 'color',
            val: e.target.value
        })
    }

    updateBackgroundColor = e => {
        this.props.updateStyles({...this.props.selectedForEditing}, {
            key: 'backgroundColor',
            val: e.target.value
        })
    }

    updateLineWidth = (e) => {
        this.props.updateStyles({...this.props.selectedForEditing}, {
            key: 'lineWidth',
            val: e.target.value
        })
    }

    render() {
        return (
            <div className={classes.SignatureEditor}>
                <Color value={this.props.styles.color} changeHandler={this.updateColor} />
                <BackgroundColor value={this.props.styles.backgroundColor} changeHandler={this.updateBackgroundColor} />
                <LineWidth value={this.props.styles.lineWidth} changeHandler={this.updateLineWidth} />
                <button onClick={this.props.delete} className={classes.Delete} >Delete</button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    if(props.selectedForEditing.blockId){
        return{
            styles: state.appState.editors[props.selectedForEditing.editorId][props.selectedForEditing.blockId].children[props.selectedForEditing.id].styles,
        }
    }
    return {
        styles: state.appState.editors[props.selectedForEditing.editorId][props.selectedForEditing.id].styles,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        updateStyles: (identifier, value) => dispatch(updateStyles(identifier, value)),
        delete: () => dispatch(deleteItemFromEditor(props.selectedForEditing)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignatureEditor);