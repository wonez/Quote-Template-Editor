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
        SET_COORDINATES_WHEN_DRAGGING
    } from '../types/appStateTypes'

const initialState = {
    sideMenu: 'blocks',
    selectedForDragging: '',
    selectedForMoving: {},
    selectedForEditing: {},
    editors:{
        Editor1: {},
        Editor2: {}
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SIDE_MENU_SHOW_BLOCKS: return {
            ...state,
            sideMenu: 'blocks'
        }
        case SIDE_MENU_SHOW_FIELDS: return {
            ...state,
            sideMenu: 'fields'
        }
        case SELECT_FOR_DRAGGING: return {
            ...state,
            selectedForDragging: action.kind
        }
        case UNSELECT_FROM_DRAGGING: return {
            ...state,
            selectedForDragging: ''
        }
        case ADD_ITEM_TO_EDITOR: return {
            ...state,
            editors:{
                ...state.editors,
                [action.data.editorId]: {
                    ...state.editors[action.data.editorId],
                    [action.data.newItem.id]: {
                        ...action.data.newItem
                    }
                }
            }
        }
        case DELETE_ITEM_FROM_EDITOR: 
            let newState = {
                ...state,
                editors:{
                    ...state.editors,
                    [action.data.editorId]: {
                        ...state.editors[action.data.editorId],
                    }
                }
            }
            delete newState.editors[action.data.editorId][action.data.itemId]
            return newState
        case SELECT_FOR_EDITING: return {
            ...state,
            selectedForEditing: action.data
        }
        case UNSELECT_FROM_EDITING: return {
            ...state,
            selectedForEditing: {}
        }
        case SELECT_FOR_MOVING: return{
            ...state,
            selectedForMoving: action.data
        }
        case UNSELECT_FROM_MOVING: return{
            ...state,
            selectedForMoving: {}
        }
        case MOVE_ITEM_INSIDE_EDITOR:
        let data = {
            newX: state.editors[state.selectedForMoving.editorId][state.selectedForMoving.itemId].x + action.data.x,
            newY: state.editors[state.selectedForMoving.editorId][state.selectedForMoving.itemId].y + action.data.y,
        }
        return {
            ...state,
            editors:{
                ...state.editors,
                [state.selectedForMoving.editorId]: {
                    ...state.editors[state.selectedForMoving.editorId],
                    [state.selectedForMoving.itemId]: {
                        ...state.editors[state.selectedForMoving.editorId][state.selectedForMoving.itemId],
                        x: data.newX,
                        y: data.newY
                    }
                }
            }
        }
        // case SET_COORDINATES_WHEN_DRAGGING: return{
        //     ...state,
        //     draggingX: action.data.x,
        //     draggingY: action.data.y
        // }
        default: 
            return state;
    }
}

export default reducer;