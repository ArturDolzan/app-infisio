import React, {Fragment, useEffect, useState, useLayoutEffect} from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AccessibilityIcon from "@material-ui/icons/Accessibility"
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import handleError from '../../base/errorHelper/errorHelper'
import moment from 'moment'
import 'moment/locale/pt-br'
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import EventIcon from '@material-ui/icons/Event'
import Grid from '@material-ui/core/Grid'
import ImageAvatarEditBase from '../../base/imageAvatarEditBase'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import PersonIcon from "@material-ui/icons/Person"
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import ListItemText from "@material-ui/core/ListItemText"
import PhoneIcon from "@material-ui/icons/Phone"
import PlaceIcon from "@material-ui/icons/Place"
import StyleIcon from "@material-ui/icons/Style"
import EmailIcon from "@material-ui/icons/Email"
import CakeIcon from "@material-ui/icons/Cake"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import WcIcon from "@material-ui/icons/Wc"
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ImagemBarra from '../../base/images/blackboard-1846865_1920.jpg'
import FiltroPeriodoBase from '../../base/filtroPeriodoBase'

import { connect } from "react-redux"
import {open} from '../../actions/alertDialogBaseAction'

import PacientesController from '../../controller/clinica/pacientes/pacientesController'
import SessoesController from '../../controller/clinica/sessoes/sessoesController'

const corAgendada = "#51adcf"
const corConcluida = "#28df99"
const corCancelada = "#ff414d"

const useStyles = makeStyles(theme => ({       
    root:{
        display: 'flex'
    },
    container: {	  
        flex: 12,	  
    },
    containerInfoPaciente: {
        padding: theme.spacing(2),
    },
    backButton: {
        marginLeft: theme.spacing(2),
        color: "#FFFFFF"
    },
    paperHeader:{
        display: "flex",
		backgroundImage: `url(${ImagemBarra})`,        
        marginBottom: theme.spacing(2),
    },
    divPaperHeaderGrid: {
        minHeight: "75px", 
        display: "flex", 
        alignItems: "center"
    },
    marginLeft2: {
        marginLeft: theme.spacing(2),
    },
    marginLeft1: {
        marginLeft: theme.spacing(1),
    },
    imageAvatarBar: {
		marginLeft: theme.spacing(3),
    },
    title: {
		marginLeft: theme.spacing(2),
		color: "#FFFFFF",
    },
    containerSessoes: {
       marginTop: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(16),
        flexBasis: '60%',
        flexShrink: 0,
        marginLeft: theme.spacing(1),
    },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(10),
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2)
    },
    itemSecondaryHeading: {
        display: 'flex',
    },
    legendaIconAgendada: {
        color: corAgendada
    },
    legendaIconConcluida: {
        color: corConcluida
    },
    legendaIconCancelada: {
        color: corCancelada
    },
    buttonAgendar: {
        color: '#009900',
        "&:hover": {
            backgroundColor: "#e5ffe5"
        },
    },
    headerSessoes: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    containerNaoHaDados: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
    },
    
}))

const useWindowSize = () => {
    const [size, setSize] = useState([0, 0])
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight])
      }
      window.addEventListener('resize', updateSize)
      updateSize()
      return () => window.removeEventListener('resize', updateSize)
    }, [])
    return size
}

const SessoesGeral = (props) => {

    const classes = useStyles()
    const [width, height] = useWindowSize()
    const {match} = props

    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const [retrieved, setRetrieved] = useState(false)
    const [paciente, setPaciente] = useState({
        nome: ''
    })
    const [sessoes, setSessoes] = useState([])
    const [periodo, setPeriodo] = useState({
        inicial: moment().startOf('day').format('DD/MM/YYYY'),
        final: moment().endOf('day').format('DD/MM/YYYY')
    })

    useEffect(() => {

        recuperar()
        
        return () => {
        }        
    }, [])

    useEffect(() => {
        console.log('RECUPERAR ' + periodo.inicial)
        recuperarSessoes()

        return () => {
        }        
    }, [periodo])

    const recuperar = () => {

        let codigoPaciente = parseInt(match.params.idpaciente || 0) 

        new PacientesController().recuperarPorId(codigoPaciente, (ret) => {

            setPaciente(ret.data.conteudo)
            setRetrieved(true)
        }, (error) => {
            
            props.open({
                title: "Ops",
                text: `Não foi possível recuperar o paciente. \n\n Motivo: ${handleError(error)}`
            })
        })
    }

    const recuperarSessoes = () => {

        let codigoPaciente = parseInt(match.params.idpaciente || 0) 

        new SessoesController().recuperarSessoesPorPaciente({
            dataInicial: periodo.inicial,
            dataFinal: periodo.final,
            idpaciente: codigoPaciente
        })
        .then(ret => {
            
            setSessoes([...ret.data.conteudo])
        })
        .catch(error => {

            props.open({
                title: "Ops",
                text: `Não foi possível recuperar o paciente. \n\n Motivo: ${handleError(error)}`
            })
        })
    }

    const renderBarra = (props) => {

        return (
            <Fragment>
            
                <Paper className={classes.paperHeader}>
                    <div className={classes.divPaperHeaderGrid}>
                        <Tooltip title="Voltar" placement="right-end">
                            <IconButton className={classes.backButton} aria-label="Voltar" color="primary" onClick={() => props.history.goBack()}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography className={classes.title} variant="h6">
                            {`Paciente ${paciente.nome}`}
                        </Typography>

                        {retrieved && (
                            <div className={classes.imageAvatarBar}>
                                <ImageAvatarEditBase id={paciente.id} isBig={true} controller={new PacientesController()}/>
                            </div>
                        )}
                        
                    </div>
                </Paper>
            </Fragment>
        )
    }

    const renderInfoPaciente = (props) => {

        return (
            <Fragment>
                <Paper className={classes.containerInfoPaciente}>
                    
                    <Typography variant="h6" color="textSecondary" component="p">
                        {paciente.nome}
                    </Typography>

                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <PhoneIcon />
                            </ListItemIcon>
                            <ListItemText classes={{
                                secondary: classes.secondary
                            }}
                                primary="Telefone"
                                secondary={paciente.fone}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <EmailIcon />
                            </ListItemIcon>
                            <ListItemText classes={{
                                secondary: classes.secondary
                            }}
                                primary="E-mail"
                                secondary={paciente.email}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <CakeIcon />
                            </ListItemIcon>
                            <ListItemText classes={{
                                secondary: classes.secondary
                            }}
                                primary="Data Nascimento"
                                secondary={moment(paciente.data_nascimento, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <WcIcon />
                            </ListItemIcon>
                            <ListItemText classes={{
                                secondary: classes.secondary
                            }}
                                primary="Sexo"
                                secondary={paciente.sexo === 1 ? 'Masculino' : 'Feminino'}
                            />
                        </ListItem>
                    </List>

                </Paper>
            </Fragment>
        )
    }

    const renderInfoSessoes = (props) => {

        const calcDuration = (dataInicial, dataFinal) => {

            let start = moment(dataInicial, 'DD/MM/YYYY HH:mm')
            let end = moment(dataFinal, 'DD/MM/YYYY HH:mm')
    
            if (!start.isValid()) return "0"
            if (!end.isValid()) return "0"
    
            let duration = moment.duration(end.diff(start))
            let minutes = duration.asMinutes()
    
            if (minutes < 0) return "0"
    
            return minutes
        }

        const handleTratamentosSessoes = (value) => {

            let text = null
    
            if (!value.tratamentosSessoes) return text
    
            value.tratamentosSessoes.map((item, idx) => {
                
                if (idx === 0) text = item.tratamentos.descricao
                if (idx !== 0 && idx < value.tratamentosSessoes.length-1) text += `, ${item.tratamentos.descricao}` 
                if (idx === value.tratamentosSessoes.length-1) text += ` e ${item.tratamentos.descricao}`
            })
    
            return text
        }

        const handleTextSituacao = (situacao) => {

            if(situacao === 1) return 'Agendada'
            if(situacao === 2) return 'Concluída'
            if(situacao === 3) return 'Cancelada'
        }

        return (
            <Fragment>
                <Paper className={classes.containerInfoPaciente}>
                    
                    <div className={classes.headerSessoes}>
                        <Typography variant="h6" color="textSecondary" component="p">
                            Sessões
                        </Typography>
                        
                        <FiltroPeriodoBase
                         onChange={(value) => {
                             setPeriodo({
                                inicial: moment(value.inicial, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY'),
                                final: moment(value.final, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY')
                             })

                         }} 
                         default={periodo}
                        />

                        <Tooltip title="Ir para a agenda" placement="left-end">
                            <IconButton className={classes.buttonAgendar} aria-label="Agendar" color="secondary" onClick={() => props.history.push(`/agenda`)}>
                                <EventIcon  />
                            </IconButton>
                        </Tooltip>
                    </div>

                    <div style={{overflowY: 'auto', maxHeight: `calc( ${height}px - 340px)`}} className={classes.containerSessoes}>

                        {sessoes.length === 0 &&(

                            <div className={classes.containerNaoHaDados}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {`Sem dados para exibir`}
                                </Typography>
                            </div>
                        )}

                        {sessoes.map((item, idx) => {

                            return (
                                <Accordion key={item.id} expanded={expanded === item.id} onChange={handleChange(item.id)}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >

                                    <Tooltip title={handleTextSituacao(item.situacao)} placement="top">
                                        <span>
                                            {item.situacao === 1 && (
                                                <FiberManualRecordIcon className={classes.legendaIconAgendada}/>
                                            )}

                                            {item.situacao === 2 && (
                                                <FiberManualRecordIcon className={classes.legendaIconConcluida}/>
                                            )}

                                            {item.situacao === 3 && (
                                                <FiberManualRecordIcon className={classes.legendaIconCancelada}/>
                                            )}
                                        </span>
                                        
                                    </Tooltip>
                                    
                                    <Typography className={classes.heading} variant="subtitle1" color="textSecondary" component="p">{item.descricao}</Typography>
                                    <div className={classes.secondaryHeading}>
                                        <div className={classes.itemSecondaryHeading}>
                                            <EventAvailableIcon />
                                            <Typography variant="body1" color="textSecondary" className={classes.marginLeft1}>{`${moment(item.data_agendamento_final, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm')}`}</Typography>
                                        </div>

                                        <div className={classes.itemSecondaryHeading}>
                                            <AccessTimeIcon  />
                                            <Typography variant="body1" color="textSecondary" className={classes.marginLeft1}>{`${calcDuration(item.data_agendamento_inicial, item.data_agendamento_final)} (min)`}</Typography>
                                        </div>
                                        
                                    </div>
                                    
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    
                                        <Grid container spacing={0} className={classes.container}>
                                        
                                            <Grid item sm={6} >
                                                <Divider />
                                                <List>
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <PlaceIcon />
                                                        </ListItemIcon>
                                                        <ListItemText classes={{
                                                            secondary: classes.secondary
                                                        }}
                                                            primary="Local da agenda"
                                                            secondary={item.locaisReuniao ? item.locaisReuniao.descricao : null}
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
                                                            secondary={item.agentes ? item.agentes.nome : null}
                                                        />
                                                    </ListItem>
                                                </List>

                                            </Grid>

                                            <Grid item sm={6} >
                                                <Divider />
                                                <List>
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <StyleIcon />
                                                        </ListItemIcon>
                                                        <ListItemText classes={{
                                                            secondary: classes.secondary
                                                        }}
                                                            primary="Convênio"
                                                            secondary={item.convenios ? item.convenios.nome : null}
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
                                                            secondary={parseFloat(item.valor_sessao).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}
                                                        />
                                                    </ListItem>
                                                </List>

                                            </Grid>

                                            <Grid item sm={12} >

                                                <List>
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <AccessibilityIcon />
                                                        </ListItemIcon>
                                                        <ListItemText classes={{
                                                            secondary: classes.secondary
                                                        }}
                                                            primary="Tratamentos"
                                                            secondary={handleTratamentosSessoes(item)}
                                                        />
                                                    </ListItem>

                                                    
                                                </List>

                                            </Grid>

                                        </Grid>

                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}

                    </div>

                </Paper>
            </Fragment>
        )
    }

    return (
        <Fragment>
            
            {renderBarra(props)}

            <Grid container spacing={2} className={classes.container}>

                <Grid item sm={4}> 
                    {renderInfoPaciente(props)}

                </Grid>

                <Grid item sm={8}> 
                    {renderInfoSessoes(props)}

                </Grid>

            </Grid>

        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        open: (data) => { dispatch(open(data)) },
    }
}

export default connect(null, mapDispatchToProps)(SessoesGeral)