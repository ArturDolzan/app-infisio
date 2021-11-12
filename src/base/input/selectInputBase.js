import React, {Fragment, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import PropTypes from 'prop-types'

const SelectInputBase = props => {

	 const inputLabel = React.useRef(null)
	 const [labelWidth, setLabelWidth] = React.useState(0)

	 useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	 }, [])

    return (

        <Fragment>        
            <FormControl variant="outlined" size={"small"} fullWidth={true} disabled={props.disabled}>
               <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                {props.label}
              </InputLabel> 
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={props.value || ""}
                onChange={props.onChange}
					 labelWidth={labelWidth }					 
              >

					{props.enum.map((item, idx) => {

						return (
							<MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
						)

					})}

              </Select>
            </FormControl>
        </Fragment>    
      )
}

SelectInputBase.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.any.isRequired,
  disabled: PropTypes.bool
}

export default SelectInputBase