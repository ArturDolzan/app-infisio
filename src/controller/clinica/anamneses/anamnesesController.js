import {recuperarPorIdDoPaciente, salvar} from '../../../store/clinica/anamneses/anamnesesStore'

class AnamnesesController {

    recuperarPorIdDoPaciente = (id, cbSucess, cbError) => {

        recuperarPorIdDoPaciente(id, cbSucess, cbError)
    }

    salvar = (data, cbSucess, cbError) => {

        salvar(data, cbSucess, cbError)
    }
}

export default AnamnesesController