import ModelBase from '../../base/modelBase'
import enumSimNao from '../../enumeradores/enumSimNao'

class Agentes extends ModelBase {
    
    constructor() {
        super()

        let model = [
            {id: "nome", label: "Nome", hidden: false, type: "string"},            
            {id: "fone", label: "Telefone", hidden: false, type: "string"},
            {id: "email", label: "E-mail", hidden: false, type: "string"},
            {id: "cpf", label: "CPF", hidden: false, type: "string"},                        
            {id: "data_cadastro", label: "Data de cadastro", hidden: false, type: "date"},
            {id: "password", label: "Senha", hidden: true, type: "password"},
            {id: "confirm_password", label: "Confirmar senha", hidden: true, type: "password", ignoreField: true},            
            {id: "idcargo", label: "Cargo", hidden: true, type: "int"},            
            {id: "descricao", label: "Cargo", hidden: false, type: "fk", relation: "cargos"},
            {id: "ativo", label: "Ativo", hidden: false, type: "enum", enum: enumSimNao, defaultValue: 1},
        ]

        this.fields = [...this.fields, ...model]
    }
}

export default Agentes