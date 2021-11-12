import React, {useState, useEffect, Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import AssignmentIcon from '@material-ui/icons/Assignment'
import CloseIcon from "@material-ui/icons/Close"
import handleError from '../../base/errorHelper/errorHelper'
import TextInputBase from '../../base/input/textInputBase'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import DescriptionIcon from "@material-ui/icons/Description"
import AttachFileIcon from "@material-ui/icons/AttachFile"
import { DropzoneArea } from 'material-ui-dropzone'
import ButtonSave from '../../base/buttonSave'
import CancelIcon from '@material-ui/icons/Cancel'
import url from '../../config/urlApi'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

import PacientesAnexosController from '../../controller/clinica/pacientesAnexos/pacientesAnexosController'

import { connect, useSelector } from "react-redux"
import {open} from '../../actions/alertDialogBaseAction'
import {openConfirmation} from '../../actions/confirmationDialogBaseAction'
import {openSnackBase} from '../../actions/snackBaseAction'

const useStyles = makeStyles(theme => ({   	
	divCard: {
		display: 'flex',
        justifyContent: 'center',
        paddingBottom: theme.spacing(2),
        flexWrap: 'wrap',
    },
    container: {
        flex: 12,	  
    },
    space8: {
		marginTop: theme.spacing(8),
    },
    inserirNovoDocumento: {
		color: '#009900',
        "&:hover": {
            backgroundColor: "#e5ffe5"
        },
	},
	inserirNovoDocumentoIcon: {
		fontSize: '32px',
    },
    ctnAnexos: {
        display: 'flex',
        padding: theme.spacing(1)
    },
    cardAnexos: {
        maxWidth: 250,
        minWidth: 200,
    },
    media: {
        height: 200,
    },
    ctnFooter: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    editButtonIcon: {
        fontSize: "22px"
    },
    desc: {
        marginTop: theme.spacing(1)
    },
    ctnActions: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    buttonNovoDocumento: {
        marginLeft: theme.spacing(2),
        color: '#009900',
        "&:hover": {
            backgroundColor: "#e5ffe5"
        },
    },
    img: {
        maxWidth: "100%",
        height: "auto",
    },
    ctnDoc: {
        display: 'flex',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    docIcon: {
        fontSize: "48px"
    },
    docIconEdit: {
        fontSize: "36px",
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(4),
    },
    ctnDescricao: {
        marginTop: theme.spacing(2)
    },
    dialogActionContainer: {
        display: "flex",
        justifyContent: "start"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "start",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    cancelButton: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(1),
    },
    cancelButtonIcon: {
        fontSize: "32px"
    },
    secondary: {
        fontSize: "18px",    
    },
    rootTitle: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    closeIcon: {
        backgroundColor: 'transparent  !important',
        "&:hover": {
          color: "red"
        }
    },
    dropzone: {
        minWidth: '600px !important'
    }
}))

const AnexosPaciente = (props) => {

    const classes = useStyles()
    const [anexos, setAnexos] = useState([])
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openNew, setOpenNew] = useState(false)
    const [urlImage, setUrlImage] = useState(null)
    const [urlDownload, setUrlDownload] = useState('')
    const [urlEdit, setUrlEdit] = useState('')
    const [itemSelecionado, SetItemSelecionado] = useState({})
    const [itemNovo, SetItemNovo] = useState({})
    const [blurItemNovo, SetBlurItemNovo] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(() => {

        recuperar()
        
        return () => {
        }        
    }, [])

    const recuperar = () => {

        const {codigo} = props

        new PacientesAnexosController().recuperar(codigo, (ret) => {

            setAnexos(ret.data.conteudo)
        }, (error) => {
            
            props.open({
                title: "Ops",
                text: `Não foi possível recuperar anexos. \n\n Motivo: ${handleError(error)}`
            })
        })
        
    }

    const handleOpenWindow = (item) => {

        SetItemSelecionado({...item})
        setUrlImage(`${url}/${item.arquivo}`)
    }

    const handleCloseWindow = (item) => {
        
        setOpen(false)
        setUrlImage(null)
    }

    useEffect(() => {

        if (urlImage) {
            setOpen(true)
        }
        
        return () => {
        }        
    }, [urlImage])

    const handleClickMenu = (event, item) => {
        setAnchorEl(event.currentTarget)
        setUrlDownload(`${url}/${item.arquivo}`)
        setUrlEdit(`${url}/${item.arquivo}`)
        
        SetItemSelecionado({...item})
    }
    
    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    const download = () => {

        window.open(urlDownload,'_blank')
    }

    const handleDelete = () => {
    
        props.openConfirmation({
            title: "Remover",
            text: `Deseja remover este documento?`,
            data: {...itemSelecionado},
            cbYes: (value) => {

                let controller = new PacientesAnexosController()

                controller.remover(value.id, (ret) => {

                    props.openSnackBase(ret.data.mensagem)
                    recuperar()
                }, (error) => {
                    
                    props.open({
                        title: "Ops",
                        text: `Não foi possível remover o documento. \n\n Motivo: ${handleError(error)}`
                    })
                })                
            }
        })
    }

    const handleEdit = () => {

        setOpenEdit(true)
    }

    const handleSaveEdit = () => {

        new PacientesAnexosController().salvarEdicao({
            id: itemSelecionado.id,
            descricao: itemSelecionado.descricao
        })
        .then(ret => {
            setOpenEdit(false)
            recuperar()
            props.openSnackBase(ret.data.mensagem)
        })
        .catch(error => {

            props.open({
                title: "Ops",
                text: `Não foi possível salvar o documento. \n\n Motivo: ${handleError(error)}`
            })
        })
    }

    const handleOpenNew = () => {

        setOpenNew(true)
        SetItemNovo({})
        SetBlurItemNovo(false)
    }

    const handleSaveNew = () => {

        const {codigo} = props

        let controller = new PacientesAnexosController()

        controller.salvar({
            idpaciente: codigo,
            descricao: itemNovo.descricao
        }, itemNovo.file, 
        (ret) => {

            props.openSnackBase(ret.data.mensagem)
            setOpenNew(false)
            recuperar()
        }, (error) => {
            
            props.open({
                title: "Ops",
                text: `Não foi possível salvar o documento. \n\n Motivo: ${handleError(error)}`
            })
        })
        
    }

    const buildUrlMedia = (item) => {

        let newUrl = url

        if (item.extensao === 'gif') {
            newUrl += `/${item.arquivo}`
        } else {
            newUrl += `/${item.arquivoThumbnail}`
        }

        return newUrl
    }

    const checkMedia = (item) => {

        if (item.extensao === 'jpg' ||item.extensao === 'jpeg' || item.extensao === 'png' || item.extensao === 'gif') return true

        return false
    }

    return (
        <Fragment>
            
            {anexos.length !== 0 && (
                <Tooltip title="Adicionar documento" placement="left-end">
                    <IconButton className={classes.buttonNovoDocumento} aria-label="Inserir" color="secondary" onClick={handleOpenNew}>
                        <AddCircleOutlineIcon className={classes.inserirNovoDocumentoIcon} />
                    </IconButton>
                </Tooltip>
            )}
            
            <div className={classes.divCard}>

                {anexos.length === 0 ? 
                    <div className={classes.space8}>
                        <Tooltip title="Adicionar documento">
                            <IconButton className={classes.inserirNovoDocumento} aria-label="Adicionar documento" color="secondary" onClick={handleOpenNew}>
                                <AddCircleOutlineIcon className={classes.inserirNovoDocumentoIcon} />
                            </IconButton>
                        </Tooltip>
                    </div>
                :

                anexos.map((item, idx) => {

                    return (
                        <div className={classes.ctnAnexos} key={item.id}>
                            <Card className={classes.cardAnexos}>
                                <CardActionArea onClick={() => handleOpenWindow(item)}>
                                    {checkMedia(item) ? 
                                        <CardMedia
                                        className={classes.media}
                                        image={buildUrlMedia(item)}
                                        title={item.descricao}
                                        />
                                    :
                                        <div className={classes.ctnDoc}>
                                            <AssignmentIcon className={classes.docIcon} />
                                        </div>
                                        
                                    }
                            
                                </CardActionArea>
                                <CardActions className={classes.ctnActions}>

                                    <Typography className={classes.desc} gutterBottom variant="subtitle1" >
                                        {item.descricao}
                                    </Typography>

                                    <Tooltip title={item.nomeOriginal} placement="left-end">
                                        
                                        <IconButton  aria-label="Editar" color="secondary" onClick={(event) => handleClickMenu(event, item)}>
                                            <MoreVertIcon className={classes.editButtonIcon} />
                                        </IconButton>
                                        
                                    </Tooltip>
                                    
                                </CardActions>
                            </Card>
                        </div>
                    )
                })
                    
                }

                <Dialog open={open} onClose={handleCloseWindow} maxWidth={"lg"} >
                    <div className={classes.rootTitle}>
                        <DialogTitle className={classes.dialogTitle} id="form-dialog-title">Documento</DialogTitle>
                        <IconButton className={classes.closeIcon} onClick={handleCloseWindow}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                  
                  <DialogContent>

                        <Grid container spacing={2} className={classes.container}>

                            <Grid item sm={7} >
                                
                                {checkMedia(itemSelecionado) 
                                ?
                                    <img src={urlImage} className={classes.img}/>
                                :
                                    <div style={{width: '350px'}}>
                                        <AssignmentIcon className={classes.docIconEdit} />
                                    </div>
                                   
                                }
                                
                            </Grid>

                            <Grid item sm={5} >
                            
                                <div className={classes.ctnDescricao}>

                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DescriptionIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{
                                                secondary: classes.secondary
                                            }}
                                                primary="Descrição"
                                                secondary={itemSelecionado.descricao}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemIcon>
                                                <AttachFileIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{
                                                secondary: classes.secondary
                                            }}
                                                primary="Nome original"
                                                secondary={itemSelecionado.nomeOriginal}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemIcon>
                                                <AccessTimeIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{
                                                secondary: classes.secondary
                                            }}
                                                primary="Data cadastro"
                                                secondary={itemSelecionado.data}
                                            />
                                        </ListItem>
                                        
                                    </List>

                                </div>
                                
                            </Grid>

                        </Grid>
                  </DialogContent>
                  
                </Dialog>

                <Dialog open={openEdit} onClose={() => {
                    setOpenEdit(false)
                }} maxWidth={"lg"} >

                    <div className={classes.rootTitle}>
                        <DialogTitle className={classes.dialogTitle} id="form-dialog-title">Editar documento</DialogTitle>
                        <IconButton className={classes.closeIcon} onClick={() => setOpenEdit(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <DialogContent>
                        <Grid container spacing={2} className={classes.container}>

                            <Grid item sm={7} >
                                
                                {checkMedia(itemSelecionado) 
                                ?
                                    <img src={urlEdit} className={classes.img}/>
                                :
                                    <div style={{width: '350px', height: '120px'}}>
                                        <AssignmentIcon className={classes.docIconEdit} />
                                    </div>
                                }
                                
                            </Grid>

                            <Grid item sm={5} >
                            
                                <div className={classes.ctnDescricao}>
                                    <TextInputBase
                                        id="descricao"
                                        label="Descrição"
                                        placeholder="Descrição"
                                        error={itemSelecionado.descricao ? '' : 'Campo obrigatório' }
                                        value={itemSelecionado.descricao || ""}
                                        onChange={(e) => {
                                            SetItemSelecionado({...itemSelecionado, descricao: e.target.value})
                                        }}
                                        required={true}
                                    />
                                </div>
                                
                            </Grid>

                        </Grid>

                    </DialogContent>
                    
                    <DialogActions className={classes.dialogActionContainer}>
                        
                        <div className={classes.buttonContainer}>
                            <ButtonSave 
                            clickSave={handleSaveEdit} 
                            loading={false} 
                            success={false} 
                            disabled={ itemSelecionado.descricao ? false : true}/>                                
                            
                            <Tooltip title="Fechar" placement="right-end">
                                <span>
                                    <IconButton className={classes.cancelButton} onClick={() => setOpenEdit(false)} aria-label="Cancelar" color="secondary" >
                                        <CancelIcon className={classes.cancelButtonIcon} />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </div>

                    </DialogActions>
                  
                </Dialog>

                <Dialog open={openNew} onClose={() => {
                    setOpenNew(false)
                }} maxWidth={"lg"} fullWidth={true}>

                    <div className={classes.rootTitle}>
                        <DialogTitle className={classes.dialogTitle} id="form-dialog-title">Novo documento</DialogTitle>
                        <IconButton className={classes.closeIcon} onClick={() => setOpenNew(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <DialogContent>

                        <div className={classes.dropzones}>   
                            <DropzoneArea
                                onChange={(files) => {
                                    SetItemNovo({...itemNovo, file: files[0]})
                                }}
                                filesLimit={1}
                                dropzoneText={'Arraste e solte um arquivo ou clique aqui'}
                                showAlerts={['error']}
                                maxFileSize={10000000}
                                getFileLimitExceedMessage={(filesLimit) => {
                                    return `Tamanho máximo excedido. Máximo de 10 megabytes permitidos`
                                }} 
                                getDropRejectMessage={(rejectedFile, rejectedacceptedFiles, maxFileSize) => {
                                    return `Este arquivo é inválido. Máximo de 10 megabytes permitidos`
                                }}
                            />
                        </div>
                        
                        <Grid container spacing={2} className={classes.container}>

                            <Grid item sm={12} >
                            
                                <div className={classes.ctnDescricao}>
                                    <TextInputBase
                                        id="descricao"
                                        label="Descrição"
                                        placeholder="Descrição"
                                        error={(!itemNovo.descricao && blurItemNovo) ? 'Campo obrigatório' : '' }
                                        value={itemNovo.descricao || ""}
                                        onChange={(e) => {
                                            SetItemNovo({...itemNovo, descricao: e.target.value})
                                        }}
                                        onBlur={e => {
                                            SetBlurItemNovo(true)
                                        }}
                                        required={true}
                                    />
                                </div>
                                
                            </Grid>

                        </Grid>

                    </DialogContent>
                    
                    <DialogActions className={classes.dialogActionContainer}>
                        
                        <div className={classes.buttonContainer}>
                            <ButtonSave 
                            clickSave={handleSaveNew} 
                            loading={false} 
                            success={false} 
                            disabled={ !(itemNovo.file && itemNovo.descricao) }/>                                
                            
                            <Tooltip title="Fechar" placement="right-end">
                                <span>
                                    <IconButton className={classes.cancelButton} onClick={() => setOpenNew(false)} aria-label="Cancelar" color="secondary" >
                                        <CancelIcon className={classes.cancelButtonIcon} />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </div>

                    </DialogActions>
                  
                </Dialog>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    
                    <MenuItem onClick={() => {
                        handleCloseMenu()
                        download()
                    }}
                    >Baixar</MenuItem>
                    
                    <MenuItem onClick={() => {
                        handleCloseMenu()
                        handleEdit()
                    }}>Editar</MenuItem>

                    <MenuItem onClick={() => {
                        handleCloseMenu()
                        handleDelete()
                    }}>Remover</MenuItem>
                </Menu>
                
            </div>
        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        open: (data) => { dispatch(open(data)) },
        openConfirmation: (data) => { dispatch(openConfirmation(data)) },
        openSnackBase: (text) => { dispatch(openSnackBase(text)) },
    }
}

export default connect(null, mapDispatchToProps)(AnexosPaciente)