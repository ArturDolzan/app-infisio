import React, {Fragment} from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import TextInputBase from '../../base/input/textInputBase'
import DateInputBase from '../../base/input/dateInputBase'
import SelectInputBase from '../../base/input/selectInputBase'
import initialValue from '../../base/crud/initialValueHelper'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'
import InputMask from "react-input-mask"
import { makeStyles } from '@material-ui/core/styles'
import AnexosPaciente from './anexosPaciente'

import CadastroBase from '../../base/crud/cadastroBase'
import Pacientes from '../../model/clinica/pacientes/pacientes'
import enumSexo from '../../model/enumeradores/enumSexo'
import PacientesController from '../../controller/clinica/pacientes/pacientesController'
import ImageAvatarEditBase from '../../base/imageAvatarEditBase'
import ImagemBarra from '../../base/images/universe-2742113_1920.jpg'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import IconButton from '@material-ui/core/IconButton'

const formikEnhancer = withFormik({
    
	validationSchema: Yup.object().shape({    
	  nome: Yup.string()
		 .required('O campo nome é obrigatório!')
		 .nullable(),
	  email: Yup.string()
		 .required('O campo e-mail é obrigatório!')
		 .email('Formato de e-mail não é válido!')
		 .nullable(),
	  sexo: Yup.string()
		 .required('O campo Sexo é obrigatório!')
		 .nullable()
	}),
 
	mapPropsToValues: () => {

		let obj = initialValue(new Pacientes())

		if (!obj.id) obj.id = 0

		 return obj
	},
 
	handleSubmit: (payload, { setSubmitting }) => {
	  
	  setSubmitting(false)  
	},

	enableReinitialize: true,
 })


const useStyles = makeStyles(theme => ({   	
	container: {
	  padding: theme.spacing(3),	  
	  flex: 12,	  
	},	
	containerPhoto: {
		padding: theme.spacing(1),
		marginLeft: theme.spacing(1.5),
		marginTop: theme.spacing(1),
		flex: 0.5
	},	
	divRoot: {
		display: "flex",
		marginTop: theme.spacing(3),
	},
	paperHeader:{
		display: "flex",
		backgroundImage: `url(${ImagemBarra})`,        
        marginBottom: theme.spacing(2),
    },
    divPaperHeaderGrid: {
        minHeight: "100px", 
        display: "flex", 
        alignItems: "center"
    },
    paper:{
        boxShadow: "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)"
    },
    title: {
		marginLeft: theme.spacing(2),
		color: "#FFFFFF",
	},
	backButton: {
		marginLeft: theme.spacing(2),
		color: "#FFFFFF"
	},
	backButtonIcon: {
		fontSize: "32px"
	},
	imageAvatarBar: {
		marginLeft: theme.spacing(3),
	}
}))


const CadastroPacienteForm = props => {
	
	const {handleSubmit} = props
	const classes = useStyles()	
	const [retrieve, setRetrieve] = React.useState(false)
	const [urlImage, setUrlImage] = React.useState(null)
	const [activeTab, setActiveTab] = React.useState(0)

  return (
    <Fragment> 

		<form onSubmit={handleSubmit} >

			{renderBar(props, classes, setUrlImage, retrieve)}

			<CadastroBase
				{...props}
				controller={new PacientesController()}
				title={"Paciente"}
				retrieve={retrieve}
				setRetrieve={setRetrieve}
				urlImage={urlImage}
				hiddenHeaderBar={true}
				hiddenActions={activeTab === 1}
				renderForm={renderForm(props, classes, retrieve, setUrlImage, activeTab, setActiveTab)}
			/>      

		</form>   
	 </Fragment>	
  )
}

const renderBar = (props, classes, setUrlImage, retrieve) => {

	const { values } = props

	const handleImageChange = event => {

		setUrlImage(event)
	}

	return (
		<Fragment>
			<Paper className={classes.paperHeader}>
				
				<div className={classes.divPaperHeaderGrid}>
					
					<Fragment>
						<Tooltip title="Voltar" placement="right-end">
							<IconButton className={classes.backButton} aria-label="Voltar" color="primary" onClick={() => props.history.goBack()}>
								<ArrowBackIcon className={classes.backButtonIcon} />
							</IconButton>
						</Tooltip>
					</Fragment>
					
					{retrieve && (
						<Fragment>
							<Typography variant="h5" className={classes.title}>
								{values.nome || 'Novo Paciente'}
							</Typography>

							<div className={classes.imageAvatarBar}>
								<ImageAvatarEditBase id={values.id} isBig={true} controller={new PacientesController()} changeImage={handleImageChange}/>
							</div>
						</Fragment>
					)}

				</div>
				
			</Paper>
		</Fragment>
	)
}

const renderForm = (props, classes, retrieve, setUrlImage, activeTab, setActiveTab) => {

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
		match,
		error,
		setErrors,
  } = props

  	const handleImageChange = event => {

		setUrlImage(event)
	}

	const handleChangeTab = (event, newValue) => {

		setActiveTab(newValue)
	}

	return (

		<Fragment>

			<Tabs
				value={activeTab}
				onChange={handleChangeTab}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab value={0} label="Cadastro"/>
				<Tab value={1} label="Documentos" disabled={values.id === 0}/>
				{/* <Tab value={2} label="Anexos" disabled={values.id === 0}/> */}
			</Tabs>
			
			{(retrieve && activeTab === 0) && (
			
				<div className={classes.divRoot}>

					<Grid container spacing={2} className={classes.container}>

						<Grid item md={6}>     
							<TextInputBase
								id="nome"
								label="Nome"
								placeholder="Nome"
								error={touched.nome && errors.nome}
								value={values.nome || ""}
								onChange={handleChange}
								onBlur={handleBlur}
								required={true}
							/>

						</Grid>
						<Grid item md={6} >     
							<TextInputBase
								id="email"
								label="E-mail"
								placeholder="E-mail"
								error={touched.email && errors.email}
								value={values.email || ""}
								onChange={handleChange}
								onBlur={handleBlur}
								required={true}
							/>

						</Grid>

						<Grid item md={3}>     
							<InputMask mask="(99) 99999-9999" value={values.fone || ""} onChange={handleChange} onBlur={handleBlur}>
								{(inputProps) => <TextInputBase id="fone" label="Telefone" placeholder="Telefone" error={touched.fone && errors.fone} {...inputProps}  />}
							</InputMask>
						</Grid>

						<Grid item md={3}>     
							<InputMask mask="999.999.999-99" value={values.cpf || ""} onChange={handleChange} onBlur={handleBlur}>
								{(inputProps) => <TextInputBase id="cpf" label="CPF" placeholder="CPF" error={touched.cpf && errors.cpf} {...inputProps}  />}
							</InputMask>
						</Grid>

						<Grid item md={6} >     
							<TextInputBase
								id="endereco"
								label="Endereço"
								placeholder="Endereço"
								error={touched.endereco && errors.endereco}
								value={values.endereco || ""}
								onChange={handleChange}
								onBlur={handleBlur}
							/>

						</Grid>

						<Grid item md={3} >
							<DateInputBase
							id="data_nascimento"						
							label="Data nascimento"
							value={values.data_nascimento} 
							error={error} 						
							disableFuture={true}
							onError={(e) => {
								if (e) setErrors({data_nascimento: e})
							}}
							onChange={(_, dateString) => {
								setFieldValue('data_nascimento', dateString)
							}}
							required={true}
							/>
						</Grid>

						<Grid item md={3} >
							<SelectInputBase 
								id="sexo" 
								label="Sexo"
								value={values.sexo}
								onChange={(item) => {								
									setFieldValue('sexo', item.target.value)
								}}
								enum={enumSexo}
							/>
						</Grid>

					</Grid>
				</div>
			
			)}

			{activeTab === 1 && (

				<AnexosPaciente
					codigo={values.id}
				/>
			)}

		</Fragment>
	)

}

const CadastroPaciente = formikEnhancer(CadastroPacienteForm)

export default CadastroPaciente