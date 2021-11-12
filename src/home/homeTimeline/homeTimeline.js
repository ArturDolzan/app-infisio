import React, {Fragment, useEffect, useState, useLayoutEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import AccessibilityIcon from '@material-ui/icons/Accessibility'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import NightsStayIcon from '@material-ui/icons/NightsStay'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms"
import Tooltip from '@material-ui/core/Tooltip'
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied"
import moment from 'moment'
import 'moment/locale/pt-br'
import handleError from '../../base/errorHelper/errorHelper'
import {open} from '../../actions/alertDialogBaseAction'
import {openSnackBase} from '../../actions/snackBaseAction'
import { connect, useSelector } from "react-redux"

import SessoesController from '../../controller/clinica/sessoes/sessoesController' 

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
    },
    rootPaper: {
        paddingTop: theme.spacing(2),
    },
    paper: {
      padding: '6px 16px',
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main,
    },
    sunIcon: {
        color: "#f0a500"
    },
    nightIcon: {
        color: "blue"
    },
    doneIcon: {
        color: "#FFF",
        backgroundColor: "#33B679",
    },
    fisioIcon: {
        color: "#51adcf",
        outlineColor: "#FFF"
    },
    cancelIcon: {
        color: "red",
        backgroundColor: "#fff",
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

const HomeTimeline = (props) => {

    const classes = useStyles()
    const auth = useSelector(state => state.auth)

    const [width, height] = useWindowSize()

    const [dados, setDados] = useState([])

    useEffect(() => {

        recuperarDados()

        return () => {
        }        
    }, [])

    const recuperarDados = () => {

        new SessoesController().recuperarDadosTimelineSessoes({idagente: auth.idagente})
        .then(ret => {

            setDados(ret.data.conteudo)
        })
        .catch(error => {

            props.open({
                title: "Ops",
                text: `Não foi possível recuperar dados do gráfico. \n\n Motivo: ${handleError(error)}`
            })
        }) 
    }

    return (
        <Fragment>
        
            <Paper className={classes.rootPaper} elevation={1} >
                <div className={classes.container}>
                    {window.innerWidth < 400 ? 
                        <Typography variant="subtitle2" color="textSecondary">
                            {`No que você irá trabalhar hoje`}
                        </Typography>
                    :
                        <Typography variant="h6" color="textSecondary">
                            {`No que você irá trabalhar hoje`}
                        </Typography>
                    }
                    
                </div>

                <div style={{overflowY: 'auto', maxHeight: `calc( ${height}px - 220px)`}}>

                    <Timeline align="alternate">

                        <TimelineItem>
                            
                            <TimelineSeparator>
                                <TimelineDot>
                                    <WbSunnyIcon className={classes.sunIcon}/>
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="subtitle1" color="textPrimary">
                                        Bom-dia ;)
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Hoje é {moment().format('dddd')}
                                    </Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>

                        {dados.map((item, idx) => {

                            let sep = <Tooltip title="Sessão agendada" placement="top">
                                        <TimelineDot variant="outlined" color="inherit" className={classes.fisioIcon}>
                                            <AccessibilityIcon className={classes.fisioIcon}/>
                                        </TimelineDot>
                                    </Tooltip>

                            // atrasado
                            if (moment().isSameOrAfter(moment(item.data_agendamento_inicial, 'DD/MM/YYYY HH:mm'))){
                                
                                sep = <Tooltip title="Sessão agendada com atraso no lançamento de resultado" placement="top">
                                        <TimelineDot variant="outlined" color="inherit" className={classes.fisioIcon}>
                                            <AccessAlarmsIcon className={classes.fisioIcon}/>
                                        </TimelineDot>
                                    </Tooltip>
                            }

                            if (item.situacao === 2) {
                                sep = <Tooltip title="Sessão concluída" placement="top">
                                        <TimelineDot color="primary" className={classes.doneIcon}>
                                            <InsertEmoticonIcon className={classes.doneIcon}/>
                                        </TimelineDot>
                                    </Tooltip>
                            }

                            if (item.situacao === 3) {
                                sep = <Tooltip title="Sessão cancelada" placement="top">
                                        <TimelineDot color="primary" className={classes.cancelIcon}>
                                            <SentimentVeryDissatisfiedIcon className={classes.cancelIcon}/>
                                        </TimelineDot>
                                    </Tooltip>
                            }

                            return (
                                <TimelineItem key={item.id}>
                                    <TimelineOppositeContent>
                                        <Typography variant="body2" color="textSecondary">
                                            {item.horario} hrs
                                        </Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        {sep}
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Paper elevation={3} className={classes.paper}>
                                            <Typography variant="subtitle1" color="textPrimary">
                                                {item.nomePaciente}
                                            </Typography>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                {item.descricao}
                                            </Typography>
                                        </Paper>
                                    </TimelineContent>
                                </TimelineItem>
                            )
                        })}

                        <TimelineItem>
                            
                            <TimelineSeparator>
                                <TimelineDot>
                                    <NightsStayIcon className={classes.nightIcon}/>
                                </TimelineDot>
                            
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="subtitle1" color="textPrimary">
                                        Boa-noite ^^
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Até amanhã...
                                    </Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>

                    </Timeline>
                </div>
            </Paper>
        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        openSnackBase: (text) => { dispatch(openSnackBase(text)) },
        open: (data) => { dispatch(open(data)) },
    }
}

export default connect(null, mapDispatchToProps)(HomeTimeline)