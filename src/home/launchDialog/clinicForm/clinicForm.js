import React, {Fragment} from 'react'
import TextInputBase from '../../../base/input/textInputBase'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({   
    container: {
      paddingTop: theme.spacing(5),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    }
}))

const ClinicForm = props => {
  
    const {
        values,
        touched,
        errors,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
    } = props

    const classes = useStyles()

  return (
    <Fragment> 

        <Grid container spacing={2} className={classes.container}>

            <Grid item md={12}>     
                <TextInputBase
                    id="nome"
                    label="Nome da Clínica"
                    placeholder="Nome da Clínica"
                    error={touched.nome && errors.nome}
                    value={values.nome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={true}
                />

            </Grid>
            <Grid item md={12} >     
                <TextInputBase
                    id="email"
                    label="E-mail"
                    placeholder="E-mail"
                    error={touched.email && errors.email}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={true}
                />

            </Grid>
        </Grid>

    </Fragment>
  )
}

export default ClinicForm