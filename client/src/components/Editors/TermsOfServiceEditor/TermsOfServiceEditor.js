import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom' 

import classes from './TermsOfServiceEditor.scss'

import { getTermsOfService, deleteTermsOfService, setText } from '../../../store'

class TermsOfServiceEditor extends Component {

    componentDidMount(){
        this.getItems()
    }

    state = {
        options: []
    }

    getItems = () => {
        getTermsOfService()
            .then(options => {
                this.setState({
                    options
                })
            })
    }

    selectItem = text => {
        this.props.setText(text)
    }

    deleteItem = id => {
        deleteTermsOfService(id)
            .then(res => {
                this.setState(state => {
                    return {
                        ...state,
                        options: state.options.filter( item => item._id != res._id)
                    }
                })
            })
    }

    renderItem = item => {
        return (
            <div onClick={() => this.selectItem(item.text)} key={item._id} className={classes.Option}>
                <p className={classes.Select}>{item.title}</p>
                <Link target="_blank" className={classes.Edit} to={`/terms-of-service?id=${item._id}`}>&#9998;</Link>
                <p onClick={(e) => {e.stopPropagation(); this.deleteItem(item._id)}} className={classes.Delete}>X</p>
            </div>
        )
    }

    render() {
        return (
            <div className={classes.TermsOfServiceEditor}>
                <p>Terms of Service: </p>
                <div className={classes.ButtonBox}>
                    <Link target="_blank" className={classes.Button} style={{border: "1px solid", flexGrow: 3}} to="/terms-of-service">Add New +</Link>
                    <a onClick={this.getItems} className={classes.Button}>&#8635;</a>
                </div>
                <div className={classes.Options}>
                    {this.state.options.map(option => this.renderItem(option))}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setText: (text) => dispatch(setText(text))
    }
}

export default connect(null, mapDispatchToProps)(TermsOfServiceEditor);