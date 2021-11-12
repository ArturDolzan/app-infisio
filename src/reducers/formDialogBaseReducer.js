export const SET_OPEN_FORM_DIALOG = 'SET_OPEN_FORM_DIALOG'
export const SET_CLOSE_FORM_DIALOG = 'SET_CLOSE_FORM_DIALOG'
 
const initialState = {   
    title: '',
    content: null,
    actions: null,
    opened: false,
    maxWidth: 'sm',
    minHeight: ''
}
 
export default (state = initialState, action) => {
 
   switch(action.type) {
       case SET_OPEN_FORM_DIALOG:
  
           return {
                ...state,
                title: action.payload.title,
                content: action.payload.content,
                actions: action.payload.actions,
                opened: true,
                maxWidth: action.payload.maxWidth,
                minHeight: action.payload.minHeight
            }

        case SET_CLOSE_FORM_DIALOG:
  
           return {
                ...state,
                opened: false
            }

       default:
           return state;
   }
}
