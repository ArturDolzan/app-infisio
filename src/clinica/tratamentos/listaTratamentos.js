import React, {Fragment} from 'react'
import ListaBase from '../../base/crud/listaBase'
import Tratamentos from '../../model/clinica/tratamentos/tratamentos'
import TratamentosController from '../../controller/clinica/tratamentos/tratamentosController'

const ListaTratamentos = (props) => {

    const columnsFormat = []

    return (
        <Fragment>

            <ListaBase
                model={new Tratamentos()}
                controller={new TratamentosController()}
                title={"Tratamentos"}
                columnsFormat={columnsFormat}
                filterPlaceholder={"Filtrar descrição..."}
            />

        </Fragment>
    )
}

export default ListaTratamentos