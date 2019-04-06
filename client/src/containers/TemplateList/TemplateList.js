import React from 'react'
import { connect } from 'react-redux'
import { getUserTemplates, createNewTemplate, removeUserTemplate, renameUserTemplate, getSingleTemplate } from '../../store'

import classes from './TemplateList.scss'

class TemplateList extends React.Component{

    state = {
        selected: null,
        renaming: false,
        title: ''
    }

    setSelected = template => {
        this.props.getSingleTemplate(template._id);
        this.setState({selected: template._id, renaming: false, title: template.title})
    }

    renamingHandler = (id) => {
        if(this.state.renaming){
            this.props.renameUserTemplate(id, this.state.title)
            this.setState({ renaming: false })
        }else{
            this.setState({ renaming: true })
        }
    }

    titleHandler = (e) => {
        this.setState({
            title: e.target.value   
        })
    }

    componentDidMount(){
        this.props.getUserTemplates();
    }

    renderTemplates = () => {
        return this.props.templates.map(template => {
            let selected = this.state.selected == template._id;
            let title = (
                <p className={selected ? classes.Selected : null} onClick={() => this.setSelected(template)}>{template.title}</p>
            )
            if(this.state.renaming && selected){
                title = (
                    <input className={classes.TitleInput} type="text" value={this.state.title} onChange={this.titleHandler} />
                )
            }
            return (
                <div className={classes.Title} key={template._id}>
                    {title}
                    {this.state.selected == template._id ? (
                        <div className={classes.Buttons}>
                            <a onClick={() => this.props.removeUserTemplate(template._id)}>Delete</a>
                            <a onClick={() => this.renamingHandler(template._id)}>{this.state.renaming ? "Confirm" : "Rename"}</a>
                        </div>
                    ) : null}
                </div>
            )
        })
    }

    render(){
        return(
            <div className={classes.TemplateList}>
                <button className={classes.CreateNew} onClick={this.props.createNewTemplate } >Create New +</button>
                { this.props.templates.length ? this.renderTemplates() : <p>No saved templates</p> }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        templates: state.appState.templates,
        editors: state.appState.editors
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getUserTemplates: () => dispatch(getUserTemplates()),
        createNewTemplate: () => dispatch(createNewTemplate()),
        removeUserTemplate: (id) => dispatch(removeUserTemplate(id)),
        renameUserTemplate: (id, title) => dispatch(renameUserTemplate(id, title)),
        getSingleTemplate: id => dispatch(getSingleTemplate(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList);