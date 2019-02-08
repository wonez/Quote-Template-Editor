import { SIDE_MENU_SHOW_BLOCKS, 
        SIDE_MENU_SHOW_FIELDS, 
        SELECT_FOR_DRAGGING, 
        UNSELECT_FOR_DRAGGING,
        ADD_ITEM_TO_EDITOR,
        DELETE_ITEM_FROM_EDITOR,
        SELECT_FOR_EDITING,
        UNSELECT_FROM_EDITING
    } from '../types/appStateTypes'

const initialState = {
    sideMenu: 'blocks',
    selectedForDragging: '',
    selectedForEditing: '',
    items: {}
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
        case UNSELECT_FOR_DRAGGING: return {
            ...state,
            selectedForDragging: ''
        }
        case ADD_ITEM_TO_EDITOR: return {
            ...state,
            items: {
                ...state.items,
                [action.data.id]: {
                    ...action.data,
                    children: {}
                }
            }
        }
        case DELETE_ITEM_FROM_EDITOR: 
            let newState = {
                ...state,
                items: {
                    ...state.items,
                }
            }
            delete newState.items[action.id]
            return newState
        case SELECT_FOR_EDITING: return {
            ...state,
            selectedForEditing: action.id
        }
        case UNSELECT_FROM_EDITING: return {
            ...state,
            selectedForEditing: ''
        }
        default: 
            return state;
    }
}

export default reducer;