import React, {Fragment} from 'react'
import {Route, Redirect} from 'react-router-dom'

import ClinicaDashboard from './clinicaDashboard/clinicaDashboard'

import PreSessoes from './sessoes/preSessoes'
import SessoesGeral from './sessoes/sessoesGeral'

import ListaPaciente from './pacientes/listaPaciente'
import CadastroPaciente from './pacientes/cadastroPaciente'
import AnamnesePaciente from './pacientes/anamnesePaciente'

import ListaTratamentos from './tratamentos/listaTratamentos'
import CadastroTratamentos from './tratamentos/cadastroTratamentos'

import ListaConvenio from './convenios/listaConvenio'
import CadastroConvenio from './convenios/cadastroConvenio'

const Clinica = ({match}) => {

    return (
        <Fragment>

            <Route exact path={`${match.url}/sessoes`} component={PreSessoes}/>
            <Route exact path={`${match.url}/sessoes/:idpaciente`} component={SessoesGeral}/>

            <Route exact path={`${match.url}/paciente`} component={ListaPaciente}/>
            <Route exact path={`${match.url}/paciente/cadastro/:id`} component={CadastroPaciente}/>
            <Route exact path={`${match.url}/paciente/anamnese/:id`} component={AnamnesePaciente}/>

            <Route exact path={`${match.url}/tratamentos`} component={ListaTratamentos}/>
            <Route exact path={`${match.url}/tratamentos/cadastro/:id`} component={CadastroTratamentos}/>

            <Route exact path={`${match.url}/convenio`} component={ListaConvenio}/>
            <Route exact path={`${match.url}/convenio/cadastro/:id`} component={CadastroConvenio}/>

            <Route exact path={`${match.url}/`} component={ClinicaDashboard}/>
            
        </Fragment>
    )
}

export default Clinica