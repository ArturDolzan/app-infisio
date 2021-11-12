import React, {Fragment, Component} from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import CloseIcon from "@material-ui/icons/Close"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import { makeStyles } from "@material-ui/core/styles"
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import throttle from "lodash/throttle"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inserirNovo: {
    color: "#009900",
    "&:hover": {
      backgroundColor: "#e5ffe5"
    }
  },
  inserirNovoIcon: {
    fontSize: "22px",
  },
  closeIcon: {
    backgroundColor: 'transparent  !important',
    "&:hover": {
      color: "red"
    }
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

 const AutoComplete = (props) => {

  const [request, setRequest] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const [inputValue, setInputValue] = React.useState("")
  const loading = open && options.length === 0 && inputValue != "" && request
  const [hoverAdd, setHoverAdd] = React.useState(false)
  const [cadastroAdd, setCadastroAdd] = React.useState(false)
  const [val, setVal] = React.useState(null)

  const classes = useStyles()

  const handleMouseHoverAddEnter = () => {
    setHoverAdd(true)
  }

  const handleMouseHoverAddLeave = () => {
    setHoverAdd(false)
  }

  React.useEffect(() => {
    
    setVal(props.defaultChave ? {[props.chave]: props.defaultChave, [props.valor]: props.defaultValor} : null)

    return () => {      
    }
  }, [])

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        
        let filter = []
        let count = 999999999        
        filter.push(request.input)

        if (request.input === "") {
          filter = []
          count = 10
        }      

        props.controller.recuperar(count, 1, filter, callback, (error) => {
          alert(error)          
        })
        
      }, 200),
    []
  )

  React.useEffect(() => {
    let active = true
    setRequest(true)

    if (!open) {
      return undefined
    }

    fetch({ input: inputValue }, (ret) => {
      setRequest(false)

      if (active) {
        let newOptions = []

        let dados = [...ret.data.conteudo.results]

        if (dados.length > 0) {
          if (ret.data.conteudo.results[0].ativo) {
            dados = ret.data.conteudo.results.filter(x => x.ativo === 1 )
          }
        }

        if (val) {
          newOptions = [val]
        }

        if (dados) {
          newOptions = [...newOptions, ...dados]
        }

        setOptions(newOptions)
      }
    })

    return () => {
      active = false      
    }
  }, [val, inputValue, fetch, open])

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      setCadastroAdd(false)
    }
  }

  const onAutoCompleteSaved = (obj) => {    
    setCadastroAdd(false)
    setOpen(false)
    handleChange(null, obj)
  }

  const handleChange = (event, value) => {
    
    if (value) {
      setVal({[props.chave]: value[props.chave], [props.valor]: value[props.valor]})
    } else {
      setVal(null)
      setInputValue("")
    }
    
    props.getValueSelected(event, value)
  }

  return (
    <Fragment>      
    <Autocomplete
      disabled={props.disabled}
      onBlur={props.onBlur}
      value={val}      
      onMouseEnter={handleMouseHoverAddEnter}
      onMouseLeave={handleMouseHoverAddLeave}
      id={props.id}
      loadingText={'Carregando...'}
      noOptionsText={'Nenhum valor selecionado'}
      onChange={handleChange}
      onInputChange={(event, newInputValue) => {
        
        setInputValue(newInputValue)
      }}
      filterOptions={(options, e) => {

        return options.filter(x => (x[props.chave] == e.inputValue || x[props.valor].toLowerCase().indexOf(e.inputValue.toLowerCase()) != -1 ))
      }}
      filterSelectedOptions
      defaultValue={ props.defaultChave ? {[props.chave]: props.defaultChave, [props.valor]: props.defaultValor} : null}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionSelected={(option, value) => {         
          return option.nome === value.nome
        }
      }
      getOptionLabel={option => `${option[props.valor]}`}
      options={options}
      loading={loading}
      clearText={"Remover"}      
      renderInput={params => (
        <TextField
          {...params}
          label={props.label}
          fullWidth
          variant="outlined"
          size={"small"}
          required={props.required || false}
          error={props.error ? true : false}
          helperText={props.error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> 
                : 
                 <div>
                    {hoverAdd && (
                      <Tooltip title={`Inserir novo ${props.label}`} placement="right">
                        <span>
                        <IconButton
                          className={classes.inserirNovo}
                          aria-label="Novo"
                          size={"small"}
                          disabled={props.disabled}
                          onClick={(e) => {
                            e.stopPropagation()
                            setCadastroAdd(true)
                          }}
                        >                        
                          <AddCircleOutlineIcon
                            className={classes.inserirNovoIcon}
                          />
                        </IconButton>
                        </span>
                      </Tooltip>
                    )}
                  </div>
                }
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}      
        />
      )}
    />


      <Dialog fullWidth={true} maxWidth="md" open={cadastroAdd} onKeyDown={handleKeyDown} aria-labelledby="form-dialog-title">
        <div className={classes.root}>
          <DialogTitle className={classes.dialogTitle} id="form-dialog-title">{props.label}</DialogTitle>
          <IconButton className={classes.closeIcon} onClick={() => setCadastroAdd(false)}>
                <CloseIcon />
          </IconButton>
        </div>
        
          <DialogContent>

         
             <props.cadastroSearch
                autoComplete={true}
                autoCompleteSaved={onAutoCompleteSaved}
              /> 

          </DialogContent>
          <DialogActions>
              

          </DialogActions>
      </Dialog>

    </Fragment>
  )
}


AutoComplete.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    controller: PropTypes.any.isRequired,
    chave: PropTypes.string.isRequired,
    valor:  PropTypes.string.isRequired,
    defaultChave: PropTypes.number,
    defaultValor: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string,
    cadastro: PropTypes.any
}

export default AutoComplete