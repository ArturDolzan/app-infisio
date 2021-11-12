import {recuperar, recuperarPorId, salvar, remover, recuperarImagem, salvarImagem} from '../../../store/clinica/pacientes/pacientesStore'

class PacientesController {

    recuperar = (qtdePagina, numeroPagina, filters, cbSucess, cbError) => {

        recuperar(qtdePagina, numeroPagina, filters, cbSucess, cbError)
    }

    recuperarPorId = (id, cbSucess, cbError) => {

        recuperarPorId(id, cbSucess, cbError)
    }

    salvar = (data, cbSucess, cbError) => {

        salvar(data, cbSucess, cbError)
    }

    remover = (id, cbSucess, cbError) => {

        remover(id, cbSucess, cbError)
    }

    recuperarImagem = (id, cbSucess, cbError) => {

        recuperarImagem(id, cbSucess, cbError)
    }

    salvarImagem = (id, base64, cbSucess, cbError) => {

        salvarImagem(id, this.base64ImageToBlob(base64), cbSucess, cbError)
    }

    base64ImageToBlob = (str) => {
    
        var pos = str.indexOf(';base64,');
        var type = str.substring(5, pos);
        var b64 = str.substr(pos + 8);
      
        var imageContent = atob(b64);
      
        var buffer = new ArrayBuffer(imageContent.length);
        var view = new Uint8Array(buffer);
      
        for(var n = 0; n < imageContent.length; n++) {
          view[n] = imageContent.charCodeAt(n);
        }
      
        var blob = new Blob([buffer], { type: type });
      
        return blob;
    }
}

export default PacientesController