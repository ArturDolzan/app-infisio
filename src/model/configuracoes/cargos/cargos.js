import ModelBase from '../../base/modelBase'

class Cargos extends ModelBase {
    
    constructor() {
        super()

        let model = [
            {id: "descricao", label: "Descrição", hidden: false, type: "string"},            
        ]

        this.fields = [...this.fields, ...model]
    }
}

export default Cargos