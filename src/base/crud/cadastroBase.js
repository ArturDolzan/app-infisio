import React, {Fragment, useEffect} from 'react'
import handleError from '../errorHelper/errorHelper'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import ButtonSave from '../../base/buttonSave'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'

import { connect } from "react-redux"
import {open} from '../../actions/alertDialogBaseAction'
import {openConfirmation} from '../../actions/confirmationDialogBaseAction'
import {openSnackBase} from '../../actions/snackBaseAction'


const useStyles = makeStyles(theme => ({       
    buttonContainer: {
        display: "flex",
        justifyContent: "start",
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    backButton: {
        marginLeft: theme.spacing(2),
    },
    removeButton: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(1),
    },
    removeButtonIcon: {
        fontSize: "32px"
    },
    paperHeader:{
        display: "flex",
        boxShadow: "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
        marginBottom: theme.spacing(2),
    },
    divPaperHeaderGrid: {
        minHeight: "75px", 
        display: "flex", 
        alignItems: "center"
    },
    paper:{
        boxShadow: "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)"
    },
    title: {
        marginLeft: theme.spacing(2),
    }
}))


const CadastroBase = props => {

    const {
        touched,
        values,
        errors,
        dirty,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
        handleChange,
        setFieldValue,
        initialValues,
        setSubmitting,
        match
    } = props

    const classes = useStyles()

    useEffect(() => {

        recuperarInitialValues()

        return () => {
            
        }        
    }, [])

    const recuperarInitialValues = () => {

        let id = match.params.id || 0

        if (id == 0) {
            initialValues.id = 0            
            props.setRetrieve(true)
            return true
        }

        let data = props.controller.recuperarPorId(id, (ret) => {

            Object.assign(initialValues, ret.data.conteudo)

            props.setRetrieve(true)

        }, (error) => {
            
            props.open({
                title: "Ops",
                text: `Não foi possível recuperar o registro. \n\n Motivo: ${handleError(error)}`
            })
        })
    }

    const handleSave = () => {

        setSubmitting(true)    

        let dto = removeAssociationBeforeSave({...values})

        dto = removeIgnoredFieldsBeforeSave({...dto})
        
        let data = props.controller.salvar(dto, (ret) => {

            if (!ret.data.conteudo){
                props.openSnackBase("Registro salvo com sucesso!")
                
                if(!props.autoComplete){
                    props.history.goBack()
                } else {
                    
                    props.autoCompleteSaved({...values})
                }

                setSubmitting(false)
                return
            }
            
            handleSaveImage(ret.data.conteudo[0]||ret.data.conteudo, (e) => {
                props.openSnackBase("Registro salvo com sucesso!")

                if(!props.autoComplete){
                    props.history.goBack()
                } else {
                
                    props.autoCompleteSaved({...ret.data.conteudo[0]||ret.data.conteudo})
                }
                
                setSubmitting(false)
            }, 
            (error) => {
                    props.open({
                        title: "Ops",
                        text: `Não foi possível salvar a imagem. \n\n Motivo: ${handleError(error)}`
                    })
                }
            )
            
        }, (error) => {
            
            props.open({
                title: "Ops",
                text: `Não foi possível salvar o registro. \n\n Motivo: ${handleError(error)}`
            })

            setSubmitting(false)
        })
    }

    const removeAssociationBeforeSave = (dto) => {

        Object.keys(dto).forEach(e => {            
            if (dto[e]) {
                if ( typeof dto[e] === 'object') {
                    delete dto[e]
                }
            }            
        })

        return dto
    }

    const removeIgnoredFieldsBeforeSave = (dto) => {
        
        if (!props.model) return dto

        props.model.fields.filter(x=>x.ignoreField).map((item, idx) => {  
            delete dto[item.id]
        })

        return dto
    }

    const handleSaveImage = (data, cbSucesso, cbErro) => {

        if (!props.urlImage || !typeof props.controller.salvarImagem === "function") {
            cbSucesso()
            return 
        }

        props.controller.salvarImagem(data.id, props.urlImage, cbSucesso, cbErro)
    }

    const handleRemove = () => {

        props.openConfirmation({
            title: "Remover",
            text: `Deseja remover este registro?`,
            data: {...values},
            cbYes: (value) => {
                
                let data = props.controller.remover(value.id, (ret) => {

                    props.openSnackBase("Registro removido com sucesso!")
                    props.history.goBack()

                }, (error) => {
                    
                    props.open({
                        title: "Ops",
                        text: `Não foi possível remover o registro. \n\n Motivo: ${handleError(error)}`
                    })
                })
            }
        })
    }

    const disableSaveButton = () => {

        if (props.urlImage && (Object.keys(errors).length === 0 )) return false

        return ((Object.keys(errors).length !== 0 || !dirty) && errors.constructor === Object)
    }

  return (
    <Fragment> 
        
        {!props.hiddenHeaderBar && (
            <Fragment>
                <Paper className={classes.paperHeader}>
                    {!props.autoComplete && (
                        <div className={classes.divPaperHeaderGrid}>
                            
                            <Fragment>
                                <Tooltip title="Voltar" placement="right-end">
                                    <IconButton className={classes.backButton} aria-label="Atualizar" color="primary" onClick={() => props.history.goBack()}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                </Tooltip>
                            </Fragment>
                            
                            
                            <Typography variant="h6" className={classes.title}>
                                {props.title}
                            </Typography>
                        </div>
                    ) }
                </Paper>
            </Fragment>
        )}
        
        <Paper className={classes.paper}>

            {props.retrieve && (

                <Fragment>
                    {props.renderForm}
                </Fragment>
            )}

            {!props.hiddenActions && (
                <div className={classes.buttonContainer}>
                    <ButtonSave clickSave={handleSave} loading={isSubmitting} success={false} disabled={ disableSaveButton()}/>                                
                    
                    <Tooltip title="Remover" placement="right-end">
                        <span>
                            <IconButton className={classes.removeButton} onClick={handleRemove} disabled={(values.id === 0) || props.disableRemove || props.autoComplete } aria-label="Remover" color="secondary" >
                                <DeleteIcon className={classes.removeButtonIcon} />
                            </IconButton>
                        </span>
                    </Tooltip>
                </div>
            )}
            
        </Paper>
         
    </Fragment>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
        open: (data) => { dispatch(open(data)) },
        openConfirmation: (data) => { dispatch(openConfirmation(data)) },
        openSnackBase: (text) => { dispatch(openSnackBase(text)) }
    }
}

CadastroBase.propTypes = {
    controller: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    renderForm: PropTypes.any.isRequired,
    retrieve: PropTypes.any.isRequired,
    setRetrieve: PropTypes.any.isRequired,
    disableRemove: PropTypes.bool,
    model: PropTypes.any,
    autoComplete: PropTypes.bool,
    hiddenHeaderBar: PropTypes.bool,
    hiddenActions: PropTypes.bool
}

export default withRouter(connect(null, mapDispatchToProps)(CadastroBase))