import {SET_OPEN_FORM_DIALOG, SET_CLOSE_FORM_DIALOG} from '../reducers/formDialogBaseReducer'

export const openDialogForm = data => ({
    type: SET_OPEN_FORM_DIALOG,
    payload: data
})

export const closeDialogForm = () => ({
    type: SET_CLOSE_FORM_DIALOG
})