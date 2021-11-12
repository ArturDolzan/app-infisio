export const SET_OPEN = 'SET_OPEN'
export const SET_CLOSE = 'SET_CLOSE'
 
const initialState = {   
    title: '',
    text: '',
    opened: false,
}
 
export default (state = initialState, action) => {
 
   switch(action.type) {
       case SET_OPEN:
  
           return {
                ...state,
                title: action.payload.title,
                text: action.payload.text,
                opened: true,
            }

        case SET_CLOSE:
  
           return {
                ...state,
                opened: false
            }
     
       default:
           return state;
   }
}
