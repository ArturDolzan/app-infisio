import {recuperar, salvar, remover, salvarEdicao} from '../../../store/clinica/pacientesAnexos/pacientesAnexosStore'

class PacientesAnexosController {

    recuperar = (idpaciente, cbSucess, cbError) => {

        recuperar(idpaciente, cbSucess, cbError)
    }

    salvarEdicao = (data) => {

        return salvarEdicao(data)
    }

    salvar = (data, file, cbSucess, cbError) => {

        salvar(data, file, cbSucess, cbError)
    }

    remover = (id, cbSucess, cbError) => {

        remover(id, cbSucess, cbError)
    }
}

export default PacientesAnexosController