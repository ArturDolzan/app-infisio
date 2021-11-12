import React, {Fragment, useEffect, useState} from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import ButtonSave from '../../base/buttonSave'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from "@material-ui/icons/Close"
import IconButton from "@material-ui/core/IconButton"
import CancelIcon from '@material-ui/icons/Cancel'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import handleError from '../../base/errorHelper/errorHelper'
import DialogTitle from '@material-ui/core/DialogTitle'
import moment from 'moment'
import 'moment/locale/pt-br'
import DatetimeInputBase from '../../base/input/datetimeInputBase'
import TextInputBase from '../../base/input/textInputBase'
import initialValue from '../../base/crud/initialValueHelper'
import SelectInputBase from '../../base/input/selectInputBase'
import AutoComplete from '../../base/autoComplete'
import AutoCompleteMultiple from '../../base/autoCompleteMultiple'
import enumSituacaoSessoes from '../../model/enumeradores/enumSituacaoSessoes'
import enumModalidadeSessao from '../../model/enumeradores/enumModalidadeSessao'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import DateRangeInputBase from '../../base/input/dateRangeInputBase'
import RadioInputBase from '../../base/input/radioInputBase'
import Popover from '@material-ui/core/Popover'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TimeInputBase from '../../base/input/timeInputBase'

import AgentesController from '../../controller/configuracoes/agentes/agentesController'
import CadastroAgentes from '../../configuracoes/agentes/cadastroAgente'
import PacientesController from '../../controller/clinica/pacientes/pacientesController'
import CadastroPacientes from '../../clinica/pacientes/cadastroPaciente'
import ConveniosController from '../../controller/configuracoes/convenios/conveniosController'
import CadastroConvenios from '../../clinica/convenios/cadastroConvenio'
import LocaisReuniaoController from '../../controller/configuracoes/locaisReuniao/locaisReuniaoController'
import CadastroLocaisReuniao from '../../configuracoes/locaisReuniao/cadastroLocaisReuniao'
import TratamentosController from '../../controller/clinica/tratamentos/tratamentosController'
import CadastroTratamentos from '../../clinica/tratamentos/cadastroTratamentos'
import SessoesController from '../../controller/clinica/sessoes/sessoesController'
import Sessoes from '../../model/clinica/sessoes/sessoes'

const useStyles = makeStyles(theme => ({       
    marginLeft1: {
        marginLeft: theme.spacing(1),
    },
    container: {
        flex: 12,	  
    },    
    rootTitle: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    closeIcon: {
        backgroundColor: 'transparent  !important',
        "&:hover": {
          color: "red"
        }
      },
      dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      buttonContainer: {
        display: "flex",
        justifyContent: "start",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    dialogActionContainer: {
        display: "flex",
        justifyContent: "start"
    },
    cancelButton: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(1),
    },
    cancelButtonIcon: {
        fontSize: "32px"
    },
    linkContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    popContainer : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'   
    },
    popOk: {
        marginBottom: theme.spacing(2),
    },
    periodFont: {
        fontStyle: 'italic'
    }
}))

const formikEnhancer = withFormik({
    
	validationSchema: Yup.object().shape({    
	  descricao: Yup.string()
		 .required('O campo descrição é obrigatório!')
         .nullable(),

      idlocalreuniao: Yup.string()
		 .required('O campo local da agenda é obrigatório!')
         .nullable(),
         
      idpaciente: Yup.string()
		 .required('O campo paciente é obrigatório!')
         .nullable(),
         
      idagente: Yup.string()
		 .required('O campo profissional é obrigatório!')
         .nullable(),
         
      idconvenio: Yup.string()
		 .required('O campo convênio é obrigatório!')
         .nullable(),

      tratamentosSessoes: Yup.array()
		 .required('O campo tratamentos à serem realizados é obrigatório!')
         .nullable(),
         
      valor_sessao: Yup.string()
		 .required('O campo valor da sessão é obrigatório!')
         .nullable()
	}),
 
	mapPropsToValues: () => {

        let obj = initialValue(new Sessoes())
        
        obj.id = 0
        obj.data_agendamento_inicial = moment().format('DD/MM/YYYY HH:mm')
        obj.data_agendamento_final = moment().format('DD/MM/YYYY HH:mm')
        obj.situacao = 1
        obj.observacao = " "
        obj.modalidade = 1
        obj.start = moment().toDate()
        obj.end = moment().toDate()
        obj.startHour = moment().format("HH:mm")
        obj.endHour = moment().format("HH:mm")
        
		 return obj
	},

	enableReinitialize: false,
 })

 const LaunchSessaoDialog = props => {

    const classes = useStyles()
    const { setFieldValue, resetForm, values } = props

    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
          props.onClose()
        }
    }

    useEffect(() => {
        
        resetForm()

        if (props.launchSessaoOpened) {
            
            let data = {...props.dados}

            setFieldValue('id', data.id)
            setFieldValue('data_agendamento_inicial', data.data_agendamento_inicial)
            setFieldValue('data_agendamento_final',  data.data_agendamento_final)
            
            setFieldValue('start', moment(data.data_agendamento_inicial, 'DD/MM/YYYY HH:mm').toDate())
            setFieldValue('end', moment(data.data_agendamento_inicial, 'DD/MM/YYYY HH:mm').toDate())
            setFieldValue('startHour', moment(data.data_agendamento_inicial, 'DD/MM/YYYY HH:mm').format("HH:mm"))
            setFieldValue('endHour', moment(data.data_agendamento_final, 'DD/MM/YYYY HH:mm').format("HH:mm"))

            if (data.id) {
                setFieldValue('situacao', data.situacao)
                setFieldValue('descricao', data.descricao)
                setFieldValue('idpaciente', data.idpaciente)
                setFieldValue('pacientes', data.pacientes)
                setFieldValue('idagente', data.idagente)
                setFieldValue('agentes', data.agentes)
                setFieldValue('idconvenio', data.idconvenio)                
                setFieldValue('convenios', data.convenios)
                setFieldValue('idlocalreuniao', data.idlocalreuniao)
                setFieldValue('locaisReuniao', data.locaisReuniao)
                setFieldValue('valor_sessao', data.valor_sessao)
                setFieldValue('observacao', data.observacao)
                setFieldValue('tratamentosSessoes', data.tratamentosSessoes)
            }
        }

        return () => {
            
        }        
    }, [props.launchSessaoOpened])

    return (
        
        <Fragment>
            <Dialog classes={{ paper: classes.dialogPaper }} onKeyDown={handleKeyDown} fullWidth={true} maxWidth="md" open={props.launchSessaoOpened} aria-labelledby="form-dialog-title">
                <div className={classes.rootTitle}>
                    <DialogTitle className={classes.dialogTitle} id="form-dialog-title">Sessão</DialogTitle>
                    <IconButton className={classes.closeIcon} onClick={() => props.onClose()}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <DialogContent>
                
                    {LaunchSessaoForm(props)}

                </DialogContent>
                <DialogActions className={classes.dialogActionContainer}>
                    
                    {LaunchSessaoActions(props)}

                </DialogActions>
            </Dialog>
            
        </Fragment>
    )
}

const LaunchSessaoForm = (props) => {

    const {
            touched,
            values,
            errors,
            dirty,
            handleBlur,
            handleChange,
            setFieldValue,
            error,
            setErrors
    } = props

    const classes = useStyles()
    const [duracao, setDuracao]= React.useState("")
    const [anchorEl, setAnchorEl] = React.useState(null)
    
    const handleDuration = () => {

        let start = moment(values.data_agendamento_inicial, 'DD/MM/YYYY HH:mm')
        let end = moment(values.data_agendamento_final, 'DD/MM/YYYY HH:mm')

        if (!start.isValid()) return "0"
        if (!end.isValid()) return "0"

        let duration = moment.duration(end.diff(start))
        let minutes = duration.asMinutes()

        if (minutes < 0) minutes = "0"

        if (parseInt(minutes) > 999) minutes = "999"

        setDuracao(minutes)
    }

    const handleChangeDuration = (event) => {
        
        let min = parseInt(event.currentTarget.value)
        if (min > 999) return
        
        let start = moment(values.data_agendamento_inicial, 'DD/MM/YYYY HH:mm')
        let dif = moment(start, "hh:mm:ss A").add(min, 'minutes')
        
        setFieldValue('data_agendamento_final',  dif.format('DD/MM/YYYY HH:mm'))
    }

    useEffect(() => {

        handleDuration()

        return () => {
            
        }
    }, [values.data_agendamento_final, values.data_agendamento_inicial])

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const montarTextoDataRange = () => {

        if (moment(values.start).isSameOrAfter(moment(values.end))) return 'Período não definido'

        return `${moment(values.start).format('DD/MM/YYYY')} até ${moment(values.end).format('DD/MM/YYYY')}`
    }

    return (
        <Fragment>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={() => {setAnchorEl(null)}}
                anchorOrigin={{
                vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classes.popContainer}>
                    <DateRangeInputBase 
                        id="range" 
                        onChange={(e) => {
                            setFieldValue('start', e.selection.startDate)
                            setFieldValue('end', e.selection.endDate)
                        }} 
                        startValue={values.start}
                        endValue={values.end}
                    />

                    <Button className={classes.popOk} variant="contained" color="primary"  onClick={(event) => {setAnchorEl(null)}}>
                        Ok
                    </Button>
                </div>
            </Popover>

            <Grid container spacing={2} className={classes.container}>

                <Grid item sm={3} >
                     <RadioInputBase
                        id="modalidade"						
                        label=""
                        value={values.modalidade}
                        value1={1}
                        value2={2}
                        label1={"Individual"}
                        label2={"Lote"}
                        disabled1={!!values.id}
                        disabled2={!!values.id}
                        error={false}
                        onChange={(e) => {
                            setFieldValue('modalidade', parseInt(e.currentTarget.value))
                        }}
                    />
                </Grid>

                {values.modalidade === 1 
                ? 
                <Fragment>
                    <Grid item sm={4} >
                        <DatetimeInputBase
                            id="data_agendamento_inicial"						
                            label="Data de início"
                            value={values.data_agendamento_inicial} 
                            error={false} 						                       
                            onChange={(_, dateString) => {
                                setFieldValue('data_agendamento_inicial', dateString)
                            }}
                            required={true}
                        />
                    </Grid>

                    <Grid item sm={3} >
                        <TextInputBase
                            id="duracao"
                            label="Duração (min)"
                            placeholder="Duração (min)"
                            value={duracao}
                            onChange={handleChangeDuration}
                            type="number"
                            onBlur={handleBlur}
                            required={false}
                            startIcon={<AccessTimeIcon/>}
                        />
                    </Grid>
                </Fragment>
                :
                <Fragment>
                    <Grid item sm={3} >
                        <div className={classes.linkContainer}>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={(event) => {
                                    setAnchorEl(event.currentTarget)
                                }}
                                >
                                Definir período das sessões
                            </Link>
                            <Typography className={classes.periodFont} color="textSecondary">
                                {montarTextoDataRange()}
                            </Typography>
                        </div>
                    </Grid>

                    <Grid item sm={2} >
                        <TimeInputBase
                         id="startTime"
                         label={"Hr Início"}
                         value={values.startHour}
                         onChange={(e) => {
                             setFieldValue('startHour', e.currentTarget.value)
                         }}
                        />
                    </Grid>

                    <Grid item sm={2} >
                        <TimeInputBase
                         id="endTime"
                         label={"Hr Fim"}
                         value={values.endHour}
                         onChange={(e) => {
                            setFieldValue('endHour', e.currentTarget.value)
                         }}
                        />
                    </Grid>

                </Fragment>
                }

                <Grid item sm={2} >
                    <SelectInputBase 
                        id="situacao" 
                        label="Situação"
                        value={values.situacao}
                        disabled={true}
                        onChange={(item) => {								
                            setFieldValue('situacao', item.target.value)
                        }}
                        enum={enumSituacaoSessoes}
                    />
                </Grid>

                <Grid item sm={12} >
                     <TextInputBase
                        id="descricao"
                        label="Descrição"
                        placeholder="Descrição"
                        error={touched.descricao && errors.descricao}
                        value={values.descricao || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        multiline={true}
                        rows={2}
                        rowsMax={6}
                    />
                </Grid>

                <Grid item sm={12}>     
                    <AutoComplete
                        id="idlocalreuniao"
                        label="Local da agenda"
                        controller={new LocaisReuniaoController()}
                        cadastroSearch={CadastroLocaisReuniao}
                        chave="id"
                        valor="descricao"
                        required={true}
                        error={touched.idlocalreuniao && errors.idlocalreuniao}
                        defaultChave={values.idlocalreuniao}
                        defaultValor={values.locaisReuniao ? values.locaisReuniao.descricao : null}
                        onBlur={handleBlur}
                        getValueSelected={(event, value) => {
                            setFieldValue('idlocalreuniao', value ? value.id : null)
                        }}
                    />
                </Grid>

                <Grid item sm={6}>     
                    <AutoComplete
                        id="idpaciente"
                        label="Paciente"
                        controller={new PacientesController()}
                        cadastroSearch={CadastroPacientes}
                        chave="id"
                        valor="nome"
                        required={true}
                        error={touched.idpaciente && errors.idpaciente}
                        defaultChave={values.idpaciente}
                        defaultValor={values.pacientes ? values.pacientes.nome : null}
                        onBlur={handleBlur}
                        getValueSelected={(event, value) => {
                            setFieldValue('idpaciente', value ? value.id : null)
                        }}
                    />
                </Grid>

                <Grid item sm={6}>     
                    <AutoComplete
                        id="idagente"
                        label="Profissional"
                        controller={new AgentesController()}
                        cadastroSearch={CadastroAgentes}
                        chave="id"
                        valor="nome"
                        required={true}
                        error={touched.idagente && errors.idagente}
                        defaultChave={values.idagente}
                        defaultValor={values.agentes ? values.agentes.nome : null}
                        onBlur={handleBlur}
                        getValueSelected={(event, value) => {
                            setFieldValue('idagente', value ? value.id : null)
                        }}
                    />
                </Grid>

                <Grid item sm={6}>     
                    <AutoComplete
                        id="idconvenio"
                        label="Convênio"
                        controller={new ConveniosController()}
                        cadastroSearch={CadastroConvenios}
                        chave="id"
                        valor="nome"
                        required={true}
                        error={touched.idconvenio && errors.idconvenio}
                        defaultChave={values.idconvenio}
                        defaultValor={values.convenios ? values.convenios.nome : null}
                        onBlur={handleBlur}
                        getValueSelected={(event, value) => {
                            setFieldValue('idconvenio', value ? value.id : null)
                        }}
                    />
                </Grid>

                <Grid item sm={3} >
                  
                    <CurrencyTextField
                        id="valor_sessao"
                        label="Valor da sessão"
                        variant="outlined"
                        value={values.valor_sessao || ""}
                        currencySymbol="R$"
                        outputFormat="string"
                        decimalCharacter=","
                        digitGroupSeparator="."
                        size={"small"}
                        required={true}
                        onChange={(event, value)=> setFieldValue('valor_sessao', value)}
                    />

                </Grid>

                <Grid item sm={12}>     
                    <AutoCompleteMultiple
                        id="tratamentosSessoes"
                        label="Tratamentos à serem realizados"
                        controller={new TratamentosController()}
                        cadastroSearch={CadastroTratamentos}
                        chave="id"
                        valor="descricao"
                        required={true}
                        error={touched.tratamentosSessoes && errors.tratamentosSessoes}
                        default={values.tratamentosSessoes}
                        defaultModel={"tratamentos"}
                        onBlur={handleBlur}
                        getValueSelected={(event, value) => {                            
                            setFieldValue('tratamentosSessoes', value )
                        }}
                    />
                </Grid>

            </Grid>

        </Fragment>
    )
}

const LaunchSessaoActions = (props) => {

    const {errors, dirty, values, isSubmitting} = props

    const classes = useStyles()

    const disableSaveButton = () => {

        return ((Object.keys(errors).length !== 0 || !dirty) && errors.constructor === Object)
    }

    const validateBeforeSave = dto => {

        if (moment(dto.data_agendamento_inicial, 'DD/MM/YYYY HH:mm').isSameOrAfter(moment(dto.data_agendamento_final, 'DD/MM/YYYY HH:mm'))) {
            props.open({
                title: "Ops",
                text: `Hora final de sessão tem que ser maior que a hora início de sessão!`
            })

            return false
        }

        if (!(moment(dto.data_agendamento_inicial, 'DD/MM/YYYY HH:mm').isSame(moment(dto.data_agendamento_final, 'DD/MM/YYYY HH:mm'), 'day'))) {
            props.open({
                title: "Ops",
                text: `A sessão deve ser agendada com hora início e fim no mesmo dia!`
            })

            return false
        }

        return true
    }

    const handleSave = () => {

        let dto = removeAssociationBeforeSave({...values})

        dto = removeIgnoredFieldsBeforeSave({...dto})

        if (!dto.observacao) dto.observacao = " "
        if (!dto.data_cadastro) dto.data_cadastro = moment().format('DD/MM/YYYY HH:mm')
        if (!dto.id) dto.id = 0

        if (!validateBeforeSave(dto)) return
        
        let controller = new SessoesController()

        //-- Lote
        if (values.modalidade === 2) {
            
            handleSaveLote(controller, dto)
            return
        }

        controller.salvar(dto)
        .then(ret => {

            props.openSnackBase("Sessão agendada com sucesso!")
            props.onClose()
            props.onSave()
        })
        .catch(error => {

            props.open({
                title: "Ops",
                text: `Não foi possível salvar o registro. \n\n Motivo: ${handleError(error)}`
            })
        })
    }

    const handleSaveLote = (controller, dto) => {

        if (moment(values.start, 'DD/MM/YYYY').isAfter(moment(values.end, 'DD/MM/YYYY'))) {
            props.open({
                title: "Ops",
                text: `O período de lançamento das sessões não é válido!`
            })
            return false
        }
        
        if (moment(values.startHour, 'HH:mm').isSameOrAfter(moment(values.endHour, 'HH:mm'))) {
            props.open({
                title: "Ops",
                text: `Hora final tem que ser maior que a hora início!`
            })
            return false
        }

        const dtoLote = {
            dataInicial: moment(values.start).format('DD/MM/YYYY HH:mm'),
            dataFinal: moment(values.end).format('DD/MM/YYYY HH:mm'),
            horarioInicial: values.startHour,
            horarioFinal: values.endHour,
            gerarSabado: false,
            sessao: {...dto}
        }

        props.openConfirmation({
            title: "Confirmação",
            text: `Confirma o agendamento das sessões no período escolhido?`,
            data: {...dtoLote},
            cbYes: (value) => {

                controller.lancarEmLote(value)
                .then(ret => {

                    props.openSnackBase("Sessões agendadas com sucesso!")
                    props.onClose()
                    props.onSave()
                })
                .catch(error => {

                    props.open({
                        title: "Ops",
                        text: `Não foi possível agendar as sessões. \n\n Motivo: ${handleError(error)}`
                    })
                })                
            }
        })
    }

    const removeAssociationBeforeSave = (dto) => {
        
        const sessoes = new Sessoes()

        Object.keys(dto).forEach(e => {  
            
            if (dto[e]) {
                if ( typeof dto[e] === 'object') {
                    
                    let checkModel = sessoes.fields.filter(x => (x.id === e && x.save ))[0]

                    if (!checkModel) {
                        delete dto[e]
                    }
                    
                }
            }            
        })

        return dto
    }

    const removeIgnoredFieldsBeforeSave = (dto) => {
        
        const sessoes = new Sessoes()

        sessoes.fields.filter(x=>x.ignoreField).map((item, idx) => {  
            delete dto[item.id]
        })

        return dto
    }

    return (
        <Fragment>

            <div className={classes.buttonContainer}>
                <ButtonSave clickSave={handleSave} loading={isSubmitting} success={false} disabled={ disableSaveButton()}/>                                
                
                <Tooltip title="Fechar" placement="right-end">
                    <span>
                        <IconButton className={classes.cancelButton} onClick={() => props.onClose()} aria-label="Cancelar" color="secondary" >
                            <CancelIcon className={classes.cancelButtonIcon} />
                        </IconButton>
                    </span>
                </Tooltip>
            </div>

        </Fragment>
    )
}

const LaunchSessao = formikEnhancer(LaunchSessaoDialog)
  
export default LaunchSessao