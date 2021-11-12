import React, {Fragment} from 'react'
import ListaBase from '../../base/crud/listaBase'
import Cargos from '../../model/configuracoes/cargos/cargos'
import CargosController from '../../controller/configuracoes/cargos/cargosController'

const ListaCargo = (props) => {

    const columnsFormat = []

    return (
        <Fragment>

            <ListaBase
                model={new Cargos()}
                controller={new CargosController()}
                title={"Cargos"}
                columnsFormat={columnsFormat}
                filterPlaceholder={"Filtrar por nome"}
            />

        </Fragment>
    )
}

export default ListaCargo