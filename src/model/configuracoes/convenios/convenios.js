import ModelBase from '../../base/modelBase'

class Convenios extends ModelBase {
    
    constructor() {
        super()

        let model = [
            {id: "nome", label: "Nome", hidden: false, type: "string"},            
        ]

        this.fields = [...this.fields, ...model]
    }
}

export default Convenios