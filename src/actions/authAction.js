import {SET_LOGGED, SET_AUTH, SET_IMAGE_AUTH, SET_RECUPERAR_SENHA} from '../reducers/authReducer'
import url from '../config/urlApi'
import axios from 'axios'
import handleError from '../base/errorHelper/errorHelper'
import AgentesController from '../controller/configuracoes/agentes/agentesController'
import ContasTenantController from '../controller/infra/contasTenantController'

import {open} from '../actions/alertDialogBaseAction'

const alterarValorLogged = isLogged => ({
    type: SET_LOGGED,
    payload: isLogged
})

export const alterarAuth = auth => ({
    type: SET_AUTH,
    payload: auth
})

export const alterarImageAuth = urlImage => ({
    type: SET_IMAGE_AUTH,
    payload: urlImage
})

export const setRecuperarSenha = value => ({
    type: SET_RECUPERAR_SENHA,
    payload: value
})


export const setValorIslogged = (isLogged) => (
   (dispatch, getState) => {
        
        dispatch(alterarValorLogged(isLogged))    
    }
)

export const setAuth = (auth) => (
    (dispatch, getState) => {
        
        axios.post(`${url}/signin`, {
            email: auth.email,
            password: auth.password
        })
        .then(function (response) {
        
            localStorage.setItem("token", `Bearer ${response.data.conteudo.token}`)
            localStorage.setItem("email", response.data.conteudo.email)
            localStorage.setItem("idtenant", response.data.conteudo.idtenant)
            localStorage.setItem("name", response.data.conteudo.name)
            localStorage.setItem("master", response.data.conteudo.master)
            localStorage.setItem("password", response.data.conteudo.password)
            localStorage.setItem("id", response.data.conteudo.id)
            localStorage.setItem("idagente", response.data.conteudo.idagente)
            
            axios.defaults.headers.common.Authorization = `Bearer ${response.data.conteudo.token}`

            dispatch(alterarAuth({
                isLogged: true,
                email: response.data.conteudo.email,
                idtenant: response.data.conteudo.idtenant,
                token: response.data.conteudo.token,
                name: response.data.conteudo.name,
                master: response.data.conteudo.master,
                password: response.data.conteudo.password,
                id: response.data.conteudo.id,
                idagente: response.data.conteudo.idagente
            }))

            dispatch(setImageAuth(response.data.conteudo.id))
        })
        .catch(function (error) {
            
            dispatch(open({
                title: "Falha de login",
                text: `Não foi possível se autenticar. \n\n Motivo: ${handleError(error)}`
            }))

        })    
     }
 )

 export const setImageAuth = () => (
    (dispatch, getState) => {
        
        if (!getState().auth.id) return

        if (!getState().auth.master) {

            new AgentesController().recuperarImagem(getState().auth.idagente, (ret) => {

                if (ret.status !== 200) {
                  return
                }
                
                if (ret.data.conteudo.caminho !== '') {
                    dispatch(alterarImageAuth(`${url}/${ret.data.conteudo.caminho}`)) 
                }
            
              }, (error) => {
            
                dispatch(open({
                    title: "Ops",
                    text: `Não foi possível recuperar a imagem. \n\n Motivo: ${handleError(error)}`
                }))
            })
        } else {

            new ContasTenantController().recuperarImagem(getState().auth.id, (ret) => {

                if (ret.status !== 200) {
                  return
                }
                
                if (ret.data.conteudo.caminho !== '') {
                    dispatch(alterarImageAuth(`${url}/${ret.data.conteudo.caminho}`)) 
                }
            
              }, (error) => {
            
                dispatch(open({
                    title: "Ops",
                    text: `Não foi possível recuperar a imagem. \n\n Motivo: ${handleError(error)}`
                }))
            })
        }
    }
 )
 

 export const setLogout = () => (
    (dispatch, getState) => {
            
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem("idtenant")
        localStorage.removeItem("name")
        localStorage.removeItem("master")
        localStorage.removeItem("password")
        localStorage.removeItem("idagente")

        dispatch(alterarAuth({
            isLogged: false,
            email: '',
            idtenant: 0,
            token: '',
            name: '',
            master: false,
            password: null,
            idagente: null
        }))
       
     }
 )