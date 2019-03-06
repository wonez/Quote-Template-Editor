import React from 'react';
import { connect } from 'react-redux'

import { updateRowCount, updateColCount } from '../../../store'

import classes from './RowsAndColumns.scss'

class RowsAndColumns extends React.Component {

    rowsChangeHandler = (num) => {

        let old = Object.keys(this.props.table[Object.keys(this.props.table)[0]].cells).length
        if(old + num < 1) return;

        this.props.updateRowCount(this.props.selectedForEditing, {
            old,
            new: old + num
        })
    }
    
    columnsChangeHandler = (num) => {
        
        let old = Object.keys(this.props.table).length;
        if(old + num < 1) return;

        this.props.updateColCount(this.props.selectedForEditing, {
            old,
            new: old + num
        })
    }

    render() {
        return (
            <div className={classes.RowsAndColumns}>
                <div className={classes.Rows}>
                    <p>Rows: </p>
                    <div>
                        <button onClick={() => this.rowsChangeHandler(-1)}>-</button>
                        <p>{Object.keys(this.props.table[Object.keys(this.props.table)[0]].cells).length}</p>
                        <button onClick={() => this.rowsChangeHandler(1)}>+</button>
                    </div>
                </div>
                <div className={classes.Columns}>
                    <p>Columns: </p>
                    <div>
                        <button onClick={() => this.columnsChangeHandler(-1)}>-</button>
                        <p>{Object.keys(this.props.table).length} </p>
                        <button onClick={() => this.columnsChangeHandler(1)}>+</button>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    return {
        table: state.appState.editors[props.selectedForEditing.editorId][props.selectedForEditing.id].table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateColCount: (identifier, values) => dispatch(updateColCount(identifier, values)),
        updateRowCount: (identifier, values) => dispatch(updateRowCount(identifier, values)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RowsAndColumns);