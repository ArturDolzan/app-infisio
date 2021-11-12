import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import PropTypes from 'prop-types'

const RadioInputBase = (props) => {

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{props.label || null}</FormLabel>
            <RadioGroup row aria-label={props.label} name={props.id} value={props.value} onChange={props.onChange}>
                <FormControlLabel value={props.value1} control={<Radio disabled={props.disabled1}/>} label={props.label1} labelPlacement="start"/>
                <FormControlLabel value={props.value2} control={<Radio disabled={props.disabled2}/>} label={props.label2} labelPlacement="start"/>
            </RadioGroup>
        </FormControl>
    )
}

RadioInputBase.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    value1: PropTypes.any.isRequired,
    value2: PropTypes.any.isRequired,
    label1: PropTypes.any.isRequired,
    label2: PropTypes.any.isRequired,
    disabled1: PropTypes.bool,
    disabled2: PropTypes.bool,
}

export default RadioInputBase