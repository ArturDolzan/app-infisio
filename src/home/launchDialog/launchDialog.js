import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { connect } from "react-redux"
import {closeDialogForm} from '../../actions/formDialogBaseAction'
import {open} from '../../actions/alertDialogBaseAction'

import { withFormik } from 'formik'
import * as Yup from 'yup'

import Welcome from './welcome'
import ClinicForm from './clinicForm/clinicForm'
import Final from './final'

import ClinicasController from '../../controller/clinica/clinicas/clinicasController'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',    
    height: '100%'
  },
  buttonContainer: {
    position : 'absolute',
    bottom : '0',
    right : '0',
    height : '60px',
    marginTop : '60px',
    marginRight : '60px'
  },
  button: {
    marginRight: theme.spacing(1),    
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  content: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),    
  },
}))

function getSteps() {
  return ['Termos de uso', 'Clínica', 'Finalizar']
}

const formikEnhancer = withFormik({
    
  validationSchema: Yup.object().shape({    
    nome: Yup.string()
      .required('O campo nome é obrigatório!'),
    email: Yup.string()
      .required('O campo e-mail é obrigatório!')
      .email('Formato de e-mail não é válido!'),
  }),

  mapPropsToValues: () => ({id: 0, email: '', nome: ''}),

  handleSubmit: (payload, { setSubmitting }) => {
    //alert(payload.email)
    setSubmitting(false)

  },

  displayName: 'Formulário',
})


const LaunchDialogForm = (props) => {

  const {
      values,
      touched,
      errors,
      dirty,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
  } = props

  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
	const [data, setData] = useState({
    policyChecked: false
	})
  
  const steps = getSteps()

  const getStepContent = (step, props) => {
      
    switch (step) {
      case 0:
        return (<Welcome policyChecked={data.policyChecked} policyChanged={handleData}/>)
      case 1:
        return (<ClinicForm {...props} />)
      case 2:
        return (<Final/>)
      default:
        return 'Etapa desconhecida'
    }
  }

	const handleData = (event) => {

    let value = event.target.value    
    if (event.target.type === "checkbox") {
      value = event.target.checked
    }
      
			setData({...data, [event.target.id]: value})
	}
	

  const handleFinish = () => {

    let clinicasController = new ClinicasController()
    clinicasController.inserirPrimeiraClinica({...values}, ret => {

      props.closeDialogForm()
    }, error => {
      
      props.open({
        title: "Ops",
        text: `Não foi possível inserir a clínica. \n Erro: ${error.response.statusText}`
      })
    })

  }

  const handleNext = () => {
    
    if (activeStep === 2) {
      handleFinish()
      return
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const isNextDisabled = () => {

    if (activeStep === 0) {
      if (!data.policyChecked) return true
    } else if (activeStep === 1) {
      if ((Object.keys(errors).length !== 0 || !dirty) && errors.constructor === Object) {
        return true
      }
    }

    return false
  }

  return (

    <form onSubmit={handleSubmit}> 
      <div className={classes.root}>

        {}
      
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {}
                const labelProps = {}

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>
          
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    Final
                  </Typography>
                  
                </div>
              ) : (
                <div>
                  
                    <div className={classes.content}>{getStepContent(activeStep, props)}</div>

                    <div className={classes.buttonContainer}>
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                          Voltar
                        </Button>
                        
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                          disabled={isNextDisabled()}
                        >
                          {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                        </Button>
                    </div>

                </div>
              )}
            </div>

      </div>
    </form>
  )
}

const LaunchDialog = formikEnhancer(LaunchDialogForm)

const mapDispatchToProps = (dispatch) => {
  return {
      closeDialogForm: (data) => { dispatch(closeDialogForm(data)) },
      open: (data) => { dispatch(open(data)) }
  }
}

export default connect(null, mapDispatchToProps)(LaunchDialog)