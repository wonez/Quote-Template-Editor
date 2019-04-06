import React, { Component } from 'react';
import { connect } from 'react-redux'

import { createTermsOfService, getSingleTermsOfService, updateTermsOfService } from '../../store'

import Loading from '../../components/Loading/Loading'

import classes from './TermsOfServiceModifier.scss'

class TermsOfServiceModifier extends Component {

    state = {
        title: '',
        text: ''
    }

    componentDidMount(){
        let id = this.props.location.search.substr(4)
        if(id){ //editing
            getSingleTermsOfService(id)
                .then(res => {
                    if(res._id){
                        this.setState({
                            title: res.title,
                            text: res.text,
                            id: res._id
                        })
                    }else{
                        close();
                    }
                })
        }
    }

    updateText = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    updateTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    save = () => {
        if(this.state.text && this.state.title){
            if(this.state.id){
                updateTermsOfService(this.state.id, this.state.text, this.state.title)
            }else{
                createTermsOfService(this.state.text, this.state.title)
            }
        }
    }

    render() {
        return (
            <div className={classes.TermsOfServiceModifier}>
                <h1>Terms Of Service</h1>
                <input value={this.state.title} onChange={this.updateTitle} type="text" placeholder="Title"></input>
                <textarea placeholder="Terms of Service Text ..." value={this.state.text} onChange={this.updateText}></textarea>
                <div className={classes.Buttons}>
                    <button onClick={close} className={classes.Cancel} >Cancel</button>
                    <button onClick={this.save} className={classes.Save}>Save</button>
                </div>
                <Loading />
            </div>
        );
    }
}

export default connect()(TermsOfServiceModifier);