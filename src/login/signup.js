import React, {useState, Fragment} from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import axios from 'axios'
import url from '../config/urlApi'
import infisio_arte_login from '../base/images/infisio_arte_login.jpg'
import Pulse from 'react-reveal/Pulse'

import { connect } from "react-redux"
import {setValorIslogged, setAuth, setImageAuth, setRecuperarSenha} from '../actions/authAction'
import {open} from '../actions/alertDialogBaseAction'
import {openConfirmation} from '../actions/confirmationDialogBaseAction'


const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title:{
    color: "#000",
    fontWeight: 'bold'
  },
}))

const Signup = (props) => {
  
    const [data, setData] = useState({
        stageNew: false,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        loading: false
    }) 

    const handleChange = event => {
        setData({...data,
            [event.target.id]: event.target.value
        })
    }

    const validateForm = () => {
        return (!data.stageNew && data.email.length > 0 && data.password.length > 0) 
            || (data.stageNew && data.name.length > 0 && data.email.length > 0 && data.password.length > 0 && data.confirmPassword.length > 0 && data.password === data.confirmPassword)
    }

    const login = () => {

        if (!data.stageNew) {
            props.setAuth(data)
        } else {

			//props.setNewAuth(data)
			newAuth((response) => {

					props.open({
						title: "Nova Conta",
						text: `Bem-vindo ${data.name} =) Sua conta foi criada com sucesso! \n\n Um e-mail foi encaminhado para ativar sua conta. Favor verificar sua caixa de entrada...`
					})

					setData({...data, stageNew: !data.stageNew})

			}, (error) => {
				
				props.open({
					title: "Nova Conta",
					text: `Ops =( Ocorreu um erro ao criar a conta. \n Detalhe: ${error.response.data}`
				})

			})

		}
        
	}
		
	const newAuth = (cbSucess, cbError) => {

		axios.post(`${url}/signup`, {
					email: data.email,
		password: data.password,
		name: data.name,
					idplano: 2
			})
			.then(cbSucess)
			.catch(cbError)
    }
    
    const handleEsqueciMinhaSenha = () => {

        if (data.email.length === 0) {
			props.open({
			title: "Esqueci senha",
			text: `Informe o e-mail para iniciar a recuperação de sua senha`
			})

			return
		}

		props.openConfirmation({
            title: "Confirmação",
            text: `Deseja iniciar o processo de recuperar a senha?`,
            data: {...data},
            cbYes: (value) => {

				axios.post(`${url}/iniciarRecuperarSenha`, {
					email: value.email
				})
				.then(() => {
					props.open({
						title: "Atenção",
						text: `Foi encaminhado um e-mail para ${value.email}. Verifique sua caixa de e-mail, incluindo spam e depois retorne para cadastrar uma nova senha`
					})
				   
					props.setRecuperarSenha({
						isRecuperarSenha: true,
						emailRecuperarSenha: value.email
					})
		
				})
				.catch(error => {
					
					props.open({
						title: "Atenção",
						text: `${error.response.data}`
					})
				})             
            }
        })
    }

    const classes = useStyles()

  return (
    <Fragment>
        <div className="containerLogoImage">
          <div className="wrapper fadeInDown">
          
              <div id="formContent">
                
                  <div className="fadeIn first marginTop25px">
                      
                      <Pulse forever={true}>
                          <Typography className={classes.title} component="h1" variant="h3">
                               InFisio
                          </Typography>
                      </Pulse>
                      
                  </div> 

                    <Container component="main" maxWidth="xs">
                      <CssBaseline />
                      <div >
                      
                        <Typography className={classes.title} component="h1" variant="h6">
                          Bem-vindo
                        </Typography>
                        <form className={classes.form} noValidate>

                            {data.stageNew && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                    <TextField
                                        autoComplete="fname"
                                        name="name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Nome"
                                        autoFocus
                                        value={data.name}                
                                        onChange={handleChange}
                                    />
                                    </Grid>
                                </Grid>
                            )}
                            
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                value={data.email}
                                onChange={handleChange}
                                
                              />
                            </Grid>
                            
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={data.password}
                                onChange={handleChange}
                              />
                            </Grid>
                            {data.stageNew && (
                                <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirmação de senha"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                />
                                </Grid>
                            )}
                            
                            
                          </Grid>
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!validateForm()}
                            onClick={login}
                          >
                            {data.stageNew ? "Criar conta" : "Acessar"}
                          </Button>
                          <Grid container justify="center" style={{marginBottom: "25px"}}>
                            <Grid item xs={12}>
                              <Link                 
                                onClick={() => setData({...data, stageNew: !data.stageNew})}                 
                                variant="body2"
                                style={{cursor: "pointer"}}
                                >
                                {!data.stageNew ? "Não possui conta?" : "Já possui conta? Acesse aqui"}
                              </Link>
                            </Grid>

                            <Grid item xs={12}>
                              <Link                 
                                onClick={handleEsqueciMinhaSenha}                 
                                variant="body2"
                                style={{cursor: "pointer"}}
                                >
                                Esqueci a minha senha :(
                              </Link>
                            </Grid>
                          </Grid>
                        </form>
                      </div>
                      
                    </Container>

              </div>
          </div>
        </div>
    </Fragment>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setValorIslogged: (auth) => { dispatch(setValorIslogged(auth)) },
		setAuth: (auth) => { dispatch(setAuth(auth)) },
		setRecuperarSenha: (value) => { dispatch(setRecuperarSenha(value)) },
        setImageAuth: (id) => { dispatch(setImageAuth(id)) },
		open: (data) => { dispatch(open(data)) },
		openConfirmation: (data) => { dispatch(openConfirmation(data)) },
    }
}

export default connect(null, mapDispatchToProps)(Signup)