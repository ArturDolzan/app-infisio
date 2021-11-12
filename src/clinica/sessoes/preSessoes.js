import React, {Fragment, useState} from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import IconButton from '@material-ui/core/IconButton'
import {withRouter} from 'react-router-dom'

import AutoComplete from '../../base/autoComplete'
import PacientesController from '../../controller/clinica/pacientes/pacientesController'
import CadastroPaciente from '../pacientes/cadastroPaciente'
import Fade from 'react-reveal/Fade'

import mainImage from '../../base/images/rain-455124_1920.jpg'

const useStyles = makeStyles(theme => ({   
    root: {
        height: '280px',        
    },
    paperHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        boxShadow: "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
        height: '100%',
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.85) 0%,rgba(255,255,255,0.95) 100%), url(${mainImage})`,
    },    
    pacienteContainer: {
        width: '70%',
        marginTop: theme.spacing(1),
    },
    buttonContainer: {
        marginTop: theme.spacing(1),
    },
    checkIcon: {
        fontSize: '38px',        
    },
    backIcon: {
        fontSize: '32px'
    }
}))

const PreSessoes = (props) => {

    const classes = useStyles()
    const [paciente, setPaciente] = useState({
        id: null,
        nome: null
    })

    const checkDisabled = () => {
        
        if (paciente.id) return false

        return true
    }

    return (
        <Fragment>
            <Fade> 
                <div className={classes.root}>
                    
                    <Paper className={classes.paperHeader}>

                        <Typography variant="h4" color="textSecondary" component="p">
                            Selecione um paciente para iniciar
                        </Typography>
                            
                        <div className={classes.pacienteContainer}>
                            <AutoComplete
                                id="idpaciente"
                                label="Paciente"
                                controller={new PacientesController()}
                                cadastroSearch={CadastroPaciente}
                                chave="id"
                                valor="nome"
                                required={false}                                
                                defaultChave={paciente.id}
                                defaultValor={paciente.nome}
                                getValueSelected={(event, value) => {
                                
                                    setPaciente({
                                        ...paciente,
                                        id: value ? value.id : null,
                                        nome: value ? value.nome : null
                                    })
                                }}
                            />
                        </div>

                        <div className={classes.buttonContainer}>
                            
                            <Tooltip title="Selecionar" placement="right-end">
                                <span>
                                    <IconButton aria-label="Selecionar" color="primary" disabled={checkDisabled()} onClick={() => props.history.push(`${props.match.url}/${paciente.id}`)}>
                                        <CheckCircleOutlineIcon style={!checkDisabled() ? {color: '#009900'} : null } className={classes.checkIcon}/>
                                    </IconButton>
                                </span>                            
                            </Tooltip>
                            
                            <Tooltip title="Voltar" placement="right-end">
                                <IconButton aria-label="Voltar" color="secondary" onClick={() => props.history.goBack()}>
                                    <KeyboardBackspaceIcon className={classes.backIcon}/>
                                </IconButton>                            
                            </Tooltip>
                        </div>
                    
                    </Paper>
                </div>
            </Fade>

        </Fragment>
    )
}

export default withRouter(PreSessoes)