import axios from 'axios'
import url from '../../../config/urlApi'

export const recuperar = (qtdePagina, numeroPagina, filters) => {

    return new Promise((resolve, reject) => {

        axios.get(`${url}/sessoes/${qtdePagina}/${numeroPagina}/${JSON.stringify(filters)}`)
        .then(cb => resolve(cb))
        .catch(error => reject(error))
    })
}

export const recuperarPorId = (id) => {

    return new Promise((resolve, reject) => {

        axios.get(`${url}/sessoes/${id}`)
        .then(cb => resolve(cb))
        .catch(error => reject(error))
    })
}

export const salvar = (data) => {

    return new Promise((resolve, reject) => {

        axios.post(`${url}/sessoes`, data)
        .then(cb => resolve(cb))
        .catch(error => reject(error))
    })
}

export const recuperarPeriodo = (data) => {
    
    return new Promise((resolve, reject) => {

        axios.post(`${url}/sessoes/recuperarPeriodo`, data)
        .then(cb => resolve(cb))
        .catch(error => reject(error))
    })
}

export const recuperarSessoesPorPaciente = (data) => {
    
    return new Promise((resolve, reject) => {

        axios.post(`${url}/sessoes/recuperarSessoesPorPaciente`, data)
        .then(cb => resolve(cb))
        .catch(error => reject(error))
    })
}

export const concluirSessao = (data) => {

    return new Promise((resolve, reject) => {

        axios.post(`${url}/sessoes/concluir`, data)
        .then(cb => resolve(cb))
        .catch(error => reject(error))
    })
}

export const cancelarSessao = (data) => {

    return new Promise((resolve, reject) => {

        axios.post(`${url}/sessoes/cancelar`, data)
        .then(cb => resolve(cb))
        .catch(error => reject(error))
    })
}

export const lancarEmLote = (data) => {

    return new Promise((resolve, reject) => {

        axios.post(`${url}/sessoes/lancarEmLote`, data)
        .then(cb => resolve(cb))
        .catch(error => reject(error))
    })
}

export const recuperarDadosGraficoResumoSessoes = (data) => {

    return new Promise((resolve, reject) => {

        axios.post(`${url}/sessoes/recuperarDadosGraficoResumoSessoes`, data)
        .then(cb => resolve(cb))
        .catch(error => reject(error))
    })
}

export const recuperarDadosTimelineSessoes = (data) => {

    return new Promise((resolve, reject) => {

        axios.post(`${url}/sessoes/recuperarDadosTimelineSessoes`, data)
        .then(cb => resolve(cb))
        .catch(error => reject(error))
    })
}