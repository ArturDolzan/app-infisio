import React, {Fragment} from 'react'
import ListaBase from '../../base/crud/listaBase'
import Convenios from '../../model/configuracoes/convenios/convenios'
import ConveniosController from '../../controller/configuracoes/convenios/conveniosController'

const ListaConvenio = (props) => {

    const columnsFormat = []

    return (
        <Fragment>

            <ListaBase
                model={new Convenios()}
                controller={new ConveniosController()}
                title={"Convênios"}
                columnsFormat={columnsFormat}
                filterPlaceholder={"Filtrar por nome"}
            />

        </Fragment>
    )
}

export default ListaConvenio