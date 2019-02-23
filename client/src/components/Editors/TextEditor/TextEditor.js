import React from 'react'
import { connect } from 'react-redux'
import { updateStyles  } from '../../../store'
import classes from './TextEditor.scss'

import FontSize from '../../Attributes/FontSize/FontSize'
import Color from '../../Attributes/Color/Color'
import FontFamily from '../../Attributes/FontFamily/FontFamily'
import TextAlign from '../../Attributes/TextAlign/TextAlign'

class TextEditor extends React.Component{

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
    
    render(){
        return(
            <div className={classes.TextEditor}>
                <FontSize value={this.props.styles.fontSize} changeHandler={this.updateFont}/>
                <Color value={this.props.styles.color} changeHandler={this.updateColor} />
                <FontFamily value={this.props.styles.fontFamily} changeHandler={this.updateFontFamily} />
                <TextAlign value={this.props.styles.textAlign} changeHandler={this.updateTextAlign} />
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);