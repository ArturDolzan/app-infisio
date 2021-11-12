import {SET_OPEN, SET_CLOSE} from '../reducers/alertDialogBaseReducer'

export const open = data => ({
    type: SET_OPEN,
    payload: data
})

export const close = () => ({
    type: SET_CLOSE
})