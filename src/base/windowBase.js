import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import PropTypes from 'prop-types'

const PaperComponent = (props) => {
  
    return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const WindowBase = (props) => {


  return (
    <div>

      <Dialog
        open={true}
        onClose={props.handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary" onClick={props.handleClose}>
            Cancelar
          </Button>
          <Button color="primary" onClick={props.handleApply}>
            Aplicar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

WindowBase.propTypes = {
  handleClose: PropTypes.any.isRequired,
  handleApply: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default WindowBase