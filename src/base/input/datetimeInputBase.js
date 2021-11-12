import React, {Fragment} from 'react'
import TextField from '@material-ui/core/TextField'
import ptBR from "date-fns/locale/pt-BR"

import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import 'date-fns'
import PropTypes from 'prop-types'


const DatetimeInputBase = (props) => {

    // const textFieldComponent = (e) => {
    //     return <TextField {...props} 
    //             {...e}
    //             variant="outlined"
    //             size={"small"} 
    //             error={props.error ? true : false}
    //             helperText={props.error}
    //             fullWidth={true}
    //             required={props.required || false}
    //             />
    // }

    return (

        <Fragment>      
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
                <KeyboardDatePicker 
                    disableToolbar
                    inputVariant={props.inputVariant || "outlined"}
                    format="dd/MM/yyyy hh:mm"
                    variant="inline"
                    margin="none"
                    id={props.id}
                    label={props.label}
                    inputValue={ props.value ? props.value.replace(/\s\d{2}:\d{2}:\d{2,4}$/, '') : "01/01/1990 00:00"}
                    error={props.error ? true : false}
                    helperText={props.error ? props.error : ''}
                    onError={props.onError}
                    size={"small"}
                    fullWidth={true}
                    disableFuture={props.disableFuture || false}
                    disablePast={props.disablePast || false}
                    required={props.required || false}
                    invalidDateMessage={"Formato de data inválido"}
                    maxDateMessage={"Data é maior que o permitido"}
                    minDateMessage={"Data é menor que o permitido"}
                    onChange={props.onChange}
                    //TextFieldComponent={(e) => textFieldComponent(e)}
                />
            </MuiPickersUtilsProvider>
        </Fragment>    
      )
}

DatetimeInputBase.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    error: PropTypes.any,
    required: PropTypes.bool,
    onChange: PropTypes.any.isRequired,
    disableFuture: PropTypes.bool,
    disablePast: PropTypes.bool,
    disabled: PropTypes.bool,
    inputVariant: PropTypes.any
}

export default DatetimeInputBase