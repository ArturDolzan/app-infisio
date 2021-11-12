import {
    recuperar, 
    recuperarPorId, 
    salvar, 
    recuperarPeriodo,
    recuperarSessoesPorPaciente, 
    concluirSessao, 
    cancelarSessao, 
    lancarEmLote, 
    recuperarDadosGraficoResumoSessoes,
    recuperarDadosTimelineSessoes
} from '../../../store/clinica/sessoes/sessoesStore'

class SessoesController {

    recuperar = (qtdePagina, numeroPagina, filters) => {

        return recuperar(qtdePagina, numeroPagina, filters)
    }

    recuperarPorId = (id) => {

        return recuperarPorId(id)
    }

    salvar = (data) => {

        return salvar(data)
    }

    recuperarPeriodo = (data) => {

        return recuperarPeriodo(data)
    }

    recuperarSessoesPorPaciente = (data) => {

        return recuperarSessoesPorPaciente(data)
    }

    concluirSessao = (data) => {

        return concluirSessao(data)
    }

    cancelarSessao = (data) => {

        return cancelarSessao(data)
    }

    lancarEmLote = (data) => {

        return lancarEmLote(data)
    }

    recuperarDadosGraficoResumoSessoes = (data) => {

        return recuperarDadosGraficoResumoSessoes(data)
    }

    recuperarDadosTimelineSessoes = (data) => {

        return recuperarDadosTimelineSessoes(data)
    }

}

export default SessoesController