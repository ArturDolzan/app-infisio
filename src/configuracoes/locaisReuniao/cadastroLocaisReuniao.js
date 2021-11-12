import React, {Fragment} from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import TextInputBase from '../../base/input/textInputBase'
import SelectInputBase from '../../base/input/selectInputBase'
import initialValue from '../../base/crud/initialValueHelper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import CadastroBase from '../../base/crud/cadastroBase'
import LocaisReuniao from '../../model/configuracoes/locaisReuniao/locaisReuniao'
import LocaisReuniaoController from '../../controller/configuracoes/locaisReuniao/locaisReuniaoController'
import enumSimNao from '../../model/enumeradores/enumSimNao'


const formikEnhancer = withFormik({
    
	validationSchema: Yup.object().shape({    
	  descricao: Yup.string()
		 .required('O campo descrição é obrigatório!')
		 .nullable(),
	}),
 
	mapPropsToValues: () => {

		let obj = initialValue(new LocaisReuniao())

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


const CadastroLocaisReuniaoForm = props => {
	
	const {handleSubmit} = props
	const classes = useStyles()	
	const [retrieve, setRetrieve] = React.useState(false)

  return (
    <Fragment> 

			<form onSubmit={handleSubmit} >

				<CadastroBase
					{...props}
					controller={new LocaisReuniaoController()}
					title={"Locais de agenda"}
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

                    <Grid item sm={3} >     
                        <SelectInputBase 
                            id="conflita_horario" 
                            label="Conflita horário"
                            value={values.conflita_horario}
                            onChange={(item) => {								
                                setFieldValue('conflita_horario', item.target.value)
                            }}
                            enum={enumSimNao}
                        />

                    </Grid>
					
				</Grid>
			
			)}
		</Fragment>
	)

}

const CadastroLocaisReuniao = formikEnhancer(CadastroLocaisReuniaoForm)

export default CadastroLocaisReuniao