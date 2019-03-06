const updateItemInEditor = (state, editorId, id, updateData) => ({
    ...state,
    editors: {
        ...state.editors,
        [editorId]: {
            ...state.editors[editorId],
            [id]: {
                ...state.editors[editorId][id],
                ...updateData
            }
        }
    }
})

const updateChildInBlock = (state, editorId, blockId, id, updateData) => ({
    ...state,
    editors: {
        ...state.editors,
        [editorId]: {
            ...state.editors[editorId],
            [blockId]: {
                ...state.editors[editorId][blockId],
                children: {
                    ...state.editors[editorId][blockId].children,
                    [id]: {
                        ...state.editors[editorId][blockId].children[id],
                        ...updateData
                    }
                }
            }
        }
    }
})

export const changeSingleField = (oldState, fieldName, newValue) => ({
    ...oldState,
    [fieldName]: newValue
})

export const addItemToEditor = (oldState, data) => {
    return updateItemInEditor(oldState, data.editorId, data.newItem.id, data.newItem)
}

export const moveItemInsideEditor = (oldState, coords) => {
    return updateItemInEditor(oldState, oldState.selectedForMoving.editorId, oldState.selectedForMoving.id, {
        x: oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.id].x + coords.x,
        y: oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.id].y + coords.y,
    })
}

export const addFieldToBlock = (oldState, data) => {
    return updateChildInBlock(oldState, data.editorId, data.blockId, data.newItem.id, data.newItem)
}

export const moveFieldInsideBlock = (oldState, coords) => {
    return updateChildInBlock(oldState, oldState.selectedForMoving.editorId, oldState.selectedForMoving.blockId, oldState.selectedForMoving.id, {
        x: oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.blockId].children[oldState.selectedForMoving.id].x + coords.x,
        y: oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.blockId].children[oldState.selectedForMoving.id].y + coords.y,
    })
}

export const deleteItemFromEditor = (oldState, data) => {
    let newState = null;
    if(data.blockId){
        newState = updateChildInBlock(oldState, data.editorId, data.blockId, data.id)
        delete newState.editors[data.editorId][data.blockId].children[data.id]
    }else{
        newState = updateItemInEditor(oldState, data.editorId, data.id)
        delete newState.editors[data.editorId][data.id]
    }
    newState.selectedForEditing = {};
    return newState;
}

export const pageBreak = (oldState, editorId) => {
    const editors = {};
    for(let key in oldState.editors){
        editors[key] = oldState.editors[key];
        if(key == editorId){
            editors[`Editor${Date.now()}`] = {}
        }
    }
    return changeSingleField(oldState, 'editors', editors)
} 

export const updateValue = (oldState, identifier, value) => {
    if(identifier.blockId)
        return updateChildInBlock(oldState, identifier.editorId, identifier.blockId, identifier.id, { value })
    else
        return updateItemInEditor(oldState, identifier.editorId, identifier.id, { value })
} 


export const updateStyles = (oldState, identifier, value) => {
    if(identifier.blockId){
        return updateChildInBlock(oldState, identifier.editorId, identifier.blockId, identifier.id, {
            styles: {
                ...oldState.editors[identifier.editorId][identifier.blockId].children[identifier.id].styles,                        
                [value.key]: value.val
            }
        })
    }else{
        let updateData = {
            styles:{
                ...oldState.editors[identifier.editorId][identifier.id].styles,
                [value.key]: value.val
            }
        }
        if(value.key == 'fontSize' || value.key == 'color'){
            let children = {}
            for(let child in oldState.editors[identifier.editorId][identifier.id].children){
                children[child] = {
                    ...oldState.editors[identifier.editorId][identifier.id].children[child],
                    styles: {
                        ...oldState.editors[identifier.editorId][identifier.id].children[child].styles,
                        [value.key]: value.val
                    }
                }
            }
            updateData.children = children;
        }
        return updateItemInEditor(oldState, identifier.editorId, identifier.id, updateData)
    }
}

export const moveField = (oldState, target) => {
    const source = oldState.selectedForMoving;
    const sourceData = source.blockId ? oldState.editors[source.editorId][source.blockId].children[source.id] : oldState.editors[source.editorId][source.id]
    let newState = null;
    //append field to target
    if(target.blockId){
        newState = updateChildInBlock(oldState, target.editorId, target.blockId, source.id, {
            ...sourceData,
            ...target.coords,
            styles: {
                ...sourceData.styles,
                fontSize: oldState.editors[target.editorId][target.blockId].styles.fontSize,
                color: oldState.editors[target.editorId][target.blockId].styles.color
            }
        })
    }else{
        newState = updateItemInEditor(oldState, target.editorId, source.id, {
            ...sourceData,
            ...target.coords
        })
    }
    //remove field from source
    if(source.blockId){
        newState = updateChildInBlock(newState, source.editorId, source.blockId, source.id)
        delete newState.editors[source.editorId][source.blockId].children[source.id]
    }else{
        newState = updateItemInEditor(newState, source.editorId, source.id)
        delete newState.editors[source.editorId][source.id]
    }
    return changeSingleField(newState, 'selectedForEditing', {})
}

export const handleCheck = (oldState, identifier) => {
    if(identifier.blockId){
        return updateChildInBlock(oldState, identifier.editorId, identifier.blockId, identifier.id, {
            checked: !oldState.editors[identifier.editorId][identifier.blockId].children[identifier.id].checked        
        })
    }
    return updateItemInEditor(oldState, identifier.editorId, identifier.id, {
        checked: !oldState.editors[identifier.editorId][identifier.id].checked
    })
}

export const updateOptions = (oldState, identifier, value) => {
    if(identifier.blockId){
        return updateChildInBlock(oldState, identifier.editorId, identifier.blockId, identifier.id, {
            options: {
                ...oldState.editors[identifier.editorId][identifier.blockId].children[identifier.id].options,              
                [value.id]: value.val
            }
        })
    } else {
        return updateItemInEditor(oldState, identifier.editorId, identifier.id, {
            options: {
                ...oldState.editors[identifier.editorId][identifier.id].options,
                [value.id]: value.val
            }
        })
    }
}

export const addNewOptions = (oldState, identifier) => {
    let newOption = {}
    newOption[`Option ${Date.now()}`] = 'New Option'
    if(identifier.blockId){
        return updateChildInBlock(oldState, identifier.editorId, identifier.blockId, identifier.id, {
            options: {
                ...oldState.editors[identifier.editorId][identifier.blockId].children[identifier.id].options,              
                ...newOption
            } 
        })
    }
    return updateItemInEditor(oldState, identifier.editorId, identifier.id, {
        options: {
            ...oldState.editors[identifier.editorId][identifier.id].options,
            ...newOption
        }
    })
}

export const deleteOptions = (oldState, identifier, id) => {
    let newState = null;
    if(identifier.blockId){
        newState = updateChildInBlock(oldState, identifier.editorId, identifier.blockId, identifier.id, {
            options: {
                ...oldState.editors[identifier.editorId][identifier.blockId].children[identifier.id].options,              
            }
        })
        delete newState.editors[identifier.editorId][identifier.blockId].children[identifier.id].options[id]
    }else{
        newState = updateItemInEditor(oldState, identifier.editorId, identifier.id, {
            options: {
                ...oldState.editors[identifier.editorId][identifier.id].options,
            }
        })
        delete newState.editors[identifier.editorId][identifier.id].options[id]
    }
    return newState;
}

export const updateCell = (oldState, identifier, value) => {
    return updateItemInEditor(oldState, identifier.editorId, identifier.id, {
        table:{
            ...oldState.editors[identifier.editorId][identifier.id].table,
            [identifier.colId]: {
                ...oldState.editors[identifier.editorId][identifier.id].table[identifier.colId],
                cells: {
                    ...oldState.editors[identifier.editorId][identifier.id].table[identifier.colId].cells,
                    [identifier.cellId]: value
                }
            }
        }
    })
}

export const updateColHeader = (oldState, identifier, value) => {
    return updateItemInEditor(oldState, identifier.editorId, identifier.id, {
        table:{
            ...oldState.editors[identifier.editorId][identifier.id].table,
            [identifier.colId]: {
                ...oldState.editors[identifier.editorId][identifier.id].table[identifier.colId],
                header: value
            }
        }
    })
}

export const updateColCount = (oldState, identifier, values) => {
    const table = oldState.editors[identifier.editorId][identifier.id].table;
    let updateData = { table: { }}
    let collKeys = Object.keys(table);
    if(values.new < values.old){
        collKeys = collKeys.slice(0, values.new);
        for(let key of collKeys){
            updateData.table[key] = table[key];
        }
    }else{
        updateData.table = {...table};
        Array(values.new - values.old).fill(null).map((u, i) => {
            updateData.table[`Column ${Date.now()}`] = {...table[collKeys[collKeys.length - 1]] }
        })
    }
    return updateItemInEditor(oldState, identifier.editorId, identifier.id, updateData)
}

export const updateRowCount = (oldState, identifier, values) => {
    const table = oldState.editors[identifier.editorId][identifier.id].table;
    let updateData = { table: { }}
    let collKeys = Object.keys(table);

    if(values.new < values.old){
        for(let colKey of collKeys){
            updateData.table[colKey] = {
                ...table[colKey],
                cells: {}
            }
            let rowKeys = Object.keys(table[colKey].cells).slice(0, values.new)
            for(let rowKey of rowKeys){
                updateData.table[colKey].cells[rowKey] = table[colKey].cells[rowKey]
            }
        }
    }else{
        for(let colKey of collKeys){
            updateData.table[colKey] = {
                ...table[colKey],
                cells: {
                    ...table[colKey].cells
                }
            }
            let rowKeys = Object.keys(table[colKey].cells);
            let lastItem = table[colKey].cells[rowKeys[rowKeys.length-1]]
            Array(values.new - values.old).fill(null).map((u, i) => {
                updateData.table[colKey].cells[`Item ${Date.now()}`] = lastItem
            })
        }
    }

    return updateItemInEditor(oldState, identifier.editorId, identifier.id, updateData)
}