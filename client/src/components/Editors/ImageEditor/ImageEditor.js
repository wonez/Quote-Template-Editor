import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateStyles  } from '../../../store'

import classes from './ImageEditor.scss'

import BackgroundImage from '../../Attributes/BackgroundImage/BackgroundImage'
import BackgroundSize from '../../Attributes/BackgroundSize/BackgroundSize'
import BackgroundPosition from '../../Attributes/BackgroundPosition/BackgroundPosition'

class ImageEditor extends Component {

    updateImage = (e) => {
        const reader = new FileReader();
        reader.onload = (data) => {
            this.props.updateStyles({...this.props.selectedForEditing}, {
                key: 'backgroundImage',
                val: data.target.result
            })
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    updatePosition = value => {
        this.props.updateStyles({...this.props.selectedForEditing}, {
            key: 'backgroundPosition',
            val: value,
        })
    }

    updateSize = value => {
        this.props.updateStyles({...this.props.selectedForEditing}, {
            key: 'backgroundSize',
            val: value,
        })
    }

    render() {
        return (
            <div className={classes.ImageEditor}>
              <BackgroundImage changeHandler={this.updateImage} />  
              <BackgroundSize changeHandler={this.updateSize} value={this.props.styles.backgroundSize} />  
              <BackgroundPosition changeHandler={this.updatePosition} value={this.props.styles.backgroundPosition} />  
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageEditor);