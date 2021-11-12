import ModelBase from '../../base/modelBase'

class Anamneses extends ModelBase {
    
    constructor() {
        super()

        let model = [
            {id: "idpaciente", label: "Cód paciente", hidden: true, type: "int"},
            {id: "qp", label: "Queixa principal", hidden: false, type: "string"},
            {id: "hda", label: "História de doença atual", hidden: false, type: "string"},
            {id: "ap", label: "Antecedentes patológicos", hidden: false, type: "string"},
            {id: "af", label: "Antecedentes familiares", hidden: false, type: "string"},
            {id: "hv", label: "Hábitos de vida", hidden: false, type: "string"},
            
        ]

        this.fields = [...this.fields, ...model]
    }
}

export default Anamneses