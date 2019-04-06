import { SAVED, TIMEOUT, LOADING, LOADED } from '../types/guiTypes'

const initialState = {
    saved: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SAVED:
            return {
                ...state,
                saved: new Date()
            }
        case TIMEOUT:
            return {
                ...state,
                saved: null
            }
        case LOADING:
            return{
                ...state,
                loading: true,
            }
        case LOADED:
            return{
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

export default reducer;
