import ModelBase from '../../base/modelBase'
import enumSexo from '../../enumeradores/enumSexo'

class Pacientes extends ModelBase {
    
    constructor() {
        super()

        let model = [
            {id: "nome", label: "Nome", hidden: false, type: "string"},
            {id: "fone", label: "Telefone", hidden: false, type: "string"},
            {id: "email", label: "E-mail", hidden: false, type: "string"},
            {id: "endereco", label: "Endereço", hidden: false, type: "string"},            
            {id: "cpf", label: "CPF", hidden: false, type: "string"},                        
            {id: "sexo", label: "Sexo", hidden: false, type: "enum", enum: enumSexo, defaultValue: 1},
            {id: "data_nascimento", label: "Data de nascimento", hidden: false, type: "date", defaultValue: '01/01/1990'},
            
        ]

        this.fields = [...this.fields, ...model]
    }
}

export default Pacientes