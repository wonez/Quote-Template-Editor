import { SIDE_MENU_SHOW_FIELDS, 
        SIDE_MENU_SHOW_BLOCKS,
        SELECT_FOR_DRAGGING, 
        UNSELECT_FROM_DRAGGING, 
        ADD_ITEM_TO_EDITOR,
        DELETE_ITEM_FROM_EDITOR,
        SELECT_FOR_EDITING,
        UNSELECT_FROM_EDITING,
        MOVE_ITEM_INSIDE_EDITOR,
        SELECT_FOR_MOVING,
        UNSELECT_FROM_MOVING,
        ADD_FIELD_TO_BLOCK,
        MOVE_FIELD_INSIDE_BLOCK,
        MOVE_FIELD,
        PAGE_BREAK,
        UPDATE_VALUE,
        UPDATE_STYLES,
        HANDLE_CHECK,
        UPDATE_OPTIONS,
        ADD_NEW_OPTIONS,
        DELETE_OPTIONS,
        UPDATE_CELL,
        UPDATE_COL_HEADER,
        UPDATE_COL_COUNT,
        UPDATE_ROW_COUNT,
        UPDATE_SUBTOTALS,
        UPDATE_DISCOUNT
    } from '../types/appStateTypes'

export const showBLocks = () => {
    return {
        type: SIDE_MENU_SHOW_BLOCKS
    }
}

export const showFields = () => {
    return{
        type: SIDE_MENU_SHOW_FIELDS
    }
}

export const selectForDragging = (kind) => {
    return {
        type: SELECT_FOR_DRAGGING,
        kind
    }
}

export const unselectFromDragging = () => {
    return {
        type: UNSELECT_FROM_DRAGGING
    }
}

export const addItemToEditor = (data) => {
    return {
        type: ADD_ITEM_TO_EDITOR,
        data
    }
}

export const deleteItemFromEditor = (data) => {
    return {
        type: DELETE_ITEM_FROM_EDITOR,
        data
    }
}

export const selectForEditing = (data) => {
    return{
        type: SELECT_FOR_EDITING,
        data
    }
}

export const unselectFromEditing = () => {
    return{
        type: UNSELECT_FROM_EDITING
    }
}

export const moveItemInsideEditor = (data) => {
    return {
        type: MOVE_ITEM_INSIDE_EDITOR,
        data
    }
}

export const selectForMoving = (data) => {
    return {
        type: SELECT_FOR_MOVING,
        data
    }
}
export const unselectFromMoving = (data) => {
    return {
        type: UNSELECT_FROM_MOVING,
        data
    }
}

export const addFieldToBlock = data => {
    return {
        type: ADD_FIELD_TO_BLOCK,
        data
    }
}

export const moveFieldInsideBlock = coords => {
    return {
        type: MOVE_FIELD_INSIDE_BLOCK,
        coords
    }
}

export const pageBreak = editorId => {
    return {
        type: PAGE_BREAK,
        editorId
    }
}

export const updateValue =(identifier, value) => {
    return{
        type: UPDATE_VALUE,
        identifier,
        value
    }
}

export const updateStyles = (identifier, value) => {
    return{
        type: UPDATE_STYLES,
        identifier,
        value
    }
}

export const moveField = target => {
    return{
        type: MOVE_FIELD,
        target
    }
}

export const handleCheck = target => {
    return {
        type: HANDLE_CHECK,
        target
    }
}

export const updateOptions = (identifier, value) => {
    return {
        type: UPDATE_OPTIONS,
        identifier,
        value
    }
}

export const addNewOptions = (identifier) => {
    return {
        type: ADD_NEW_OPTIONS,
        identifier
    }
}

export const deleteOptions = (identifier, id) => {
    return {
        type: DELETE_OPTIONS,
        identifier,
        id
    }
}

export const updateCell = (identifier, value) => {
    return {
        type: UPDATE_CELL,
        identifier,
        value
    }
}

export const updateColHeader = (identifier, value) => {
    return {
        type: UPDATE_COL_HEADER,
        identifier,
        value
    }
}

export const updateColCount = (identifier, values) => {
    return {
        type: UPDATE_COL_COUNT,
        identifier,
        values
    }
}

export const updateRowCount = (identifier, values) => {
    return {
        type: UPDATE_ROW_COUNT,
        identifier,
        values
    }
}

export const updateSubtotals = identifier => {
    return {
        type: UPDATE_SUBTOTALS,
        identifier
    }
}

export const updateDiscount = (identifier, value) => {
    return{
        type: UPDATE_DISCOUNT,
        identifier,
        value
    }
}