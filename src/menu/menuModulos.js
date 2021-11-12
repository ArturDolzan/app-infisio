import React, {Fragment, Suspense, lazy} from 'react'
import {Route, Redirect} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

import Home from '../home/home'
const Agenda = lazy(() => import('../agenda/agenda'))
const Clinica = lazy(() => import('../clinica/clinica'))
const Configuracoes = lazy(() => import('../configuracoes/configuracoes'))

const useStyles = makeStyles(theme => ({
    suspend: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    },
  }))

const MenuModulos = (props) => {

    const classes = useStyles()

    return (
        <Fragment>

            <main className={props.classes.content}>
                <div className={props.classes.toolbar} />
                
                <Route path="/home" component={Home}/>

                <Suspense fallback={
                        <div className={classes.suspend}>
                            <CircularProgress/>
                        </div>
                    }>
                        <Route path="/agenda" component={Agenda}/>
                </Suspense>

                <Suspense fallback={
                        <div className={classes.suspend}>
                            <CircularProgress/>
                        </div>
                    }>
                        <Route path="/clinica" component={Clinica}/>
                </Suspense>

                <Suspense fallback={
                        <div className={classes.suspend}>
                            <CircularProgress/>
                        </div>
                    }>
                        <Route path="/configuracoes" component={Configuracoes}/>
                </Suspense>

                <Route exact path="/" render={() => (
                    <Redirect to="/home"/>
                )}/>

            </main>

        </Fragment>
    )
}

export default MenuModulos