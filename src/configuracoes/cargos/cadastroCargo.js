import React, {Fragment} from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import TextInputBase from '../../base/input/textInputBase'
import initialValue from '../../base/crud/initialValueHelper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import CadastroBase from '../../base/crud/cadastroBase'
import Cargos from '../../model/configuracoes/cargos/cargos'
import CargosController from '../../controller/configuracoes/cargos/cargosController'


const formikEnhancer = withFormik({
    
	validationSchema: Yup.object().shape({    
	  descricao: Yup.string()
		 .required('O campo descrição é obrigatório!')
		 .nullable(),
	}),
 
	mapPropsToValues: () => {

		let obj = initialValue(new Cargos())

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


const CadastroCargoForm = props => {
	
	const {handleSubmit} = props
	const classes = useStyles()	
	const [retrieve, setRetrieve] = React.useState(false)

  return (
    <Fragment> 

			<form onSubmit={handleSubmit} >

				<CadastroBase
					{...props}
					controller={new CargosController()}
					title={"Cargos"}
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
							id="descricao"
							label="Descrição do cargo"
							placeholder="Descrição do cargo"
							error={touched.descricao && errors.descricao}
							value={values.descricao || ""}
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

const CadastroCargo = formikEnhancer(CadastroCargoForm)

export default CadastroCargo