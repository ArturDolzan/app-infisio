import React, {Fragment, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import StyleIcon from '@material-ui/icons/Style'
import GroupIcon from '@material-ui/icons/Group'
import AccessibilityIcon from '@material-ui/icons/Accessibility'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import EventIcon from '@material-ui/icons/Event'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import {withRouter} from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import NewCard from "../../base/Card/NewCard.js"
import CardHeader from "../../base/Card/CardHeader.js"
import CardBody from "../../base/Card/CardBody.js"
import CardFooter from "../../base/Card/CardFooter.js"


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
      cardText: {
          paddingLeft: theme.spacing(1),
          paddingTop: theme.spacing(2),
      },
      inserirNovo: {
        color: '#009900',
        cursor: "pointer"
      },
      cardNew: {
        cursor: 'pointer',
        minHeight: '190px',
      },
      cardNewHeaderUp: {
        position: 'relative',
        transform: 'translateY(-20px)',
    	transition: 'all .3s ease-in-out'
      },
      cardNewHeaderNormal: {
        position: 'relative',
        transform: 'translateY(-0px)',
    	transition: 'all .3s ease-in-out'
      },
      cardNewTitle: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }
       
  }))

const ClinicaDashboard = ({match, history}) => {

    const classes = useStyles()

    const [hovered, setHovered] = useState(false)
    const [hoveredSession, setHoveredSession] = useState(false)
    const [hoveredTrat, setHoveredTrat] = useState(false)
    const [hoveredConv, setHoveredConv] = useState(false)

    return (
        <Fragment>
            
            <div className={classes.root}>
                <Fade>
                    <Grid container spacing={2}>
    
                        <Grid item sm={3}>

                            <NewCard >
                                <div className={classes.cardNew} 
                                    onClick={() => history.push(`${match.url}/paciente`)}
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                >
                                    <CardHeader color="info" className={hovered ? classes.cardNewHeaderUp : classes.cardNewHeaderNormal}>
                                        <GroupIcon fontSize={"large"} />
                                        <Typography className={classes.cardNewTitle} gutterBottom variant="h5" component="h2">
                                            Pacientes
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                    <Typography className={classes.cardText} variant="body2" color="textSecondary" component="p">
                                        Consultar, inserir, atualizar e remover pacientes
                                    </Typography>
                                    </CardBody>
                                </div>
                                <CardFooter chart>
                                    <Tooltip title="Inserir novo" placement="right-end">
                                        <AddCircleOutlineIcon className={classes.inserirNovo} color="secondary" onClick={() => history.push(`${match.url}/paciente/cadastro/0`)}/>
                                    </Tooltip>
                                </CardFooter>
                            </NewCard>

                        </Grid>

                        <Grid item sm={3}>

                            <NewCard >
                                <div className={classes.cardNew} 
                                    onClick={() => history.push(`${match.url}/sessoes`)}
                                    onMouseEnter={() => setHoveredSession(true)}
                                    onMouseLeave={() => setHoveredSession(false)}
                                >
                                    <CardHeader color="success" className={hoveredSession ? classes.cardNewHeaderUp : classes.cardNewHeaderNormal}>
                                        <EventAvailableIcon fontSize={"large"} />
                                        <Typography className={classes.cardNewTitle} gutterBottom variant="h5" component="h2">
                                            Sessões
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                    <Typography className={classes.cardText} variant="body2" color="textSecondary" component="p">
                                        Visualizar histórico de sessões por paciente
                                    </Typography>
                                    </CardBody>
                                </div>
                                <CardFooter chart>
                                    <Tooltip title="Agendar" placement="right-end">
                                        <EventIcon className={classes.inserirNovo} color="secondary" onClick={() => history.push(`/agenda`)}/>
                                    </Tooltip>
                                </CardFooter>
                            </NewCard>

                        </Grid>

                        <Grid item sm={3}>

                            <NewCard >
                                <div className={classes.cardNew} 
                                    onClick={() => history.push(`${match.url}/tratamentos`)}
                                    onMouseEnter={() => setHoveredTrat(true)}
                                    onMouseLeave={() => setHoveredTrat(false)}
                                >
                                    <CardHeader color="rose" className={hoveredTrat ? classes.cardNewHeaderUp : classes.cardNewHeaderNormal}>
                                        <AccessibilityIcon fontSize={"large"}/>
                                        <Typography className={classes.cardNewTitle} gutterBottom variant="h5" component="h2">
                                            Tratamentos
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                    <Typography className={classes.cardText} variant="body2" color="textSecondary" component="p">
                                        Consultar, inserir, atualizar e remover tratamentos
                                    </Typography>
                                    </CardBody>
                                </div>
                                <CardFooter chart>
                                    <Tooltip title="Inserir novo" placement="right-end">
                                        <AddCircleOutlineIcon className={classes.inserirNovo} color="secondary" onClick={() => history.push(`${match.url}/tratamentos/cadastro/0`)}/>
                                    </Tooltip>
                                </CardFooter>
                            </NewCard>

                        </Grid>

                        <Grid item sm={3}>

                            <NewCard >
                                <div className={classes.cardNew} 
                                    onClick={() => history.push(`${match.url}/convenio`)}
                                    onMouseEnter={() => setHoveredConv(true)}
                                    onMouseLeave={() => setHoveredConv(false)}
                                >
                                    <CardHeader color="warning" className={hoveredConv ? classes.cardNewHeaderUp : classes.cardNewHeaderNormal}>
                                        <StyleIcon fontSize={"large"}/>
                                        <Typography className={classes.cardNewTitle} gutterBottom variant="h5" component="h2">
                                            Convênios
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                    <Typography className={classes.cardText} variant="body2" color="textSecondary" component="p">
                                        Consultar, inserir, atualizar e remover convênios
                                    </Typography>
                                    </CardBody>
                                </div>
                                <CardFooter chart>
                                    <Tooltip title="Inserir novo" placement="right-end">
                                        <AddCircleOutlineIcon className={classes.inserirNovo} color="secondary" onClick={() => history.push(`${match.url}/convenio/cadastro/0`)}/>
                                    </Tooltip>
                                </CardFooter>
                            </NewCard>

                        </Grid>

                    </Grid>
                </Fade>
            </div>

            
        </Fragment>
    )
}

export default withRouter(ClinicaDashboard)