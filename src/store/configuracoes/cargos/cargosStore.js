import axios from 'axios'
import url from '../../../config/urlApi'

export const recuperar = (qtdePagina, numeroPagina, filters, cbSucess, cbError) => {

    axios.get(`${url}/cargos/${qtdePagina}/${numeroPagina}/${JSON.stringify(filters)}`)
     .then(cbSucess)
     .catch(cbError)
}

export const recuperarPorId = (id, cbSucess, cbError) => {

    axios.get(`${url}/cargos/${id}`)
     .then(cbSucess)
     .catch(cbError)
}

export const salvar = (data, cbSucess, cbError) => {

    axios.post(`${url}/cargos`, data)
     .then(cbSucess)
     .catch(cbError)
}

export const remover = (id, cbSucess, cbError) => {

    axios.delete(`${url}/cargos/${id}`)
     .then(cbSucess)
     .catch(cbError)
}
