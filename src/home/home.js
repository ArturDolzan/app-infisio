import React, {Fragment, useEffect} from 'react'

import { connect, useSelector } from "react-redux"
import {openDialogForm} from '../actions/formDialogBaseAction'
import {open} from '../actions/alertDialogBaseAction'
import LaunchDialog from './launchDialog/launchDialog'
import ClinicasController from '../controller/clinica/clinicas/clinicasController'
import Typography from '@material-ui/core/Typography'
import Fade from 'react-reveal/Fade'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import HomeTimeline from './homeTimeline/homeTimeline'
import HomeGrafico from './homeGrafico/homeGrafico'
  
const useStyles = makeStyles(theme => ({
    container: {
       flex: 12,
       marginTop: theme.spacing(1),  
    },
    
}))

const Home = (props) => {

    const classes = useStyles()

    const auth = useSelector(state => state.auth)

    useEffect(() => {

        checkFirstClinic()

        return () => {
            
        }        
    }, [])

    const checkFirstClinic = () => {

        let clinicasController = new ClinicasController()
        clinicasController.recuperar(1, 1, [], (ret) => {

            if (ret.data.conteudo.results.length === 0) {
                renderLaunchClinicDialog()
            }

        }, (error) => {

            props.open({
                title: "Ops",
                text: `Não foi possível ler a clínica. \n Erro: ${error.response.statusText}`
            })
        })
    }

    const renderLaunchClinicDialogContent = () => {

        return (
            <Fragment>

                <LaunchDialog/>
            </Fragment>
        )
    }

    const renderLaunchClinicDialog = () => {

        props.openDialogForm({
            title: "Olá",
            content: renderLaunchClinicDialogContent(),
            actions: null,
            maxWidth: 'md',
            minHeight: '400px'
        })
    }

    return (
        <Fragment>
            <Fade left>
                <Typography variant="h5" color="primary">
                    {`Bem vindo, ${auth.name}`}
                </Typography>
            </Fade>

            <Grid container spacing={2} className={classes.container}>

                <Grid item sm={6} >
                    <Fade>
                        <HomeTimeline/>
                    </Fade>
                </Grid>

                <Grid item sm={6} >
                    <Fade>
                        <HomeGrafico/>
                    </Fade>
                </Grid>
            </Grid>

        </Fragment>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        openDialogForm: (data) => { dispatch(openDialogForm(data)) },
        open: (data) => { dispatch(open(data)) }
    }
}

export default connect(null, mapDispatchToProps)(Home)