import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 120,
    },
  }))

const TimeInputBase = (props) => {

    const classes = useStyles()

    return (

        <Fragment>      
            <form className={classes.container} noValidate>
                <TextField
                    id={props.id}
                    label={props.label}
                    type="time"
                    size={"small"}
                    defaultValue={props.value}
                    className={classes.textField}
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    onChange={props.onChange}
                    required={props.required || false}
                />
            </form>
        </Fragment>    
      )
}

TimeInputBase.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    onChange: PropTypes.any.isRequired
}

export default TimeInputBase