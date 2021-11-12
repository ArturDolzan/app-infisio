import React, {Fragment} from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'

const TextFieldBase = (props) => {
  
    const checkErrors = () => {

        if (props.hasError) {
            return true
        }

        if (props.isRequired && !props.value) {
            return true
        }

        return false
    }

    const checkErrorMessage = () => {

        if (props.textError) {
            return props.textError
        }

        if (checkErrors()) {

            if (props.isRequired && !props.value) {
                return 'O campo é obrigatório'
            }
        }
    }

  return (
    
      <Fragment>        
        <TextField
          id={props.id}
          onChange={props.onChange}
          value={props.value}
          error={checkErrors() || false}
          required={props.isRequired || false}
          disabled={props.isDisabled || false}          
          label={props.label}
          helperText={checkErrorMessage() || ''}
          variant="outlined"
          size={"small"}
          style={{width: "100%"}}
        />
      </Fragment>      
  )
}

TextFieldBase.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    hasError: PropTypes.bool,
    textError: PropTypes.string,
    isDisabled: PropTypes.bool,
    isRequired: PropTypes.bool,
}

export default TextFieldBase