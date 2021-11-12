import ModelBase from '../../base/modelBase'

class PacientesImagens extends ModelBase {
    
    constructor() {
        super()

        let model = [
            {id: "idpaciente", label: "Cód paciente", hidden: true, type: "int"},
            {id: "descricao", label: "Nome", hidden: false, type: "string"},
            {id: "data", label: "Data da imagem", hidden: false, type: "date"},
        ]

        this.fields = [...this.fields, ...model]
    }
}

export default PacientesImagens