import React, {Fragment, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import EventIcon from '@material-ui/icons/Event'
import {withRouter} from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import WorkIcon from '@material-ui/icons/Work'
import { connect } from "react-redux"
import {open} from '../../actions/alertDialogBaseAction'
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

const ConfiguracoesDashboard = ({match, history, open}) => {

    const classes = useStyles()

    const [hovered, setHovered] = useState(false)
    const [hoveredCargos, setHoveredCargos] = useState(false)
    const [hoveredLocais, setHoveredLocais] = useState(false)

    return (
        <Fragment>
            
            <div className={classes.root}>
                <Fade>
                    <Grid container spacing={2}>

                        <Grid item sm={4}>

                            <NewCard >
                                <div className={classes.cardNew} 
                                    onClick={() => history.push(`${match.url}/agente`)}
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                >
                                    <CardHeader color="info" className={hovered ? classes.cardNewHeaderUp : classes.cardNewHeaderNormal}>
                                        <PermIdentityIcon fontSize={"large"}/>
                                        <Typography className={classes.cardNewTitle} gutterBottom variant="h5" component="h2">
                                            Usuários
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                    <Typography className={classes.cardText} variant="body2" color="textSecondary" component="p">
                                        Consultar, inserir, atualizar e remover usuários
                                    </Typography>
                                    </CardBody>
                                </div>
                                <CardFooter chart>
                                    <Tooltip title="Inserir novo" placement="right-end">
                                        <AddCircleOutlineIcon className={classes.inserirNovo} color="secondary" onClick={() => history.push(`${match.url}/agente/cadastro/0`)}/>
                                    </Tooltip>
                                </CardFooter>
                            </NewCard>

                        </Grid>

                        <Grid item sm={4}>

                            <NewCard >
                                <div className={classes.cardNew} 
                                    onClick={() => history.push(`${match.url}/cargo`)}
                                    onMouseEnter={() => setHoveredCargos(true)}
                                    onMouseLeave={() => setHoveredCargos(false)}
                                >
                                    <CardHeader color="danger" className={hoveredCargos ? classes.cardNewHeaderUp : classes.cardNewHeaderNormal}>
                                        <WorkIcon fontSize={"large"}/>
                                        <Typography className={classes.cardNewTitle} gutterBottom variant="h5" component="h2">
                                            Cargos
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                    <Typography className={classes.cardText} variant="body2" color="textSecondary" component="p">
                                        Consultar, inserir, atualizar e remover cargos
                                    </Typography>
                                    </CardBody>
                                </div>
                                <CardFooter chart>
                                    <Tooltip title="Inserir novo" placement="right-end">
                                        <AddCircleOutlineIcon className={classes.inserirNovo} color="secondary" onClick={() => history.push(`${match.url}/cargo/cadastro/0`)}/>
                                    </Tooltip>
                                </CardFooter>
                            </NewCard>

                        </Grid>

                        <Grid item sm={4}>

                            <NewCard >
                                <div className={classes.cardNew} 
                                    onClick={() => history.push(`${match.url}/locaisReuniao`)}
                                    onMouseEnter={() => setHoveredLocais(true)}
                                    onMouseLeave={() => setHoveredLocais(false)}
                                >
                                    <CardHeader color="rose" className={hoveredLocais ? classes.cardNewHeaderUp : classes.cardNewHeaderNormal}>
                                        <EventIcon fontSize={"large"}/>
                                        <Typography className={classes.cardNewTitle} gutterBottom variant="h5" component="h2">
                                            Locais de agenda
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                    <Typography className={classes.cardText} variant="body2" color="textSecondary" component="p">
                                        Consultar, inserir, atualizar e remover locais
                                    </Typography>
                                    </CardBody>
                                </div>
                                <CardFooter chart>
                                    <Tooltip title="Inserir novo" placement="right-end">
                                        <AddCircleOutlineIcon className={classes.inserirNovo} color="secondary" onClick={() => history.push(`${match.url}/locaisReuniao/cadastro/0`)}/>
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

const mapDispatchToProps = (dispatch) => {
    return {
        open: (data) => { dispatch(open(data)) }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(ConfiguracoesDashboard))