import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  },  
  bigger: {
      width: "100px",
      height: "100px",
      fontSize: "50px"
  }
}))

const ImageAvatarBase = (props) => {

  const classes = useStyles()

  return (
    <Fragment >
       <Avatar className={`${props.isBig ? classes.bigger : ''}`} src={props.url} />
    </Fragment>
  )
}

ImageAvatarBase.propTypes = {
    url: PropTypes.string.isRequired,
    isBig: PropTypes.bool.isRequired
}

export default ImageAvatarBase