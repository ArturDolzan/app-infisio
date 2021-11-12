import React, {Fragment} from 'react'
import ListaBase from '../../base/crud/listaBase'
import Clinicas from '../../model/clinica/clinicas/clinicas'
import ClinicasController from '../../controller/clinica/clinicas/clinicasController'

const ListaClinica = (props) => {

    const columnsFormat = []

    return (
        <Fragment>

            <ListaBase
                model={new Clinicas()}
                controller={new ClinicasController()}
                title={"Clínicas"}
                columnsFormat={columnsFormat}
                filterPlaceholder={"Filtrar por nome, email, etc..."}
            />

        </Fragment>
    )
}

export default ListaClinica