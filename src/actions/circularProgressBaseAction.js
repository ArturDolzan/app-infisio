import {SET_OPEN_CIRCULAR_PROGRESS, SET_CLOSE_CIRCULAR_PROGRESS} from '../reducers/circularProgressBaseReducer'

export const openCircularProgress = data => ({
    type: SET_OPEN_CIRCULAR_PROGRESS
})

export const closeCircularProgress = () => ({
    type: SET_CLOSE_CIRCULAR_PROGRESS
})