import {SET_OPEN_SNACK_BASE, SET_CLOSE_SNACK_BASE} from '../reducers/snackBaseReducer'

export const openSnackBase = data => ({
    type: SET_OPEN_SNACK_BASE,
    payload: data
})

export const closeSnackBase = () => ({
    type: SET_CLOSE_SNACK_BASE
})