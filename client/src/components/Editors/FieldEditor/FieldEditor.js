import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateStyles, deleteItemFromEditor  } from '../../../store'

import classes from './FieldEditor.scss'

import FontSize from '../../Attributes/FontSize/FontSize'
import Color from '../../Attributes/Color/Color'
import BackgroundColor from '../../Attributes/BackgroundColor/BackgroundColor'

class FieldEditor extends Component {

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

    updateBackgroundColor = e => {
        this.props.updateStyles({...this.props.selectedForEditing}, {
            key: 'backgroundColor',
            val: e.target.value
        })
    }

    render() {
        return (
            <div className={classes.FieldEditor}>
                <FontSize value={this.props.styles.fontSize} changeHandler={this.updateFont}/>
                <Color value={this.props.styles.color} changeHandler={this.updateColor} />
                <BackgroundColor value={this.props.styles.backgroundColor} changeHandler={this.updateBackgroundColor} />
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
        selectForEditing: () => dispatch(selectedForEditing({}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldEditor);
