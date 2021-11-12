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

 const AutoCompleteMultiple = (props) => {

  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const loading = open && options.length === 0
  const [hoverAdd, setHoverAdd] = React.useState(false)
  const [cadastroAdd, setCadastroAdd] = React.useState(false)
  const [val, setVal] = React.useState([])

  const classes = useStyles()

  const handleMouseHoverAddEnter = () => {
    setHoverAdd(true)
  }

  const handleMouseHoverAddLeave = () => {
    setHoverAdd(false)
  }

  React.useEffect(() => {

    let novosDados = []

    if (props.default) {
      let dados = [...props.default]    

      dados.forEach(e => {  
              
          let registro = e[props.defaultModel]
          novosDados.push(registro)
      })
    }

    setVal( novosDados )

    return () => {      
    }
  }, [])

  React.useEffect(() => {
    let active = true
    
    if (!loading) {
      return undefined
    }
    
    (async () => {

        try{
            const response = props.controller.recuperar(999999999, 1, [], ret => {
              
              if (active) {
                
                  let dados = [...ret.data.conteudo.results]

                  if (dados.length > 0) {
                    if (ret.data.conteudo.results[0].ativo) {
                      dados = ret.data.conteudo.results.filter(x => x.ativo === 1 )
                    }
                  }

                 setOptions(dados)
                 if (dados.length === 0) setOpen(false)
              }

            }, error => {              
              alert(error)
            })

        } catch(e) {            
            console.log(`Erro na requisição: ${e.message}`)
        }
    })()

    return () => {
      active = false
    }
  }, [loading])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      setCadastroAdd(false)
    }
  }

  const onAutoCompleteSaved = (obj) => {  
    
    let newArray = []
    newArray.push(obj)

    setCadastroAdd(false)
    setOpen(false)
    handleChange(null, [...newArray, ...val])
  }

  const handleChange = (event, value) => {

    if (props.disabled) return

    if (value.length > 0) {           
      setVal([...value.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i)])     
    } else {
      setVal([])
    }
    
    props.getValueSelected(event, value)
  }

  return (
    <Fragment>      
    <Autocomplete
      onBlur={props.onBlur}
      multiple
      disabled={props.disabled}
      value={val}      
      onMouseEnter={handleMouseHoverAddEnter}
      onMouseLeave={handleMouseHoverAddLeave}
      id={props.id}
      loadingText={'Carregando...'}
      noOptionsText={'Nenhum valor selecionado'}
      onChange={handleChange}
      defaultValue={props.default}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionLabel={option => `${option[props.valor]}`}
      options={options}
      loading={loading}
      filterSelectedOptions
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
          InputProps={
            {
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


AutoCompleteMultiple.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    controller: PropTypes.any,
    chave: PropTypes.string.isRequired,
    valor:  PropTypes.string.isRequired,
    default: PropTypes.any,
    defaultModel: PropTypes.string.isRequired,
    required: PropTypes.bool,
    error: PropTypes.string,
    cadastro: PropTypes.any
}

export default AutoCompleteMultiple