import { LOGIN, LOGOUT } from '../types/authTypes'

const initialState = {
    isLogged: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN: return {
            ...state,
            isLogged: true
        }
        case LOGOUT: return {
            ...state,
            isLogged: false
        }
        default: 
            return state;
    }
}

export default reducer;