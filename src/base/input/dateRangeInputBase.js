import React, {Fragment} from 'react'
import ptBR from "date-fns/locale/pt-BR"

import { DateRange  } from 'react-date-range'
import 'date-fns'
import PropTypes from 'prop-types'


const DateRangeInputBase = (props) => {

    return (

        <Fragment>      
            <DateRange
                id={props.id}
                locale={ptBR}
                showMonthAndYearPickers={false}
                showSelectionPreview={false}
                dateDisplayFormat={"dd/MM/yyyy"}
                ranges={
                    [
                        {
                            startDate: props.startValue ? props.startValue : new Date(),
                            endDate: props.endValue ? props.endValue : new Date(),
                            key: 'selection',
                        }
                    ]                    
                }
                onChange={props.onChange}
            />
        </Fragment>    
      )
}

DateRangeInputBase.propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.any.isRequired,
    startValue: PropTypes.any.isRequired,
    endValue: PropTypes.any.isRequired,
}

export default DateRangeInputBase