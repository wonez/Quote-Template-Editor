import React from 'react'

import FieldSelector from '../FieldSelector/FieldSelector'

const AllFields = (props) => {
    return(
        <div>
            <FieldSelector kind="Text Input" />
            <FieldSelector kind="Date Input" />
            <FieldSelector kind="Initials Input" />
            <FieldSelector kind="Signature Input" />
            <FieldSelector kind="Checkbox Input" />
            <FieldSelector kind="Dropdown Input" />
        </div>
    )
}

export default AllFields;