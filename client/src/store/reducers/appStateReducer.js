import { SIDE_MENU_SHOW_BLOCKS, 
        SIDE_MENU_SHOW_FIELDS, 
        SELECT_FOR_DRAGGING, 
        UNSELECT_FROM_DRAGGING,
        ADD_ITEM_TO_EDITOR,
        DELETE_ITEM_FROM_EDITOR,
        SELECT_FOR_EDITING,
        UNSELECT_FROM_EDITING,
        MOVE_ITEM_INSIDE_EDITOR,
        SELECT_FOR_MOVING,
        UNSELECT_FROM_MOVING,
        MOVE_FIELD_INSIDE_BLOCK,
        ADD_FIELD_TO_BLOCK,
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

import { changeSingleField, 
        addItemToEditor, 
        deleteItemFromEditor,
        moveItemInsideEditor,
        addFieldToBlock,
        moveFieldInsideBlock,
        pageBreak,
        updateValue,
        updateStyles,
        moveField,
        handleCheck,
        updateOptions,
        addNewOptions,
        deleteOptions,
        updateCell,
        updateColHeader,
        updateColCount,
        updateRowCount,
        updateSubtotals,
        updateDiscount
    } from './reducerFunctions'

const initialState = {
    sideMenu: 'blocks',
    selectedForDragging: '',
    selectedForMoving: {},
    selectedForEditing: {},
    editors:{
        Editor1: {}
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SIDE_MENU_SHOW_BLOCKS: 
            return changeSingleField(state, 'sideMenu', 'blocks')
        case SIDE_MENU_SHOW_FIELDS: 
            return changeSingleField(state, 'sideMenu', 'fields')
        case SELECT_FOR_DRAGGING: 
            return changeSingleField(state, 'selectedForDragging', action.kind)
        case UNSELECT_FROM_DRAGGING: 
            return changeSingleField(state, 'selectedForDragging', '') 
        case ADD_ITEM_TO_EDITOR: 
            return addItemToEditor(state, action.data)
        case DELETE_ITEM_FROM_EDITOR: 
            return deleteItemFromEditor(state, action.data)
        case SELECT_FOR_EDITING: 
            return changeSingleField(state, 'selectedForEditing', action.data) 
        case UNSELECT_FROM_EDITING: 
            return changeSingleField(state, 'selectedForEditing', {}) 
        case SELECT_FOR_MOVING: 
            return changeSingleField(state, 'selectedForMoving', action.data) 
        case UNSELECT_FROM_MOVING: 
            return changeSingleField(state, 'selectedForMoving', {}) 
        case MOVE_ITEM_INSIDE_EDITOR:
            return moveItemInsideEditor(state, action.data)
        case ADD_FIELD_TO_BLOCK: 
            return addFieldToBlock(state, action.data)
        case MOVE_FIELD_INSIDE_BLOCK:
            return moveFieldInsideBlock(state, action.coords)
        case PAGE_BREAK:
            return pageBreak(state, action.editorId) 
        case UPDATE_VALUE:
            return updateValue(state, action.identifier, action.value)
        case UPDATE_STYLES: 
            return updateStyles(state, action.identifier, action.value)
        case MOVE_FIELD:
            return moveField(state, action.target)
        case HANDLE_CHECK:
            return handleCheck(state, action.target)
        case UPDATE_OPTIONS: 
            return updateOptions(state, action.identifier, action.value)
        case ADD_NEW_OPTIONS:
            return addNewOptions(state, action.identifier)
        case DELETE_OPTIONS:
            return deleteOptions(state, action.identifier, action.id)
        case UPDATE_CELL:
            return updateCell(state, action.identifier, action.value)
        case UPDATE_COL_HEADER:
            return updateColHeader(state, action.identifier, action.value)
        case UPDATE_COL_COUNT:
            return updateColCount(state, action.identifier, action.values)
        case UPDATE_ROW_COUNT:
            return updateRowCount(state, action.identifier, action.values)
        case UPDATE_SUBTOTALS:
            return updateSubtotals(state, action.identifier)
        case UPDATE_DISCOUNT:
            return updateDiscount(state, action.identifier, action.value)

        default: 
            return state;
    }
}

export default reducer;