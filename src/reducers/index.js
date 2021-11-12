import authReducer from './authReducer'
import alertDialogBaseReducer from './alertDialogBaseReducer'
import confirmationDialogBaseReducer from './confirmationDialogBaseReducer'
import circularProgressBaseReducer from './circularProgressBaseReducer'
import formDialogBaseReducer from './formDialogBaseReducer'
import snackBaseReducer from './snackBaseReducer'

export default {    
    auth: authReducer,
    alertDialogBase: alertDialogBaseReducer,
    confirmationDialogBase: confirmationDialogBaseReducer,
    circularProgressBase: circularProgressBaseReducer,
    formDialogBase: formDialogBaseReducer,
    snackBase: snackBaseReducer,
}