import React from 'react'
import { connect } from 'react-redux'
import { updateStyles, updateBlockName  } from '../../../store'
import classes from './TextEditor.scss'

import FontSize from '../../Attributes/FontSize/FontSize'
import Color from '../../Attributes/Color/Color'
import FontFamily from '../../Attributes/FontFamily/FontFamily'
import TextAlign from '../../Attributes/TextAlign/TextAlign'
import BackgroundColor from '../../Attributes/BackgroundColor/BackgroundColor';
import BlockName from '../../Attributes/BlockName/BlockName';

class TextEditor extends React.Component{

    updateBlockName = (e) => {
        this.props.updateBlockName({...this.props.selectedForEditing}, e.target.value)
    }

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

    updateTextAlign = e => {
        this.props.updateStyles({...this.props.selectedForEditing}, {
            key: 'textAlign',
            val: e.target.dataset.val
        })
    }

    updateBackgroundColor = e => {
        this.props.updateStyles({...this.props.selectedForEditing}, {
            key: 'backgroundColor',
            val: e.target.value
        })
    }
    
    render(){
        return(
            <div className={classes.TextEditor}>
                <BlockName value={this.props.blockName} changeHandler={this.updateBlockName} />
                <FontSize value={this.props.styles.fontSize} changeHandler={this.updateFont}/>
                <Color value={this.props.styles.color} changeHandler={this.updateColor} />
                <FontFamily value={this.props.styles.fontFamily} changeHandler={this.updateFontFamily} />
                <TextAlign value={this.props.styles.textAlign} changeHandler={this.updateTextAlign} />
                <BackgroundColor value={this.props.styles.backgroundColor} changeHandler={this.updateBackgroundColor} />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        styles: state.appState.editors[props.selectedForEditing.editorId][props.selectedForEditing.id].styles,
        blockName: state.appState.editors[props.selectedForEditing.editorId][props.selectedForEditing.id].blockName
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateStyles: (identifier, value) => dispatch(updateStyles(identifier, value)),
        updateBlockName: (identifier, blockName) => dispatch(updateBlockName(identifier, blockName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);