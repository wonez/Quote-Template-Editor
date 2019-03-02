import React, { Component } from 'react';
import { connect } from 'react-redux'

import { deleteItemFromEditor, updateStyles, updateOptions, addNewOptions, deleteOptions } from '../../../store'

import FontSize from '../../Attributes/FontSize/FontSize';
import Color from '../../Attributes/Color/Color';
import BackgroundColor from '../../Attributes/BackgroundColor/BackgroundColor'
import Options from '../../Attributes/Options/Options'

import classes from './DropdownEditor.scss'

class DropdownEditor extends Component {

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

    updateOptions = (id, val) => {
        this.props.updateOptions({...this.props.selectedForEditing}, {
            id,
            val
        })
    }

    addNewOptions = () => {
        this.props.addNewOptions({...this.props.selectedForEditing});
    }

    deleteOptions = (id) => {
        this.props.deleteOptions({...this.props.selectedForEditing}, id)
    }

    render() {
        return (
            <div className={classes.DropdownEditor}>
                <FontSize value={this.props.styles.fontSize} changeHandler={this.updateFont} />
                <Color value={this.props.styles.color} changeHandler={this.updateColor} />
                <BackgroundColor value={this.props.styles.backgroundColor} changeHandler={this.updateBackgroundColor} />
                <Options options={this.props.options}   addNewOptions={this.addNewOptions}
                                                        deleteOptions={this.deleteOptions}
                                                        changeHandler={this.updateOptions} />
                <button onClick={this.props.delete} className={classes.Delete} >Delete</button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    if(props.selectedForEditing.blockId){
        return{
            options: state.appState.editors[props.selectedForEditing.editorId][props.selectedForEditing.blockId].children[props.selectedForEditing.id].options,
            styles: state.appState.editors[props.selectedForEditing.editorId][props.selectedForEditing.blockId].children[props.selectedForEditing.id].styles,
        }
    }
    return {
        options: state.appState.editors[props.selectedForEditing.editorId][props.selectedForEditing.id].options,
        styles: state.appState.editors[props.selectedForEditing.editorId][props.selectedForEditing.id].styles,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        updateStyles: (identifier, value) => dispatch(updateStyles(identifier, value)),
        delete: () => dispatch(deleteItemFromEditor(props.selectedForEditing)),
        updateOptions: (identifier, value) => dispatch(updateOptions(identifier, value)),
        addNewOptions: (identifier) => dispatch(addNewOptions(identifier)),
        deleteOptions: (identifier,id) => dispatch(deleteOptions(identifier, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownEditor);
