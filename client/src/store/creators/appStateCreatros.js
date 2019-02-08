import { SIDE_MENU_SHOW_FIELDS, 
        SIDE_MENU_SHOW_BLOCKS,
        SELECT_FOR_DRAGGING, 
        UNSELECT_FOR_DRAGGING, 
        ADD_ITEM_TO_EDITOR,
        DELETE_ITEM_FROM_EDITOR,
        SELECT_FOR_EDITING,
        UNSELECT_FROM_EDITING
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

export const unselectForDragging = () => {
    return {
        type: UNSELECT_FOR_DRAGGING
    }
}

export const addItemToEditor = (data) => {
    return {
        type: ADD_ITEM_TO_EDITOR,
        data
    }
}

export const deleteItemFromEditor = (id) => {
    return {
        type: DELETE_ITEM_FROM_EDITOR,
        id
    }
}

export const selectForEditing = (id) => {
    return{
        type: SELECT_FOR_EDITING,
        id
    }
}

export const unselectFromEditing = () => {
    return{
        type: UNSELECT_FROM_EDITING
    }
}