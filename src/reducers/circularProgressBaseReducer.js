export const SET_OPEN_CIRCULAR_PROGRESS = 'SET_OPEN_CIRCULAR_PROGRESS'
export const SET_CLOSE_CIRCULAR_PROGRESS = 'SET_CLOSE_CIRCULAR_PROGRESS'
 
const initialState = {   
    opened: false
}
 
export default (state = initialState, action) => {
 
   switch(action.type) {
       case SET_OPEN_CIRCULAR_PROGRESS:
  
           return {
                ...state,
                opened: true
            }

        case SET_CLOSE_CIRCULAR_PROGRESS:
  
           return {
                ...state,
                opened: false
            }
     
       default:
           return state;
   }
}
