const handleError = error => {
    
    if (error.response) {
        if (error.response.data) {

            if (typeof error.response.data === 'object') {

                if (error.response.data.mensagem) {
                    return error.response.data.mensagem
                }
                return `O banco de dados retornou uma excessão: \n\n Código: ${error.response.data.code} Rotina: ${error.response.data.routine}`
            }

            return error.response.data
        }
    }

    return error
}

export default handleError