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

export const moveItemInsideEditor = (oldState, coords) => {
    let newCoords = {
        newX: oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.id].x + coords.x,
        newY: oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.id].y + coords.y,
    }
    return {
        ...oldState,
        editors:{
            ...oldState.editors,
            [oldState.selectedForMoving.editorId]: {
                ...oldState.editors[oldState.selectedForMoving.editorId],
                [oldState.selectedForMoving.id]: {
                    ...oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.id],
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
        newX: oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.blockId].children[oldState.selectedForMoving.id].x + coords.x,
        newY: oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.blockId].children[oldState.selectedForMoving.id].y + coords.y,
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
                        [oldState.selectedForMoving.id]:{
                            ...oldState.editors[oldState.selectedForMoving.editorId][oldState.selectedForMoving.blockId].children[oldState.selectedForMoving.id],
                            x: newCoords.newX,
                            y: newCoords.newY
                        }
                    }
                }
            }
        }
    }
}

export const deleteItemFromEditor = (oldState, data) => {
    let newState = {
        ...oldState,
        selectedForEditing: {},
        editors:{
            ...oldState.editors,
            [data.editorId]: {
                ...oldState.editors[data.editorId],
            }
        }
    }
    if(oldState.selectedForEditing.id == data.id){
        newState.selectedForEditing = {}
    }
    if(data.blockId){
        newState.editors[data.editorId][data.blockId] = {
            ...oldState.editors[data.editorId][data.blockId],
            children: {
                ...oldState.editors[data.editorId][data.blockId].children,
            }
        }
        delete newState.editors[data.editorId][data.blockId].children[data.id]
    }else{
        delete newState.editors[data.editorId][data.id]
    }
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
    const newState = {
        ...oldState,
        editors:{
            ...oldState.editors,
            [identifier.editorId]: {
                ...oldState.editors[identifier.editorId],
            }
        }
    }
    if(identifier.blockId){
        newState.editors[identifier.editorId][identifier.blockId] = {
            ...oldState.editors[identifier.editorId][identifier.blockId],
            children: {
                ...oldState.editors[identifier.editorId][identifier.blockId].children,
                [identifier.id]: {
                    ...oldState.editors[identifier.editorId][identifier.blockId].children[identifier.id],
                    styles:{
                        ...oldState.editors[identifier.editorId][identifier.blockId].children[identifier.id].styles,                        
                        [value.key]: value.val
                    }
                }
            }
        }
    }else{
        newState.editors[identifier.editorId][identifier.id] = {
            ...oldState.editors[identifier.editorId][identifier.id],
            styles:{
                ...oldState.editors[identifier.editorId][identifier.id].styles,
                [value.key]: value.val
            }
        }
        // apply changes to children
        if(value.key == 'fontSize' || value.key == 'color'){
            const children = {}
            for(let child in oldState.editors[identifier.editorId][identifier.id].children){
                children[child] = {
                    ...oldState.editors[identifier.editorId][identifier.id].children[child],
                    styles: {
                        ...oldState.editors[identifier.editorId][identifier.id].children[child].styles,
                        [value.key]: value.val
                    }
                }
            }
            newState.editors[identifier.editorId][identifier.id].children = children; 
        } 
    }
    return newState
}

export const moveField = (oldState, target) => {
    const source = oldState.selectedForMoving;
    const sourceData = source.blockId ? oldState.editors[source.editorId][source.blockId].children[source.id] : oldState.editors[source.editorId][source.id]
    const newState = {
        ...oldState,
        selectedForEditing: {},
        editors: { ...oldState.editors }
    }
    if(target.blockId){ 
        newState.editors[target.editorId] = {
            ...oldState.editors[target.editorId],
            [target.blockId]: {
                ...oldState.editors[target.editorId][target.blockId],
                children: {
                    ...oldState.editors[target.editorId][target.blockId].children,
                    [source.id]: {
                        ...sourceData,
                        ...target.coords,
                        styles: {
                            ...sourceData.styles,
                            fontSize: oldState.editors[target.editorId][target.blockId].styles.fontSize,
                            color: oldState.editors[target.editorId][target.blockId].styles.color
                        }
                    }
                }
            }
        }
    }else{
        newState.editors[target.editorId] = {
            ...oldState.editors[target.editorId],
            [source.id]: {
                ...sourceData,
                ...target.coords,
            }
        }
    }
    if(source.blockId){
        newState.editors[source.editorId] = {
            ...newState.editors[source.editorId],
            [source.blockId]: {
                ...newState.editors[source.editorId][source.blockId],
                children: {
                    ...newState.editors[source.editorId][source.blockId].children,
                }
            }
        }
        delete newState.editors[source.editorId][source.blockId].children[source.id]
    }else{
        newState.editors[source.editorId] = {
            ...newState.editors[source.editorId],
        }
        delete newState.editors[source.editorId][source.id]
    }
    return newState
}