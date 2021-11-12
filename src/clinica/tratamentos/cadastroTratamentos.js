import React, {Fragment} from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import TextInputBase from '../../base/input/textInputBase'
import SelectInputBase from '../../base/input/selectInputBase'
import initialValue from '../../base/crud/initialValueHelper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import CadastroBase from '../../base/crud/cadastroBase'
import Tratamentos from '../../model/clinica/tratamentos/tratamentos'
import TratamentosController from '../../controller/clinica/tratamentos/tratamentosController'
import enumSimNao from '../../model/enumeradores/enumSimNao'


const formikEnhancer = withFormik({
    
	validationSchema: Yup.object().shape({    
	  descricao: Yup.string()
		 .required('O campo descrição é obrigatório!')
		 .nullable(),
	}),
 
	mapPropsToValues: () => {

		let obj = initialValue(new Tratamentos())

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


const CadastroTratamentosForm = props => {
	
	const {handleSubmit} = props
	const classes = useStyles()	
	const [retrieve, setRetrieve] = React.useState(false)

  return (
    <Fragment> 

			<form onSubmit={handleSubmit} >

				<CadastroBase
					{...props}
					controller={new TratamentosController()}
					title={"Tratamentos"}
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

					<Grid item sm={12}>     
						<TextInputBase
							id="descricao"
							label="Descrição"
							placeholder="Descrição"
							error={touched.descricao && errors.descricao}
							value={values.descricao || ""}
							onChange={handleChange}
							onBlur={handleBlur}
							multiline={true}
							rows={3}
							rowsMax={4}
							required={true}
						/>

					</Grid>

                    <Grid item sm={3} >     
                        <SelectInputBase 
                            id="ativo" 
                            label="Ativo"
                            value={values.ativo}
                            onChange={(item) => {								
                                setFieldValue('ativo', item.target.value)
                            }}
                            enum={enumSimNao}
                        />

                    </Grid>
					
				</Grid>
			
			)}
		</Fragment>
	)

}

const CadastroTratamentos = formikEnhancer(CadastroTratamentosForm)

export default CadastroTratamentos