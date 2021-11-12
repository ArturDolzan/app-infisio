import ModelBase from '../../base/modelBase'
import enumSimNao from '../../enumeradores/enumSimNao'

class LocaisReuniao extends ModelBase {
    
    constructor() {
        super()

        let model = [
            {id: "descricao", label: "Descrição", hidden: false, type: "string"},
            {id: "ativo", label: "Ativo", hidden: false, type: "enum", enum: enumSimNao, defaultValue: 1},
            {id: "conflita_horario", label: "Conflita horário", hidden: false, type: "enum", enum: enumSimNao, defaultValue: 2}
        ]

        this.fields = [...this.fields, ...model]
    }
}

export default LocaisReuniao