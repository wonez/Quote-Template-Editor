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
