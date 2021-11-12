import React, {Fragment} from 'react'
import ListaBase from '../../base/crud/listaBase'
import LocaisReuniao from '../../model/configuracoes/locaisReuniao/locaisReuniao'
import LocaisReuniaoController from '../../controller/configuracoes/locaisReuniao/locaisReuniaoController'

const ListaLocaisReuniao = (props) => {

    const columnsFormat = []

    return (
        <Fragment>

            <ListaBase
                model={new LocaisReuniao()}
                controller={new LocaisReuniaoController()}
                title={"Locais"}
                columnsFormat={columnsFormat}
                filterPlaceholder={"Filtrar por descrição..."}
            />

        </Fragment>
    )
}

export default ListaLocaisReuniao