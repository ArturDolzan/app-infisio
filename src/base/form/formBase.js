// NAO DESENVOLVIDO AINDA

import React, {Fragment} from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import classnames from 'classnames'
import TextInputBase from './base/input/textInputBase'

const formikEnhancer = withFormik({
    
  validationSchema: Yup.object().shape({    
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),

  mapPropsToValues: ({ data }) => ({
    ...data,
  }),

  handleSubmit: (payload, { setSubmitting }) => {
    alert(payload.email)
    setSubmitting(false)
  },

  displayName: 'Formulário',

})


const form = props => {
  
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

  return (
    <form onSubmit={handleSubmit}>      
      <TextInputBase
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        error={touched.email && errors.email}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      
    </form>
  )
}

const FormBase = formikEnhancer(form)

export default FormBase