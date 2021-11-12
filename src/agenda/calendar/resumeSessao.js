import React, {Fragment, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import handleError from '../../base/errorHelper/errorHelper'
import DialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from "@material-ui/icons/Close"
import IconButton from "@material-ui/core/IconButton"
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import DescriptionIcon from "@material-ui/icons/Description"
import Tooltip from '@material-ui/core/Tooltip'
import PlaceIcon from "@material-ui/icons/Place"
import PersonIcon from "@material-ui/icons/Person"
import GroupIcon from "@material-ui/icons/Group"
import StyleIcon from "@material-ui/icons/Style"
import EditIcon from "@material-ui/icons/Edit"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import AccessibilityIcon from "@material-ui/icons/Accessibility"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied"
import CancelIcon from '@material-ui/icons/Cancel'
import moment from 'moment'
import 'moment/locale/pt-br'
import AccessibleIcon from '@material-ui/icons/Accessible'

import SessoesController from '../../controller/clinica/sessoes/sessoesController'

const useStyles = makeStyles(theme => ({
    container: {
        flex: 12,	  
    },       
    marginLeft1: {
        marginLeft: theme.spacing(1),
    },
    marginLeft2: {
        marginLeft: theme.spacing(2),
    },
    rootTitle: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    closeIcon: {
        backgroundColor: 'transparent  !important',
        "&:hover": {
          color: "red"
        }
    },
    dialogActionContainer: {
        display: "flex",
        justifyContent: "start"
    },
    textLine: {
        display: 'flex',        
    },
    textItem: {        
        marginRight: theme.spacing(3),
    },
    bold: {
        fontWeight: 'bold',
    },
    secondary: {
        fontSize: "18px",    
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "start",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    cancelSessionButtonIcon: {
        fontSize: "38px"
    },
    checkButton: {
        marginLeft: theme.spacing(1),
        color: "#009900",
        "&:hover": {
        backgroundColor: "#e5ffe5"
        }
    },
    checkButtonIcon: {
        fontSize: "38px"
    },
    anaButton: {
        marginLeft: theme.spacing(1),
        color: "#f0a500",
        "&:hover": {
        backgroundColor: "#f4f4f4"
        }
    },
    anaButtonIcon: {
        fontSize: "38px"
    },
    editButton: {
        marginLeft: theme.spacing(2),
       marginTop: theme.spacing(0.5),
    },
    editButtonIcon: {
        fontSize: "28px"
    },
    
}))

const ResumeSessao = (props) => {

    const classes = useStyles()
    
    const {dados} = props

    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
          props.onClose()
        }
    }

    const handleDuration = () => {

        let start = moment(dados.data_agendamento_inicial, 'DD/MM/YYYY HH:mm')
        let end = moment(dados.data_agendamento_final, 'DD/MM/YYYY HH:mm')

        if (!start.isValid()) return "0"
        if (!end.isValid()) return "0"

        let duration = moment.duration(end.diff(start))
        let minutes = duration.asMinutes()

        if (minutes < 0) return "0"

        return minutes
    }

    const handleTratamentosSessoes = () => {

        let text = null

        if (!dados.tratamentosSessoes) return text

        dados.tratamentosSessoes.map((item, idx) => {
            
            if (idx === 0) text = item.tratamentos.descricao
            if (idx !== 0 && idx < dados.tratamentosSessoes.length-1) text += `, ${item.tratamentos.descricao}` 
            if (idx === dados.tratamentosSessoes.length-1) text += ` e ${item.tratamentos.descricao}`
        })

        return text
    }

    const renderForm = (props) => {

        return (
            <Fragment>
                
                <Grid container spacing={0} className={classes.container}>

                    <Grid item sm={6} >

                        <List>                    
                            <ListItem>
                                <ListItemIcon>
                                    <AccessTimeIcon />
                                </ListItemIcon>
                                <ListItemText classes={{
                                    secondary: classes.secondary
                                }}
                                    primary="Horário"
                                    secondary={`${moment(dados.data_agendamento_inicial, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm')} com ${handleDuration()} minutos de duração`}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <DescriptionIcon />
                                </ListItemIcon>
                                <ListItemText classes={{
                                    secondary: classes.secondary
                                }}
                                    primary="Descrição"
                                    secondary={dados.descricao}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <PlaceIcon />
                                </ListItemIcon>
                                <ListItemText classes={{
                                    secondary: classes.secondary
                                }}
                                    primary="Local da agenda"
                                    secondary={dados.locaisReuniao ? dados.locaisReuniao.descricao : null}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText classes={{
                                    secondary: classes.secondary
                                }}
                                    primary="Paciente"
                                    secondary={dados.pacientes ? dados.pacientes.nome : null}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText classes={{
                                    secondary: classes.secondary
                                }}
                                    primary="Profissional"
                                    secondary={dados.agentes ? dados.agentes.nome : null}
                                />
                            </ListItem>
                        
                        </List>

                    </Grid>
                    
                    <Grid item sm={6} >

                        <List>                    
                            <ListItem>
                                <ListItemIcon>
                                    <StyleIcon />
                                </ListItemIcon>
                                <ListItemText classes={{
                                    secondary: classes.secondary
                                }}
                                    primary="Convênio"
                                    secondary={dados.convenios ? dados.convenios.nome : null}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <AttachMoneyIcon />
                                </ListItemIcon>
                                <ListItemText classes={{
                                    secondary: classes.secondary
                                }}
                                    primary="Valor"
                                    secondary={parseFloat(dados.valor_sessao).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <AccessibilityIcon />
                                </ListItemIcon>
                                <ListItemText classes={{
                                    secondary: classes.secondary
                                }}
                                    primary="Tratamentos"
                                    secondary={handleTratamentosSessoes()}
                                />
                            </ListItem>

                        </List>

                    </Grid>

                </Grid>

            </Fragment>
        )
    }

    const renderActions = (props) => {

        const disableButton = () => {

            return dados.situacao !== 1
        }
    
        const handleConcluir = () => {
    
            props.openConfirmation({
                title: "Confirmação",
                text: `Confirma a conclusão desta sessão?`,
                data: {...dados},
                cbYes: (value) => {
    
                    let controller = new SessoesController()
    
                    controller.concluirSessao(value)
                    .then(ret => {
    
                        props.openSnackBase("Sessão concluída com sucesso!")
                        props.onClose()
                        props.onSave()
                    })
                    .catch(error => {
    
                        props.open({
                            title: "Ops",
                            text: `Não foi possível concluir a sessão. \n\n Motivo: ${handleError(error)}`
                        })
                    })
                }
            })
        }

        const handleEdit = () => {

            props.onEdit(dados)
            props.onClose()   
        }
    
        const handleCancel = () => {
    
            props.openConfirmation({
                title: "Cancelar",
                text: `Deseja cancelar esta sessão?`,
                data: {...dados},
                cbYes: (value) => {
    
                    let controller = new SessoesController()
    
                    controller.cancelarSessao(value)
                    .then(ret => {
    
                        props.openSnackBase("Sessão cancelada com sucesso!")
                        props.onClose()
                        props.onSave()
                    })
                    .catch(error => {
    
                        props.open({
                            title: "Ops",
                            text: `Não foi possível cancelar a sessão. \n\n Motivo: ${handleError(error)}`
                        })
                    })                
                }
            })
        }

        const handleClickAnamnese = () => {
            
            let codigoPaciente = dados.idpaciente
            
            if (codigoPaciente) {
                props.history.push(`clinica/paciente/anamnese/${codigoPaciente}`)
            }
        }
    
        
        return (
            <Fragment>

                 <div className={classes.buttonContainer}>
                
                    <Tooltip title="Concluir sessão" placement="right-end">
                        <span>
                            <IconButton className={classes.checkButton} onClick={handleConcluir} disabled={disableButton()} aria-label="Concluir" color="primary" >
                                <InsertEmoticonIcon className={classes.checkButtonIcon}/>
                            </IconButton>
                        </span>
                    </Tooltip>
                    
                    <Tooltip title="Cancelar sessão" placement="right-end">
                        <span>
                            <IconButton onClick={handleCancel} disabled={disableButton()} aria-label="Cancelar" color="secondary" >
                                <SentimentVeryDissatisfiedIcon className={classes.cancelSessionButtonIcon} />
                            </IconButton>
                        </span>
                    </Tooltip>

                    <Tooltip title="Anamnese" placement="right-end">
                        <span>
                            <IconButton className={classes.anaButton} onClick={handleClickAnamnese} disabled={disableButton()} aria-label="Anamnese" color="default" >
                                <AccessibleIcon className={classes.anaButtonIcon} />
                            </IconButton>
                        </span>
                    </Tooltip>

                    <Tooltip title="Editar" placement="right-end">
                        <span>
                            <IconButton className={classes.editButton} disabled={disableButton()} onClick={handleEdit} aria-label="Editar" color="primary" >
                                <EditIcon className={classes.editButtonIcon} />
                            </IconButton>
                        </span>
                    </Tooltip>
                </div>
    
            </Fragment>
        )
    }

    return (
        <Fragment>
            
            <Dialog classes={{ paper: classes.dialogPaper }} onKeyDown={handleKeyDown} fullWidth={true} maxWidth="md" open={props.resumeSessaoOpened} aria-labelledby="form-dialog-title">
                <div className={classes.rootTitle}>
                    <DialogTitle className={classes.dialogTitle} id="form-dialog-title">Resumo Sessão</DialogTitle>
                    <IconButton className={classes.closeIcon} onClick={() => props.onClose()}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <DialogContent>

                    {renderForm(props)}
                    
                </DialogContent>
                <DialogActions className={classes.dialogActionContainer}>
                    
                    {renderActions(props)}

                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default ResumeSessao