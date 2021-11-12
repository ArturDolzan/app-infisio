import ModelBase from '../../base/modelBase'

class Clinicas extends ModelBase {
    
    constructor() {
        super()

        let model = [
            {id: "nome", label: "Nome", hidden: false, type: "string"},
            {id: "email", label: "E-mail", hidden: false, type: "string"},
            {id: "razao_social", label: "Razão social", hidden: false, type: "string"},
            {id: "idestado", label: "Cód. estado", hidden: true, type: "int"},
            {id: "idcidade", label: "Cód. cidade", hidden: true, type: "int"},
            {id: "cep", label: "CEP", hidden: false, type: "string"},
            {id: "endereco", label: "Endereço", hidden: false, type: "string"},
            {id: "fone", label: "Telefone", hidden: false, type: "string"},
            {id: "cnpj", label: "CNPJ", hidden: false, type: "string"},
            
        ]

        this.fields = [...this.fields, ...model]
    }
}

export default Clinicas