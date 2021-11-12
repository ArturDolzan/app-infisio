import React, {Fragment} from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TextInputBase = ({ type, id, label, error, value, onChange, required, multiline, rows, rowsMax, startIcon, html, ...props }) => {

  const renderStartIcon = () => {

    if (!startIcon) return (null)

    return (      
        {
          startAdornment: (
            <InputAdornment position="start">
                {startIcon}
            </InputAdornment>
          ),
        }      
    )
  }

    return (

        <Fragment>  
             {html ?
                <div>

                    <Typography style={{marginLeft: '10px'}} variant="subtitle2" color="textSecondary">
                        {label}
                    </Typography>

                  <ReactQuill 
                    id={id}
                    theme="snow" 
                    value={value} 
                    onChange={(value) => onChange(value)}
                  />
                </div>
             :
              <TextField
                id={id}
                type={type||""}
                onChange={onChange}
                value={value}          
                label={label}
                variant="outlined"
                size={"small"} 
                error={error ? true : false}
                helperText={error}
                fullWidth={true}
                required={required || false}
                multiline={multiline || false}
                rowsMax={rowsMax || 1}
                rows={rows || 1}
                InputProps={renderStartIcon()}
                {...props}              
              />
             }      
            
        </Fragment>    
      )
}

TextInputBase.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  html: PropTypes.bool,
  error: PropTypes.string,
  type: PropTypes.any,
  required: PropTypes.bool,
  startIcon: PropTypes.any
}

export default TextInputBase