import React, {Fragment, useEffect, useState} from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AutoRenewIcon from '@material-ui/icons/Autorenew'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import FilterListIcon from '@material-ui/icons/FilterList'
import Divider from '@material-ui/core/Divider'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/pt-br'

import { connect, useSelector } from "react-redux"
import {openSnackBase} from '../../actions/snackBaseAction'
import {open} from '../../actions/alertDialogBaseAction'
import {openConfirmation} from '../../actions/confirmationDialogBaseAction'
import handleError from '../../base/errorHelper/errorHelper'
import AutoComplete from '../../base/autoComplete'
import LaunchSessao from './launchSessao'
import ResumeSessao from './resumeSessao'

import {openDialogForm, closeDialogForm} from '../../actions/formDialogBaseAction'

import SessoesController from '../../controller/clinica/sessoes/sessoesController'
import AgentesController from '../../controller/configuracoes/agentes/agentesController'
import CadastroAgentes from '../../configuracoes/agentes/cadastroAgente'
import LocaisReuniaoController from '../../controller/configuracoes/locaisReuniao/locaisReuniaoController'
import CadastroLocaisReuniao from '../../configuracoes/locaisReuniao/cadastroLocaisReuniao'

const localizer = momentLocalizer(moment) 
const corAgendada = "#51adcf"
const corConcluida = "#28df99"
const corCancelada = "#ff414d"

const useStyles = makeStyles(theme => ({       
    root:{
        display: 'flex'
    },
    backButton: {
        marginLeft: theme.spacing(2),
    },
    paperHeader:{
        display: "flex",
        boxShadow: "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
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
    inserirNovo: {
        color: '#009900',
        "&:hover": {
            backgroundColor: "#e5ffe5"
        },
    },
    calendarContainer:{
        flex: 12
    },
    filterContainer: {
        minWidth: '250px',
        marginRight: theme.spacing(2),
    },
    filterTitle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    filterContent: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(2),
        width: '90%',
        marginBottom: theme.spacing(2),
    },
    filterItem: {
        marginTop: theme.spacing(2),
    },
    filterIcon: {
        marginRight: theme.spacing(1),
    },
    legendaContainer: {
        marginTop: theme.spacing(2),
    },
    legendaTitle: {
        marginBottom: theme.spacing(1)
    },
    legendaItem: {
        display: 'flex',
        paddingLeft: theme.spacing(1),
    },
    legendaItemText: {
        marginTop: "3px",
        marginLeft: theme.spacing(1),
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
    paperCalendar: {
        display: "flex",
        boxShadow: "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
        padding: theme.spacing(2),
        overflowY: 'auto',
        height: '70vh',
        width: '100%'
    }
}))

const CalendarInfisio = (props) => {

    const {values, setFieldValue, initialValues} = props

    const classes = useStyles()
    const auth = useSelector(state => state.auth)

    const [launchSessaoData, setLaunchSessaoData] = useState({})
    const [launchSessaoOpened, setLaunchSessaoOpened] = useState(false)
    const [resumeSessaoData, setResumeSessaoData] = useState({})
    const [resumeSessaoOpened, setResumeSessaoOpened] = useState(false)

    const [period, setPeriod] = useState({start: moment().startOf('week').toDate(), end: moment().endOf('week').toDate()})
    const [events, setEvents] = useState([])
    const [minTimeScroll, SetMinTimeScroll] = useState(moment().subtract({'hours': 1}).toDate())
    const [filtros, setFiltros] = useState({
        idlocalreuniao: null,
        descricaoLocalReuniao: null,
        idagente: parseInt(auth.idagente),
        descricaoAgente: auth.name,
        recuperarCanceladas: false
    })

    useEffect(() => {

        loadCalendar()

        return () => {
            
        }        
    }, [period, filtros])

    const loadCalendar = () => {

        let controller = new SessoesController()

        let dates = {...period}

        let dto = {
            dataInicial: moment(dates.start).format('DD/MM/YYYY'),
            dataFinal: moment(dates.end).format('DD/MM/YYYY'),
            idagente: filtros.idagente,
            idlocalreuniao: filtros.idlocalreuniao,
            recuperarCanceladas: filtros.recuperarCanceladas
        }

        controller.recuperarPeriodo(dto)
        .then(ret => {

            let appointments = ret.data.conteudo.map((item, idx) => {                
                
                let dataInicial = moment(item.data_agendamento_inicial, 'DD/MM/YYYY HH:mm').toDate()
                let dataFinal = moment(item.data_agendamento_final, 'DD/MM/YYYY HH:mm').toDate()

                return { title: item.descricao, start: dataInicial, end: dataFinal, desc: item.observacao, data: {...item} }
            })
            
            setEvents(appointments)
        })
        .catch(error => {

            props.open({
                title: "Ops",
                text: `Não foi possível carregar a agenda. \n\n Motivo: ${handleError(error)}`
            })
        })    
    }

    const handleSlotSelected = (slotInfo) => {
 
        setLaunchSessaoData(
            {
                ...launchSessaoData, 
                data_agendamento_inicial: moment(slotInfo.start).format('DD/MM/YYYY HH:mm'), 
                data_agendamento_final: moment(slotInfo.end).format('DD/MM/YYYY HH:mm'), 
                idpaciente: null, 
                idagente: null, 
                idconvenio: null, 
                valor_sessao: null, 
                descricao: null, 
                observacao: null, 
                id: null 
            }
        )

        renderAgendarNovaSessao()
    }

    const handleRefresh = (e) => {

        loadCalendar()
    }

    const handleEventSelected = (event) => {
    
        setResumeSessaoData(
            {
                ...resumeSessaoData, 
                ...event.data, 
                data_agendamento_inicial: moment(event.start).format('DD/MM/YYYY HH:mm'), 
                data_agendamento_final: moment(event.end).format('DD/MM/YYYY HH:mm')
            }
        )
        setResumeSessaoOpened(true)
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        
        let backgroundColor = corAgendada

        let {situacao} = event.data

        if (situacao === 3) backgroundColor = corCancelada

        if (situacao === 2) backgroundColor = corConcluida

        let style = {
            backgroundColor: backgroundColor,
            borderRadius: '5px',
            opacity: 0.9,
            color: '#FFF',
            border: '0px',
            display: 'block',
            "&:hover": {
                backgroundColor: "#fff"
            },
        }
        return {
            style: style
        }
    }

    const handleRangeChange = dates => {

        if (!dates.start && !dates.end && !dates[0]) {
            
            dates = {start: moment(dates).startOf('week').toDate(), end: moment(dates).endOf('week').toDate()}
            
        } else if (dates[0]) {

            if (!dates[6]) {
                dates = {start: moment(dates[0]).toDate(), end: moment(dates[0]).add('1', 'days').toDate()}
            } else {
                dates = {start: moment(dates[0]).startOf('week').toDate(), end: moment(dates[6]).endOf('week').toDate()}
            }
        }

        setPeriod({...dates})
    }

    const clickAgendarNovaSessao = () => {

        setLaunchSessaoData(
            {
                ...launchSessaoData, 
                data_agendamento_inicial: moment().format('DD/MM/YYYY HH:mm'), 
                data_agendamento_final: moment().format('DD/MM/YYYY HH:mm'), 
                idpaciente: null, 
                idagente: null, 
                idconvenio: null, 
                valor_sessao: null, 
                descricao: null, 
                observacao: null, 
                id: null
            }
        )

        renderAgendarNovaSessao()
    }

    const renderAgendarNovaSessao = () => {

        setLaunchSessaoOpened(true)
    }

    const renderEventTooltip = (event) => {

        return (
            <Fragment>
                <span>
                    <p>Paciente: {event.data.pacientes.nome}</p>
                    <p>Descrição: {event.title}</p>
                    <p>Profissional: {event.data.agentes.nome}</p>
                </span>
            </Fragment>
        )
    }

    const renderEvent = (props) => {
        
        return (
          <Fragment>         
             <Tooltip title={
                <div>
                    <Typography variant="subtitle1">Paciente: {props.event.data.pacientes.nome}</Typography>
                    <Typography variant="caption">Descrição: {props.event.title}</Typography>
                    <br/>
                    <Typography variant="caption">Profissional: {props.event.data.agentes.nome}</Typography>
                </div>} placement="top">
                <div>
                    <Typography variant="subtitle1">
                        {props.event.data.pacientes.nome}
                    </Typography>
                    <Typography variant="caption">
                        {props.event.title}
                    </Typography>            
                </div>
            </Tooltip>
          </Fragment>
        )
    }
  
    return (
        <Fragment>

            <LaunchSessao
                {...props}
                launchSessaoOpened={launchSessaoOpened}
                onClose={() => setLaunchSessaoOpened(false)}
                dados={launchSessaoData}
                onSave={() => loadCalendar()}
            />

            <ResumeSessao
                {...props}
                resumeSessaoOpened={resumeSessaoOpened}
                onClose={() => setResumeSessaoOpened(false)}
                dados={resumeSessaoData}
                onSave={() => loadCalendar()}
                onEdit={(dados) => {
                    setLaunchSessaoData({...dados})
                    setLaunchSessaoOpened(true)
                }}
            />
          
             <Paper className={classes.paperHeader}>
                <div className={classes.divPaperHeaderGrid}>
                    <Tooltip title="Voltar" placement="right-end">
                        <IconButton className={classes.backButton} aria-label="Voltar" color="primary" onClick={() => props.history.goBack()}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h6">
                        Agenda
                    </Typography>
                    <Tooltip title="Atualizar" placement="right-end">
                        <IconButton className={classes.marginLeft2} aria-label="Atualizar" color="primary" onClick={handleRefresh}>
                            <AutoRenewIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Realizar novo agendamento" placement="right-end">
                        <IconButton className={classes.inserirNovo} aria-label="Realizar novo agendamento" color="secondary" onClick={clickAgendarNovaSessao}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>

                </div>
            </Paper>

            <div className={classes.root}>

                <div className={classes.filterContainer} >
                    <Paper className={classes.paperHeader}>
                        <div className={classes.filterContent}>
                            
                            <Typography className={classes.filterTitle} variant="h6">
                                <FilterListIcon className={classes.filterIcon}/>
                                Filtros
                            </Typography>                                
                            
                            <div className={classes.filterItem}>
                                <AutoComplete
                                    id="idagente"
                                    label="Profissional"
                                    controller={new AgentesController()}
                                    cadastroSearch={CadastroAgentes}
                                    chave="id"
                                    valor="nome"
                                    required={false}                                
                                    defaultChave={filtros.idagente}
                                    defaultValor={filtros.descricaoAgente}
                                    getValueSelected={(event, value) => {
                                        
                                        setFiltros({
                                            ...filtros,
                                            idagente: value ? value.id : null,
                                            descricaoAgente: value ? value.nome : null
                                        })                                        
                                    }}
                                />
                            </div>

                            <div className={classes.filterItem}>
                                <AutoComplete
                                    id="idlocalreuniao"
                                    label="Local de agenda"
                                    controller={new LocaisReuniaoController()}
                                    cadastroSearch={CadastroLocaisReuniao}
                                    chave="id"
                                    valor="descricao"
                                    required={false}                                
                                    defaultChave={filtros.idlocalreuniao}
                                    defaultValor={filtros.descricaoLocalReuniao}
                                    getValueSelected={(event, value) => {
                                        
                                        setFiltros({
                                            ...filtros,
                                            idlocalreuniao: value ? value.id : null,
                                            descricaoLocalReuniao: value ? value.descricao : null
                                        })
                                    }}
                                />
                            </div>

                            <div className={classes.filterItem}>
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={filtros.recuperarCanceladas}
                                        onChange={(event, value) => {
                                            
                                            setFiltros({
                                                ...filtros,
                                                recuperarCanceladas: value
                                            })
                                        }}
                                        name="recuperarCanceladas"
                                        color="primary"
                                    />
                                    }
                                    label="Exibir canceladas"
                                />                               
                            </div>

                            <Divider />

                            <div className={classes.legendaContainer}>

                                <Typography className={classes.legendaTitle} variant="body2">                                    
                                    Legenda
                                </Typography>

                                <div className={classes.legendaItem}>
                                    <FiberManualRecordIcon className={classes.legendaIconAgendada}/>
                                    <Typography className={classes.legendaItemText} variant="body2" color="textSecondary">                                    
                                        Agendado
                                    </Typography>                                    
                                </div>

                                <div className={classes.legendaItem}>
                                    <FiberManualRecordIcon className={classes.legendaIconConcluida}/>
                                    <Typography className={classes.legendaItemText} variant="body2" color="textSecondary">                                    
                                        Concluído
                                    </Typography>                                    
                                </div>

                                <div className={classes.legendaItem}>
                                    <FiberManualRecordIcon className={classes.legendaIconCancelada}/>
                                    <Typography className={classes.legendaItemText} variant="body2" color="textSecondary">                                    
                                        Cancelado
                                    </Typography>                                    
                                </div>
                                
                            </div>
                        </div>
                    </Paper>
                </div>
                
                <Paper className={classes.paperCalendar}>
                    <Calendar
                        localizer={localizer}
                        onRangeChange={handleRangeChange}
                        events={events}                    
                        startAccessor="start"
                        endAccessor="end"
                        defaultView="week"
                        views={['day', 'week', 'month']}                        
                        defaultDate={new Date()}
                        selectable={true}
                        onSelectSlot={slotInfo => handleSlotSelected(slotInfo)}
                        onSelectEvent={event => handleEventSelected(event)}
                        eventPropGetter={(eventStyleGetter)}
                        components={{ event: renderEvent }}
                        popup
                        tooltipAccessor={event => {                        
                            return null//`Paciente ${event.data.pacientes.nome} - ${event.title}` 
                        }}
                        scrollToTime={ minTimeScroll }
                        messages={{next:"Próximo",previous:"Anterior",today:"Hoje", month: 'Mês', week: 'Semana', day: 'Dia', agenda: 'Eventos', noEventsInRange: 'Não há eventos'}}                    
                    />
                </Paper>
                
            </div>
        
            
        </Fragment>
    )  
}

const mapStateToProps = state => {
    return {
      formOpened: state.formDialogBase.opened
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        openSnackBase: (text) => { dispatch(openSnackBase(text)) },
        open: (data) => { dispatch(open(data)) },
        openDialogForm: (data) => { dispatch(openDialogForm(data)) },
        closeDialogForm: (data) => { dispatch(closeDialogForm(data)) },
        openConfirmation: (data) => { dispatch(openConfirmation(data)) },
    }
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CalendarInfisio))
