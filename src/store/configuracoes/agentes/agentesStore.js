import axios from 'axios'
import url from '../../../config/urlApi'

export const recuperar = (qtdePagina, numeroPagina, filters, cbSucess, cbError) => {

    axios.get(`${url}/agentes/${qtdePagina}/${numeroPagina}/${JSON.stringify(filters)}`)
     .then(cbSucess)
     .catch(cbError)
}

export const recuperarPorId = (id, cbSucess, cbError) => {

    axios.get(`${url}/agentes/${id}`)
     .then(cbSucess)
     .catch(cbError)
}

export const salvar = (data, cbSucess, cbError) => {

    axios.post(`${url}/agentes`, data)
     .then(cbSucess)
     .catch(cbError)
}

export const remover = (id, cbSucess, cbError) => {

    axios.delete(`${url}/agentes/${id}`)
     .then(cbSucess)
     .catch(cbError)
}

export const recuperarImagem = (id, cbSucess, cbError) => {

    axios.get(`${url}/agentes/imagem/${id}`)
     .then(cbSucess)
     .catch(cbError)
}

export const salvarImagem = (id, file, cbSucess, cbError) => {

    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", file.type)

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    }
    axios
      .post(`${url}/agentes/salvarimagem/${id}`, formData, config)
      .then(cbSucess)
      .catch(cbError)
}