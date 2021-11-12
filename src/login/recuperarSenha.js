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
import Pulse from 'react-reveal/Pulse'
import handleError from '../base/errorHelper/errorHelper'

import { connect, useSelector } from "react-redux"
import {setValorIslogged, setAuth, setImageAuth, setRecuperarSenha} from '../actions/authAction'
import {open} from '../actions/alertDialogBaseAction'


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

const RecuperarSenha = (props) => {

  const auth = useSelector(state => state.auth)
  
    const [data, setData] = useState({    
        password: "",
        confirmPassword: ""
    }) 

    const handleChange = event => {
        setData({...data,
            [event.target.id]: event.target.value
        })
    }

    const validateForm = () => {
        return ( data.password.length > 0 && data.confirmPassword.length > 0 && data.password === data.confirmPassword)
    }

	const redefinirSenha = () => {

      	let email = auth.emailRecuperarSenha

		axios.post(`${url}/executarRecuperarSenha`, {
			email,
            password: data.password
		})
		.then(() => {
			props.open({
				title: "Sucesso",
				text: `Senha redefinida com sucesso!`
			})
		   
			props.setRecuperarSenha({
				isRecuperarSenha: false,
				emailRecuperarSenha: null
			})

		})
		.catch(error => {
			props.open({
				title: "Atenção",
				text: `Erro ao recuperar senha. Motivo: ${handleError(error)}`
			})
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
                          Recuperar Senha
                        </Typography>
                        <form className={classes.form} noValidate>

                          <Grid container spacing={2}>
                          
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Nova senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={data.password}
                                onChange={handleChange}
                              />
                            </Grid>
                            
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirmação de nova senha"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                value={data.confirmPassword}
                                onChange={handleChange}
                            />
                            </Grid>
                            
                          </Grid>
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!validateForm()}
                            onClick={redefinirSenha}
                          >
                           Redefinir Senha
                          </Button>
                         
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
        setImageAuth: (id) => { dispatch(setImageAuth(id)) },
		open: (data) => { dispatch(open(data)) },
		setRecuperarSenha: (value) => { dispatch(setRecuperarSenha(value)) },
    }
}

export default connect(null, mapDispatchToProps)(RecuperarSenha)