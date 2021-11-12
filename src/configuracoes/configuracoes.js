import React, {Fragment} from 'react'
import {Route} from 'react-router-dom'

import ConfiguracoesDashboard from './configuracoesDashboard/configuracoesDashboard'

import ListaAgente from './agentes/listaAgente'
import CadastroAgente from './agentes/cadastroAgente'

import ListaLocaisReuniao from '../configuracoes/locaisReuniao/listaLocaisReuniao'
import CadastroLocaisReuniao from '../configuracoes/locaisReuniao/cadastroLocaisReuniao'

import ListaCargo from './cargos/listaCargo'
import CadastroCargo from './cargos/cadastroCargo'


const Configuracoes = ({match}) => {

    return (
        <Fragment>

            <Route exact path={`${match.url}/agente`} component={ListaAgente}/>
            <Route exact path={`${match.url}/agente/cadastro/:id`} component={CadastroAgente}/>

            <Route exact path={`${match.url}/locaisReuniao`} component={ListaLocaisReuniao}/>
            <Route exact path={`${match.url}/locaisReuniao/cadastro/:id`} component={CadastroLocaisReuniao}/>

            <Route exact path={`${match.url}/cargo`} component={ListaCargo}/>
            <Route exact path={`${match.url}/cargo/cadastro/:id`} component={CadastroCargo}/>

            <Route exact path={`${match.url}/`} component={ConfiguracoesDashboard}/>
            
        </Fragment>
    )
}

export default Configuracoes