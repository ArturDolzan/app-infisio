import React, {Fragment} from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import TextInputBase from '../../base/input/textInputBase'
import initialValue from '../../base/crud/initialValueHelper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import CadastroBase from '../../base/crud/cadastroBase'
import Convenios from '../../model/configuracoes/convenios/convenios'
import ConveniosController from '../../controller/configuracoes/convenios/conveniosController'


const formikEnhancer = withFormik({
    
	validationSchema: Yup.object().shape({    
	  nome: Yup.string()
		 .required('O campo nome é obrigatório!')
		 .nullable(),
	}),
 
	mapPropsToValues: () => {

		let obj = initialValue(new Convenios())

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


const CadastroConvenioForm = props => {
	
	const {handleSubmit} = props
	const classes = useStyles()	
	const [retrieve, setRetrieve] = React.useState(false)

  return (
    <Fragment> 

			<form onSubmit={handleSubmit} >

				<CadastroBase
					{...props}
					controller={new ConveniosController()}
					title={"Convênio"}
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
							label="Nome do convênio"
							placeholder="Nome do convênio"
							error={touched.nome && errors.nome}
							value={values.nome || ""}
							onChange={handleChange}
							onBlur={handleBlur}
							required={true}
						/>

					</Grid>
					
				</Grid>
			
			)}
		</Fragment>
	)

}

const CadastroConvenio = formikEnhancer(CadastroConvenioForm)

export default CadastroConvenio