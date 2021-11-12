import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { useSelector, connect } from "react-redux"
import {closeConfirmation} from '../actions/confirmationDialogBaseAction'

const ConfirmationDialogBase = (props) => {

  const confirmationDialogBase = useSelector(state => state.confirmationDialogBase)

  return (
    <div>
      
      <Dialog
        open={confirmationDialogBase.opened}
        onClose={props.closeConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{confirmationDialogBase.title}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{whiteSpace: "pre-line"}} id="alert-dialog-description">
            {confirmationDialogBase.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            confirmationDialogBase.cbYes(confirmationDialogBase.data)
            props.closeConfirmation()            
          }} color="primary">
            Sim
          </Button> 

          <Button onClick={props.closeConfirmation} color="primary">
            Não
          </Button>         

        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeConfirmation: () => { dispatch(closeConfirmation()) }
  }
}

export default connect(null, mapDispatchToProps)(ConfirmationDialogBase)