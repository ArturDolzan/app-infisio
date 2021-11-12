import React, {Fragment} from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import TextInputBase from '../../base/input/textInputBase'
import initialValue from '../../base/crud/initialValueHelper'
import Grid from '@material-ui/core/Grid'
import InputMask from "react-input-mask"
import { makeStyles } from '@material-ui/core/styles'

import CadastroBase from '../../base/crud/cadastroBase'
import Clinicas from '../../model/clinica/clinicas/clinicas'
import ClinicasController from '../../controller/clinica/clinicas/clinicasController'


const formikEnhancer = withFormik({
    
	validationSchema: Yup.object().shape({    
	  nome: Yup.string()
		 .required('O campo nome é obrigatório!')
		 .nullable(),		 
	  email: Yup.string()
		 .required('O campo e-mail é obrigatório!')
		 .nullable()
		 .email('Formato de e-mail não é válido!'),
	}),
 
	mapPropsToValues: () => {

		let obj = initialValue(new Clinicas())

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
	},	
}))


const CadastroClinicaForm = props => {
	
	const {handleSubmit} = props
	const classes = useStyles()	
	const [retrieve, setRetrieve] = React.useState(false)

  return (
    <Fragment> 

			<form onSubmit={handleSubmit} >

				<CadastroBase
					{...props}
					controller={new ClinicasController()}
					title={"Clínica"}
					retrieve={retrieve}
					setRetrieve={setRetrieve}
					renderForm={renderForm(props, classes, retrieve)}
				/>      

			</form>   
	 </Fragment>	
  )
}

const renderForm = (props, classes, retrieve) => {

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
  } = props

	return (

		<Fragment>

			{retrieve && (

				<Grid container spacing={2} className={classes.container}>

					<Grid item md={6}>     
						<TextInputBase
							id="nome"
							label="Nome da Clínica"
							placeholder="Nome da Clínica"
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
						<InputMask mask="99.999.999/9999-99" value={values.cnpj || ""} onChange={handleChange} onBlur={handleBlur}>
							{(inputProps) => <TextInputBase id="cnpj" label="CNPJ" placeholder="CNPJ" error={touched.cnpj && errors.cnpj} {...inputProps}  />}
						</InputMask>
					</Grid>

					<Grid item md={6} >     
						<TextInputBase
							id="razao_social"
							label="Razão Social"
							placeholder="Razão Social"
							error={touched.razao_social && errors.razao_social}
							value={values.razao_social || ""}
							onChange={handleChange}
							onBlur={handleBlur}
						/>

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

					<Grid item md={3}>     
						<InputMask mask="99.999-999" value={values.cep || ""} onChange={handleChange} onBlur={handleBlur}>
							{(inputProps) => <TextInputBase id="cep" label="CEP" placeholder="CEP" error={touched.cep && errors.cep} {...inputProps}  />}
						</InputMask>
					</Grid>

				</Grid>
			
			)}
		</Fragment>
	)

}

const CadastroClinica = formikEnhancer(CadastroClinicaForm)

export default CadastroClinica