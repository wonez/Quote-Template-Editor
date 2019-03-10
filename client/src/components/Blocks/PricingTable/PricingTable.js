import React, { Component } from 'react';
import { connect } from 'react-redux'

import { updateCell, updateSubtotals, updateDiscount } from '../../../store'

import classes from './PricingTable.scss'

import Toolbar from '../../Toolbar/Toolbar';

class PricingTable extends Component {

    cellChangeHandler = (value, colId, cellId) => {
        if(colId == 'Name'){
            this.props.updateCell({
                editorId: this.props.editorId,
                id: this.props.id,
                colId,
                cellId
            }, value)
        }else if(colId == 'Price'){
            if(isNaN((value * 1).toFixed(2))) return;
            this.props.updateCell({
                editorId: this.props.editorId,
                id: this.props.id,
                colId,
                cellId
            }, (value * 1).toFixed(2))
            this.props.updateSubtotals({editorId: this.props.editorId, id: this.props.id});
        }else if( colId == 'QTY'){
            if(value == '') value = 0;
            else if(isNaN(parseInt(value))) return;

            this.props.updateCell({
                editorId: this.props.editorId,
                id: this.props.id,
                colId,
                cellId
            }, parseInt(value))
            this.props.updateSubtotals({editorId: this.props.editorId, id: this.props.id});
        }
    }

    renderCells = (cells, colId) => {
        return Object.keys(cells).map(id => {
            return <textarea disabled={colId == 'Subtotal'} className={classes.Cell} key={id} value={cells[id]} onChange={(e) => this.cellChangeHandler(e.target.value, colId, id)} /> 
        })
    }

    renderTable = (table) => {
        return Object.keys(table).map(id => {
            return(
                <div className={classes.Column} key={id} >
                    <p className={classes.Header}>{table[id].header}</p>
                    {this.renderCells(table[id].cells, id)}
                </div>
            )
        })
    }

    getSubtotal = () => {
        if(!this.props.table) return '0.00'
        let total = 0.00;
        for(let key in this.props.table['Subtotal'].cells){
            total += parseFloat(this.props.table['Subtotal'].cells[key])
        }
        return total.toFixed(2);
    }

    getDiscount = () => {
        if(!this.props.table) return '0.00'
        return (this.getSubtotal() * this.props.discount / 100).toFixed(2);
    }

    discountHandler = (e) => {
        this.props.updateDiscount({
            editorId: this.props.editorId,
            id: this.props.id,
        }, e.target.value)
    }

    render() {

        let toolbar = (
            <div>
                <Toolbar title="Pricing Table" 
                         deleteItemFromEditor={this.props.deleteItemFromEditor}/>
            </div>
        )

        return (
            <div className={classes.TableBox}>
                {this.props.connectDragSource ? this.props.connectDragSource(toolbar) : toolbar}
                <div className={classes.Table} style={!this.props.id ? { background: 'white' } : null}>
                    {this.props.table ? this.renderTable(this.props.table) : this.renderTable({
                        "Name": {
                            header: 'Name',
                            cells: {
                                'Item 1': 'New Item',
                                'Item 2': 'New Item',
                                'Item 3': 'New Item',
                            }
                        }, 
                        "Price": {
                            header: 'Price',
                            cells: {
                                'Item 1': "0.00",
                                'Item 2': "0.00",
                                'Item 3': "0.00",
                            }
                        }, 
                        "QTY": {
                            header: 'QTY',
                            cells: {
                                'Item 1': "1",
                                'Item 2': "1",
                                'Item 3': "1",
                            }
                        },  
                        "Subtotal": {
                            header: 'Subtotal',
                            cells: {
                                'Item 1': "0.00",
                                'Item 2': "0.00",
                                'Item 3': "0.00",
                            }
                        },  
                    })}
                </div>
                <div className={classes.Total}>
                    <div>
                        <p>Subtotal</p><b>{this.getSubtotal()}</b>
                        <p>Discount (<input type="number" value={this.props.discount != undefined ? this.props.discount : '0' } onChange={ this.props.discount != undefined ? this.discountHandler : ()=>{} } />%)</p><b>-&nbsp;{this.getDiscount()}</b>
                        <p>Total</p><b>{(this.getSubtotal() - this.getDiscount()).toFixed(2)}</b>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCell: (identifier, value) => dispatch(updateCell(identifier, value)),
        updateSubtotals: (identifier) => dispatch(updateSubtotals(identifier)),
        updateDiscount: (identifier, value) => dispatch(updateDiscount(identifier, value))
    }
}

export default connect(null, mapDispatchToProps)(PricingTable);