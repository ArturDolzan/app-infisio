export const SET_OPEN_CONFIRMATION = 'SET_OPEN_CONFIRMATION'
export const SET_CLOSE_CONFIRMATION = 'SET_CLOSE_CONFIRMATION'
 
const initialState = {   
    title: '',
    text: '',
    opened: false,
    cbYes: null,
    cbNo: null,
    data: null
}
 
export default (state = initialState, action) => {
 
   switch(action.type) {
       case SET_OPEN_CONFIRMATION:
  
           return {
                ...state,
                title: action.payload.title,
                text: action.payload.text,
                data: action.payload.data,
                cbYes: action.payload.cbYes,
                cbNo: action.payload.cbNo,
                opened: true,
            }

        case SET_CLOSE_CONFIRMATION:
  
           return {
                ...state,
                opened: false
            }
     
       default:
           return state;
   }
}
