import {SET_OPEN_CONFIRMATION, SET_CLOSE_CONFIRMATION} from '../reducers/confirmationDialogBaseReducer'

export const openConfirmation = data => ({
    type: SET_OPEN_CONFIRMATION,
    payload: data
})

export const closeConfirmation = () => ({
    type: SET_CLOSE_CONFIRMATION
})