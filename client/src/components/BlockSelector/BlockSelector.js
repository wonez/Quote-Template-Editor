import React from 'react'

import { connect } from 'react-redux'
import { selectForDragging } from '../../store'

import classes from './BlockSelector.scss'

const BlockSelector = props => {
    return (
        <button className={classes.BlockSelector} onClick={() => props.selectForDragging(props.kind)}>
            {props.kind}
        </button>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        selectForDragging: (kind) => dispatch(selectForDragging(kind))
    }
}

export default connect(null, mapDispatchToProps)(BlockSelector);