import ModelBase from '../../base/modelBase'
import enumSituacaoSessoes from '../../../model/enumeradores/enumSituacaoSessoes'
import enumModalidadeSessao from '../../../model/enumeradores/enumModalidadeSessao'

class Sessoes extends ModelBase {
    
    constructor() {
        super()

        let model = [
            {id: "descricao", label: "Descrição", hidden: false, type: "string"},
            {id: "data_agendamento_inicial", label: "Data inicial", hidden: false, type: "datetime"},
            {id: "data_agendamento_final", label: "Data final", hidden: false, type: "datetime"},
            {id: "situacao", label: "Situação", hidden: false, type: "enum", enum: enumSituacaoSessoes},
            {id: "nome", label: "Paciente", hidden: false, type: "fk", relation: "pacientes"},
            {id: "nome", label: "Usuário", hidden: false, type: "fk", relation: "agentes"},
            {id: "nome", label: "Convênio", hidden: false, type: "fk", relation: "convenios"},             
            {id: "descricao", label: "Locais de agenda", hidden: false, type: "fk", relation: "locaisReuniao"},
            {id: "valor_sessao", label: "Valor sessão", hidden: false, type: "decimal"},                                    
            {id: "observacao", label: "Observação", hidden: false, type: "string"},
            {id: "data_cadastro", label: "Data cadastro", hidden: true, type: "datetime"},
            {id: "tratamentosSessoes", label: "Tratamentos", hidden: true, type: "fk", save: true},
            {id: "modalidade", label: "Modalidade", hidden: true, type: "enum", enum: enumModalidadeSessao, ignoreField: true},
            {id: "start", label: "start", hidden: true, type: "datetime", ignoreField: true},
            {id: "end", label: "end", hidden: true, type: "datetime", ignoreField: true},
            {id: "startHour", label: "startHour", hidden: true, type: "datetime", ignoreField: true},
            {id: "endHour", label: "endHour", hidden: true, type: "datetime", ignoreField: true},
            
        ]

        this.fields = [...this.fields, ...model]
    }
}

export default Sessoes