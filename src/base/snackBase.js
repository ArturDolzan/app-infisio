import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'

import { useSelector, connect } from "react-redux"
import {openSnackBase, closeSnackBase} from '../actions/snackBaseAction'


const SnackBase = (props) => {

  const snackBase = useSelector(state => state.snackBase)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    props.closeSnackBase()
  }

  return (
    <div>

      <Snackbar
        open={snackBase.opened}
        autoHideDuration={3000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{snackBase.text}</span>}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackBase: (text) => { dispatch(openSnackBase(text)) },
    closeSnackBase: () => { dispatch(closeSnackBase()) }
  }
}

export default connect(null, mapDispatchToProps)(SnackBase)
