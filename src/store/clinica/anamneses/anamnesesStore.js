import axios from 'axios'
import url from '../../../config/urlApi'

export const recuperarPorIdDoPaciente = (id, cbSucess, cbError) => {

    axios.get(`${url}/anamneses/${id}`)
     .then(cbSucess)
     .catch(cbError)
}

export const salvar = (data, cbSucess, cbError) => {

    axios.post(`${url}/anamneses`, data)
     .then(cbSucess)
     .catch(cbError)
}