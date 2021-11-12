import React, {Fragment} from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { useSelector } from "react-redux"

import { makeStyles } from '@material-ui/core/styles'


const FormDialogBase = (props) => {

  const formDialogBase = useSelector(state => state.formDialogBase)

  const useStyles = makeStyles(theme => ({
    dialogPaper: {
        minHeight: formDialogBase.minHeight || "40vh"
    },
}))

  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Fragment>
      
      <Dialog classes={{ paper: classes.dialogPaper }} fullWidth={true} maxWidth={formDialogBase.maxWidth} open={formDialogBase.opened} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{formDialogBase.title}</DialogTitle>
        <DialogContent>
          
            {formDialogBase.content}

        </DialogContent>
        <DialogActions>
            
            {formDialogBase.actions}

        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default FormDialogBase