import axios from 'axios'
import url from '../../../config/urlApi'

export const recuperar = (idpaciente, cbSucess, cbError) => {

    axios.get(`${url}/pacientesAnexos/${idpaciente}`)
     .then(cbSucess)
     .catch(cbError)
}

export const salvarEdicao = (data) => {

  return new Promise((resolve, reject) => {

    axios.post(`${url}/pacientesAnexos/salvarEdicao`, data)
    .then(cb => resolve(cb))
    .catch(error => reject(error))
  })
}

export const salvar = (data, file, cbSucess, cbError) => {

  const formData = new FormData()
    formData.append("file", file)
    formData.append("descricao", data.descricao)
    formData.append("idpaciente", data.idpaciente)

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    }
    
    axios
      .post(`${url}/pacientesAnexos`, formData, config)
      .then(cbSucess)
      .catch(cbError)
}

export const remover = (id, cbSucess, cbError) => {

    axios.delete(`${url}/pacientesAnexos/${id}`)
     .then(cbSucess)
     .catch(cbError)
}
