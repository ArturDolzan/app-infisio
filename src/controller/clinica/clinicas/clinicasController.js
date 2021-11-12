import {recuperar, recuperarPorId, salvar, remover, inserirPrimeiraClinica} from '../../../store/clinica/clinicas/clinicasStore'

class ClinicasController {

    recuperar = (qtdePagina, numeroPagina, filters, cbSucess, cbError) => {

        recuperar(qtdePagina, numeroPagina, filters, cbSucess, cbError)
    }

    recuperarPorId = (id, cbSucess, cbError) => {

        recuperarPorId(id, cbSucess, cbError)
    }

    salvar = (data, cbSucess, cbError) => {

        salvar(data, cbSucess, cbError)
    }

    remover = (id, cbSucess, cbError) => {

        remover(id, cbSucess, cbError)
    }

    inserirPrimeiraClinica = (Clinicas, cbSucess, cbError) => {

        inserirPrimeiraClinica(Clinicas, cbSucess, cbError)
    }
}

export default ClinicasController