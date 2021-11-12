import ModelBase from '../../base/modelBase'
import enumSimNao from '../../enumeradores/enumSimNao'

class Tratamentos extends ModelBase {
    
    constructor() {
        super()

        let model = [
            {id: "descricao", label: "Descrição", hidden: false, type: "string"},
            {id: "ativo", label: "Ativo", hidden: false, type: "enum", enum: enumSimNao, defaultValue: 1}
        ]

        this.fields = [...this.fields, ...model]
    }
}

export default Tratamentos