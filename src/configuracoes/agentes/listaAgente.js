import React, {Fragment} from 'react'
import ListaBase from '../../base/crud/listaBase'
import Agentes from '../../model/configuracoes/agentes/agentes'
import AgentesController from '../../controller/configuracoes/agentes/agentesController'

const ListaAgente = (props) => {

    const columnsFormat = []

    return (
        <Fragment>

            <ListaBase
                model={new Agentes()}
                controller={new AgentesController()}
                title={"Usuários"}
                columnsFormat={columnsFormat}
                filterPlaceholder={"Filtrar por nome, e-mail, etc..."}
            />

        </Fragment>
    )
}

export default ListaAgente