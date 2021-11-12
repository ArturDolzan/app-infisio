import React, {Fragment, useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Avatar from '@material-ui/core/Avatar'
import { connect } from "react-redux"
import {open} from '../actions/alertDialogBaseAction'
import url from '../config/urlApi'
import userPng from '../base/images/user.png'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Zoom from 'react-reveal/Zoom'

const useStyles = makeStyles(theme => ({
  root: {
      margin: theme.spacing(1),
      cursor: "pointer"    
  },  
  bigger: {
      width: "100px",
      height: "100px",
      fontSize: "50px"
  },
  divSpan: {
	  position: "absolute",
	  marginTop: "-15px",
	  marginLeft: "35px",
  },
  divIcon: {
	  backgroundColor: "rgb(158,158,158, 0.3)",	
  },
  input: {
    display: 'none',
  },
  img: {
    maxWidth: "100%",
    height: "auto",
  },
}))

const ImageAvatarEditBase = (props) => {

  const classes = useStyles()

  const [urlImage, setUrlImage] = useState(null)
  const [renderAvatar, setRenderAvatar] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {

    recuperar()

    return () => {
        
    }        
}, [])

const recuperar = () => {

	if (props.id === 0) {
		
		setUrlImage(userPng)
		setRenderAvatar(true)

		return true
	}

  props.controller.recuperarImagem(props.id, (ret) => {

    if (ret.status !== 200) {
      setUrlImage(userPng)
      setRenderAvatar(true)
      return
    }
    
    if (ret.data.conteudo.caminho === '') {
      setUrlImage(userPng)
      setRenderAvatar(true)
      return
    }
	
	setUrlImage(`${url}/${ret.data.conteudo.caminho}`)

	setRenderAvatar(true)

  }, (error) => {

      props.open({
          title: "Ops",
          text: `Não foi possível recuperar a imagem. \n Erro: ${error.response.statusText}`
      })
  })
}

const handleImageChangePhoto = (event) => {
  
	if (event.target.files && event.target.files[0]) {
		let reader = new FileReader()
		reader.onload = (e) => {
			
			setUrlImage(e.target.result)
			
			props.changeImage(e.target.result)
		}
		reader.readAsDataURL(event.target.files[0]);
	}
}

const handleOpen = () => {

  if (!urlImage) {
    return
  }

  setOpen(true)
}

const handleClose = () => {

  setOpen(false)
}

  return (
    <Fragment >
        <Zoom top>
            <div className={classes.root}>
              
                {renderAvatar && (
                  <Avatar className={`${props.isBig ? classes.bigger : ''}`} src={urlImage} onClick={handleOpen}/>
                )} 

                {props.changeImage && (
                  <Fragment>
                    <Tooltip title="Editar foto" placement="right-end">
                      <span className={classes.divSpan} >
                        <input accept="image/jpeg, image/png" className={classes.input} id="icon-button-file-photo" type="file" onChange={handleImageChangePhoto}/>
                        <label htmlFor="icon-button-file-photo">
                          <IconButton size={"small"} aria-label="Editar" className={classes.divIcon} component="span" aria-label="upload picture">
                            <EditIcon fontSize="small"/>
                          </IconButton>
                        </label>
                      </span>
                    </Tooltip>
                  </Fragment>
                )}

                

                <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
                  
                  <DialogContent>
                    <img src={urlImage} className={classes.img}/>
                  </DialogContent>
                  
                </Dialog>
                
            </div>
        </Zoom>
    </Fragment>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
      open: (data) => { dispatch(open(data)) }
  }
}

ImageAvatarEditBase.propTypes = {
    id: PropTypes.number,
	controller: PropTypes.any.isRequired,
	changeImage: PropTypes.any,	
    isBig: PropTypes.bool.isRequired
}


export default connect(null, mapDispatchToProps)(ImageAvatarEditBase)