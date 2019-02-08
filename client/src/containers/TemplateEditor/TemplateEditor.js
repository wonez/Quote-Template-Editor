import React from 'react'
import { connect } from 'react-redux'

import { unselectForDragging, 
        addItemToEditor, 
        deleteItemFromEditor, 
        selectForEditing } from '../../store'

import Heading from '../../components/Blocks/Heading/Heading'

import classes from './TemplateEditor.scss'

class TemplateEditor extends React.Component{

    drop = (e) => {
        if(this.props.selectedForDragging != ''){//Check If dragging
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.props.addItemToEditor({ 
                kind: this.props.selectedForDragging, 
                id: this.props.selectedForDragging + Date.now(),  
                x,
                y 
            })
            this.props.unselectForDragging();
        }
    }

    getCorrespondingItem = (data) => {
        switch(data.kind){
            case 'Heading': return <Heading 
                                        key={data.id}
                                        selectForEditing={() => {this.props.selectForEditing(data.id)}}
                                        deleteItemFromEditor={() => {this.props.deleteItemFromEditor(data.id)}} 
                                        {...data} />
        }
    }

    render(){
        
        return(
            <div className={classes.TemplateEditor} onClick={this.drop}>
                {Object.keys(this.props.items).map( key => (
                    this.getCorrespondingItem(this.props.items[key])
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedForDragging: state.appState.selectedForDragging,
        items: state.appState.items
    }
}

const mapDispatchToProps = dispatch => {
    return{
        unselectForDragging: () => dispatch(unselectForDragging()),
        addItemToEditor: (data) => dispatch(addItemToEditor(data)),
        deleteItemFromEditor: (id) => dispatch(deleteItemFromEditor(id)),
        selectForEditing: id => dispatch(selectForEditing(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateEditor);