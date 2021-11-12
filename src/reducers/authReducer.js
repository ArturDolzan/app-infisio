export const SET_LOGGED = 'SET_LOGGED'
export const SET_AUTH = 'SET_AUTH'
export const SET_IMAGE_AUTH = 'SET_IMAGE_AUTH'
export const SET_RECUPERAR_SENHA = 'SET_RECUPERAR_SENHA'
 
const initialState = {   
    isLogged: false,
    email: '',
    name: '',
    idtenant: null,
    token: null,
    password: null,
    id: null,
    urlImage: ``,
    idagente: null,
    isRecuperarSenha: false,
    emailRecuperarSenha: ``,
}
 
export default (state = initialState, action) => {
 //console.log(action)
   switch(action.type) {
       case SET_LOGGED:
  
           return {
                ...state,
                isLogged: action.payload
            }

        case SET_AUTH:
            
           return {
                ...state,
                isLogged: action.payload.isLogged,
                email: action.payload.email,
                idtenant: action.payload.idtenant,
                token: action.payload.token,
                name: action.payload.name,
                master: action.payload.master,
                password: action.payload.password,
                id: action.payload.id,
                idagente: action.payload.idagente,
            }
        
        case SET_IMAGE_AUTH:
            
            return {
                ...state,
                urlImage: action.payload
            }

        case SET_RECUPERAR_SENHA:
        
            return {
                ...state,
                isRecuperarSenha: action.payload.isRecuperarSenha,
                emailRecuperarSenha: action.payload.emailRecuperarSenha
            }
           
       default:
           return state;
   }
}
