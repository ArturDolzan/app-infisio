import React, {Fragment} from 'react'
import ptBR from "date-fns/locale/pt-BR"

import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import 'date-fns'
import PropTypes from 'prop-types'


const DateInputBase = (props) => {

    return (

        <Fragment>      
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
                <KeyboardDatePicker 
                    disableToolbar
                    inputVariant={props.inputVariant || "outlined"}
                    format="dd/MM/yyyy"
                    variant="inline"
                    margin="none"
                    id={props.id}
                    label={props.label}
                    inputValue={ props.value ? props.value.replace(/\s\d{2}:\d{2}:\d{2,4}$/, '') : "01/01/1990"}
                    //error={props.error ? true : false}
                    //helperText={props.error}
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
                />
            </MuiPickersUtilsProvider>
        </Fragment>    
      )
}

DateInputBase.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    error: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.any.isRequired,
    disableFuture: PropTypes.bool,
    disablePast: PropTypes.bool,
    inputVariant: PropTypes.string,
}

export default DateInputBase