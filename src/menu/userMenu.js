import React, {Fragment, useEffect} from 'react'
import IconButton from '@material-ui/core/IconButton'
import StarIcon from '@material-ui/icons/Star'
import LetterAvatar from '../base/letterAvatar'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import ImageAvatarBase from '../base/imageAvatarBase'
import AgentesController from '../controller/configuracoes/agentes/agentesController'
import ContasTenantController from '../controller/infra/contasTenantController'

import QRCode from 'qrcode.react'

import { useSelector, connect } from "react-redux"
import {setLogout, setImageAuth} from '../actions/authAction'
import {open} from '../actions/alertDialogBaseAction'

const useStyles = makeStyles(theme => ({
    typography: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    text: {
        padding: theme.spacing(0.1),
    },
    button: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    divImagem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
        cursor: 'pointer'
    },
    input: {
        display: 'none',
    },
    star: {
        display: 'flex',
    }
}))

const UserMenu = (props) => {

    const auth = useSelector(state => state.auth)

    const [anchorEl, setAnchorEl] = React.useState(null)
    const classes = useStyles()

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        handleClose()

        props.setLogout()
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

	useEffect(() => {

		 return () => {	
		 }
    }, [])



    const renderAvatar = (isBig) => {

        return (
            <Fragment>
                {!auth.urlImage && (
                    renderAvatarWithNoPhoto(isBig)
                )}

                {auth.urlImage && (
                    renderAvatarWithPhoto(isBig)
                )}
            </Fragment>
        )
    }

    const renderAvatarWithPhoto = (isBig) => {

        return (
            <Fragment>
                <ImageAvatarBase
                     url={auth.urlImage}
                     isBig={isBig}
                />
            </Fragment>
        )
    }

    const renderAvatarWithNoPhoto = (isBig) => {

        return (
            <Fragment>
                <LetterAvatar isBig={isBig} letter={auth.email.substring(0,1) } />
            </Fragment>
        )
    }

    const alterarAvatar = () => {

        
    }

    const handleImageChange = (event) => {

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader()
            reader.onload = (e) => {
                
                if (!auth.master) {
                    
                    new AgentesController().salvarImagem(auth.idagente, e.target.result, ret => {
                        
                        props.setImageAuth()
                    },
                    error => {
                        props.open({
                            title: `Erro ao alterar imagem`,
                            text: `${error.message}`
                        })
                    })
                } else {

                    new ContasTenantController().salvarImagem(auth.id, e.target.result, ret => {
                        
                        props.setImageAuth()
                    },
                    error => {
                        props.open({
                            title: `Erro ao alterar imagem`,
                            text: `${error.message}`
                        })
                    })
                }
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    
    const renderDetailWindow = () => {

        return (
            <Fragment>
                
                <Container maxWidth="sm" className={classes.button}>

                    <Tooltip title="Editar foto" >
                        <div>
                            <input accept="image/jpeg, image/png" className={classes.input} id="icon-button-file" type="file" onChange={handleImageChange}/>
                            <label htmlFor="icon-button-file">
                                <div className={classes.divImagem} onClick={() => alterarAvatar()}>
                                    {renderAvatar(true)}
                                </div>
                            </label>
                        </div>
                    </Tooltip>

                    <Container maxWidth="sm" className={classes.typography}>
                        <Typography align="center" className={classes.text}>{auth.email}</Typography>
                        <Typography align="center" className={classes.text}>{auth.name}</Typography>
                        {auth.master && (
                            <div className={classes.star}>
                                <Typography align="center" className={classes.text}>Você é administrador</Typography>
                                <StarIcon/>
                            </div>
                            
                        )}
                    </Container>

                </Container>

                <Divider />

                <Container maxWidth="sm" className={classes.button}>

                    <Tooltip title="Autenticar no App InFisio" placement="top-end">
                        <div>
                        
                            <QRCode value={
                                JSON.stringify({
                                    email: auth.email,
                                    password: auth.password
                                })
                            }  />
                        </div>
                    </Tooltip>

                </Container>
                
                <Divider />
                <Container maxWidth="sm" className={classes.button}>
                    <Button variant="outlined" onClick={handleLogout}>Sair</Button>
                </Container>
            </Fragment>
        )
    }

    return (
        <Fragment>
   
            <IconButton
                aria-label="Notificações"
                aria-controls="menu-appbar"
                aria-haspopup="false"
                color="inherit"
                onClick={handleClick}                
            >
            
                {auth.isLogged && (
                    
                   renderAvatar(false)
                )}
                
                
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
            >
                {renderDetailWindow()}
            </Popover>
              
        </Fragment>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        setLogout: () => { dispatch(setLogout()) },
        setImageAuth: () => { dispatch(setImageAuth()) },
        open: (data) => { dispatch(open(data)) },
    }
}

export default connect(null, mapDispatchToProps)(UserMenu)