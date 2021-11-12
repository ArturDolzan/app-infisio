import axios from 'axios'
import url from '../../config/urlApi'

export const recuperarImagem = (id, cbSucess, cbError) => {

    axios.get(`${url}/contasTenant/imagem/${id}`)
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
      .post(`${url}/contasTenant/salvarimagem/${id}`, formData, config)
      .then(cbSucess)
      .catch(cbError)
}