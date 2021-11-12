import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { deepPurple } from '@material-ui/core/colors'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],    
  },
  bigger: {
      width: "100px",
      height: "100px",
      fontSize: "50px"
  }
}))

const LetterAvatar = (props) => {

  const classes = useStyles()

  return (
    <Fragment >
       <Avatar className={`${classes.purple} ${props.isBig ? classes.bigger : ''}`} >{props.letter}</Avatar>      
    </Fragment>
  )
}

LetterAvatar.propTypes = {
    letter: PropTypes.string.isRequired,
    isBig: PropTypes.bool.isRequired
}

export default LetterAvatar