export const SET_OPEN_SNACK_BASE = 'SET_OPEN_SNACK_BASE'
export const SET_CLOSE_SNACK_BASE = 'SET_CLOSE_SNACK_BASE'
 
const initialState = {   
    opened: false,
    text: ''
}
 
export default (state = initialState, action) => {
 
   switch(action.type) {
       case SET_OPEN_SNACK_BASE:
            
           return {
                ...state,
                opened: true,
                text: action.payload
            }

        case SET_CLOSE_SNACK_BASE:
  
           return {
                ...state,
                opened: false
            }
     
       default:
           return state;
   }
}
