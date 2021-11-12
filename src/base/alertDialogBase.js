import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { useSelector, connect } from "react-redux"
import {close} from '../actions/alertDialogBaseAction'

const AlertDialogBase = (props) => {

  const alertDialogBase = useSelector(state => state.alertDialogBase)

  return (
    <div>
      
      <Dialog
        open={alertDialogBase.opened}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{alertDialogBase.title}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{whiteSpace: "pre-line"}} id="alert-dialog-description">
            {alertDialogBase.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Fechar
          </Button>          

        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
      close: () => { dispatch(close()) }
  }
}

export default connect(null, mapDispatchToProps)(AlertDialogBase)