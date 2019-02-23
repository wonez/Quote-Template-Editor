export const changeSingleField = (oldState, fieldName, newValue) => ({
    ...oldState,
    [fieldName]: newValue
})

export const addItemToEditor = (oldState, data) => ({
    ...oldState,
    editors:{
        ...oldState.editors,
        [data.editorId]: {
            ...oldState.editors[data.editorId],
            [data.newItem.id]: {
                ...data.newItem
            }
        }
    }
})

export const deleteItemFromEditor = (oldState, data) => {
    let newState = {
        ...oldState,
        editors:{
            ...oldState.editors,
            [data.editorId]: {
                ...oldState.editors[data.editorId],
            }
        }
    }
    delete newState.editors[data.editorId][data.itemId]
    return newState
}

export const moveItemInsideEditor = (oldState, coords) => {
    let newCoords = {
        newX: oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.itemId].x + coords.x,
        newY: oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.itemId].y + coords.y,
    }
    return {
        ...oldState,
        editors:{
            ...oldState.editors,
            [oldState.selectedForMoving.editorId]: {
                ...oldState.editors[oldState.selectedForMoving.editorId],
                [oldState.selectedForMoving.itemId]: {
                    ...oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.itemId],
                    x: newCoords.newX,
                    y: newCoords.newY
                }
            }
        }
    }
}

export const addFieldToBlock = (oldState, data) => {
    return{
        ...oldState,
        editors:{
            ...oldState.editors,
            [data.editorId]: {
                ...oldState.editors[data.editorId],
                [data.blockId]:{
                    ...oldState.editors[data.editorId][data.blockId],
                    children: {
                        ...oldState.editors[data.editorId][data.blockId].children,
                        [data.newItem.id]: {
                            ...data.newItem
                        }
                    }
                }   
            }
        }
    }
}

export const moveFieldInsideBlock = (oldState, coords) => {
    let newCoords = {
        newX: oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.blockId].children[oldState.selectedForMoving.itemId].x + coords.x,
        newY: oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.blockId].children[oldState.selectedForMoving.itemId].y + coords.y,
    }
    return {
        ...oldState,
        editors:{
            ...oldState.editors,
            [oldState.selectedForMoving.editorId]: {
                ...oldState.editors[oldState.selectedForMoving.editorId],
                [oldState.selectedForMoving.blockId]: {
                    ...oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.blockId],
                    children: {
                        ...oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.blockId].children,
                        [oldState.selectedForMoving.itemId]:{
                            ...oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.blockId].children[oldState.selectedForMoving.itemId],
                            x: newCoords.newX,
                            y: newCoords.newY
                        }
                    }
                }
            }
        }
    }
}

export const deleteFieldFromBlock = (oldState, data) => {
    let newState = {
        ...oldState,
        editors:{
            ...oldState.editors,
            [data.editorId]: {
                ...oldState.editors[data.editorId],
                [data.blockId]: {
                    ...oldState.editors[data.editorId][data.blockId],
                    children: {
                        ...oldState.editors[data.editorId][data.blockId].children,
                    }
                }
            }
        }
    }
    delete newState.editors[data.editorId][data.blockId].children[data.itemId]
    return newState
}

export const pageBreak = (oldState, editorId) => {
    const editors = {};
    for(let key in oldState.editors){
        editors[key] = oldState.editors[key];
        if(key == editorId){
            editors[`Editor${Date.now()}`] = {}
        }
    }
    return{
        ...oldState,
        editors
    }
} 

export const updateValue = (oldState, identifier, value) => {
    const newState = {
        ...oldState,
        editors: {
            ...oldState.editors,
            [identifier.editorId]: {
                ...oldState.editors[identifier.editorId]
            }
        }
    }
    if(identifier.blockId){//if in block
        newState.editors[identifier.editorId][identifier.blockId] = {
            ...oldState.editors[identifier.editorId][identifier.blockId],
            children: {
                ...oldState.editors[identifier.editorId][identifier.blockId].children,
                [identifier.id]: {
                    ...oldState.editors[identifier.editorId][identifier.blockId].children[identifier.id],                    
                    value
                }
            } 
        }
    }else{// if not in block
        newState.editors[identifier.editorId][identifier.id] = {
            ...oldState.editors[identifier.editorId][identifier.id],
            value
        }
    }
    return newState;
} 


export const updateStyles = (oldState, identifier, value) => {
    return {
        ...oldState,
        editors:{
            ...oldState.editors,
            [identifier.editorId]: {
                ...oldState.editors[identifier.editorId],
                [identifier.id]: {
                    ...oldState.editors[identifier.editorId][identifier.id],
                    styles:{
                        ...oldState.editors[identifier.editorId][identifier.id].styles,
                        [value.key]: value.val
                    }
                }
            }
        }
    }
}