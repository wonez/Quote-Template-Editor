import React, { Component } from 'react';
import { connect } from 'react-redux'
import classes from './Table.scss'

import { updateCell, updateColHeader } from '../../../store'

import Toolbar from '../../Toolbar/Toolbar'

class Table extends Component {

    cellChangeHandler = (value, colId, cellId) => {
        this.props.updateCell({
            editorId: this.props.editorId,
            id: this.props.id,
            colId,
            cellId
        }, value)
    }

    headerChaneHandler = (value, colId) => {
        this.props.updateColHeader({
            editorId: this.props.editorId,
            id: this.props.id,
            colId
        }, value)
    }

    renderCells = (cells, colId) => {
        return Object.keys(cells).map(id => {
            return (
                <textarea className={classes.Cell} key={id} value={cells[id]} onChange={(e) => this.cellChangeHandler(e.target.value, colId, id)} />
            )
        })
    }
    
    renderTable = (table) => {
        return Object.keys(table).map(id => {
            return(
                <div className={classes.Column} key={id} >
                    <input className={classes.Header} type="text" value={table[id].header} onChange={e => this.headerChaneHandler(e.target.value, id)} />
                    {this.renderCells(table[id].cells, id)}
                </div>
            )
        })
    }

    render() {
        let toolbar = (
            <div>
                <Toolbar title={"Table"}
                        deleteItemFromEditor={this.props.deleteItemFromEditor} /> 
            </div>
        )
        return (
            <div className={classes.TableBox}>
                {this.props.connectDragSource ? this.props.connectDragSource(toolbar) : toolbar} 
                <div className={classes.Table} style={!this.props.id ? { background: 'white' } : null}>
                    {this.props.table ? this.renderTable(this.props.table) : this.renderTable({
                        "Column 1": {
                            header: 'Column Header',
                            cells: {
                                'Item 1': 'New Item',
                                'Item 2': 'New Item',
                                'Item 3': 'New Item',
                            }
                        }, 
                        "Column 2": {
                            header: 'Column Header',
                            cells: {
                                'Item 4': 'New Item',
                                'Item 5': 'New Item',
                                'Item 6': 'New Item',
                            }
                        }, 
                        "Column 3": {
                            header: 'Column Header',
                            cells: {
                                'Item 7': 'New Item',
                                'Item 8': 'New Item',
                                'Item 9': 'New Item',
                            }
                        },  
                    })}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCell: (identifier, value) => dispatch(updateCell(identifier,value)),
        updateColHeader: (identifier, value) => dispatch(updateColHeader(identifier, value))
    }
}

export default connect(null, mapDispatchToProps)(Table);