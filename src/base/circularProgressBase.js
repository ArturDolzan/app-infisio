import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useSelector } from "react-redux"

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
  },
}))

const CircularProgressBase = () => {

    const circularProgressBase = useSelector(state => state.circularProgressBase)

    const classes = useStyles()

    return (
        <Fragment>
            {circularProgressBase.opened && (
                <div className={classes.root}>
                    <CircularProgress size={50} />
                </div>
            )}            
        </Fragment>
    )
}

export default CircularProgressBase