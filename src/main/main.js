import React, {Fragment, useEffect} from 'react'
import Menu from '../menu/menu'
import Signup from '../login/signup'
import RecuperarSenha from '../login/recuperarSenha'
import url from '../config/urlApi'
import BackdropBase from '../base/backdropBase'
import AlertDialogBase from '../base/alertDialogBase'
import ConfirmationDialogBase from '../base/confirmationDialogBase'
import FormDialogBase from '../base/formDialogBase'
import CircularProgressBase from '../base/circularProgressBase'
import SnackBase from '../base/snackBase'

import { useSelector, connect } from "react-redux"
import axios from "axios"

import {setValorIslogged, alterarAuth, setLogout, setImageAuth, setRecuperarSenha} from '../actions/authAction'
import {openCircularProgress, closeCircularProgress} from '../actions/circularProgressBaseAction'

const Main = (props) => {

    const [processed, setProcessed] = React.useState(false)

    const auth = useSelector(state => state.auth)

    useEffect(() => {

        axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            props.openCircularProgress()

            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          })

        axios.interceptors.response.use(function (response) {
            // Do something with response data

            props.closeCircularProgress()

            return response
          }, function (error) {
            // Do something with response error
            props.closeCircularProgress()
            
            if(error.response.status === 401) { handle401() }
    
            // Trow errr again (may be need for some other catch)
            return Promise.reject(error)
        })
        
        let token = localStorage.getItem("token")
        let email = localStorage.getItem("email")
        let idtenant = localStorage.getItem("idtenant")
        let name = localStorage.getItem("name")
        let password = localStorage.getItem("password")
        let master = localStorage.getItem("master") === 'true'
        let id = localStorage.getItem("id")
        let idagente = localStorage.getItem("idagente")

        if (token) {

            axios.defaults.headers.common.Authorization = `${token}`

            //-- Validar token no backend

            validarToken((data) => {
                
                if (data.response) {

                    if (data.response.status === 401) {
                        
                        axios.defaults.headers.common.Authorization = null
                        props.setValorIslogged(false)
                        setProcessed(true)

                        return false
                    }
                }

                props.setValorIslogged(true)

                props.alterarAuth({
                    isLogged: true,
                    email: email,
                    idtenant: idtenant,
                    token: token,
                    name,
                    password,
                    master,
                    id,
                    idagente
                })

                props.setImageAuth()

                setProcessed(true)
            })

        } else {

            axios.defaults.headers.common.Authorization = null
            props.setValorIslogged(false)

            setProcessed(true)
        }

        return () => {
            axios.interceptors.request.use(null)
            axios.interceptors.response.use(null)
        }     
      }, [])

    const validarToken = (cb) => {

        axios.post(`${url}/validarToken`)
        .then(cb)
        .catch(cb)
    }

    const handle401 = () => {

        if (processed) {
            props.setLogout()
        }        
    }

      const renderMain = () => {

        return (
            <Fragment>
                
                {auth.isRecuperarSenha
                ?
                <RecuperarSenha/>
                :
                <Fragment>   
                    {!auth.isLogged && (
                        <Signup/>
                    )}             
        
                    {auth.isLogged && (
                        <Menu/>
                    )}
                </Fragment>
                }
               
                <AlertDialogBase/>
                <ConfirmationDialogBase/>
                <FormDialogBase/>
                <CircularProgressBase/>
                <SnackBase/>

            </Fragment>
        )
      }

    return (
        <Fragment>
             
             {!processed ? (
                 <BackdropBase/>
             ) : 
               (
                renderMain()
               )
            }            
        
        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setValorIslogged: (auth) => { dispatch(setValorIslogged(auth)) },
        setImageAuth: () => { dispatch(setImageAuth()) },
        setRecuperarSenha: (value) => { dispatch(setRecuperarSenha(value)) },
        alterarAuth: (auth) => { dispatch(alterarAuth(auth)) },
        setLogout: () => { dispatch(setLogout()) },
        openCircularProgress: () => { dispatch(openCircularProgress()) },
        closeCircularProgress: () => { dispatch(closeCircularProgress()) }
    }
}

export default connect(null, mapDispatchToProps)(Main)