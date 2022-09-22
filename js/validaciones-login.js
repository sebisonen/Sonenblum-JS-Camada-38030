// VALIDACIONES DE CAMPOS DEL LOGIN

function validarNombre(elementoHTML){  
    // El criterio está definido por la negativa(osea, si lo cumple no esta validado)  
    let vacio= elementoHTML.value.trim()===""
    vacio?crearDivError(elementoHTML,`Este campo es obligatorio`):noModificarDivError(elementoHTML)
    let validado
    vacio?validado=false:validado=true
    validado?eliminarDivError(elementoHTML):noModificarDivError(elementoHTML)
    return validado
}
function validarEmail(elementoHTML){
    // Los criterios están definidos por la negativa(osea, si los cumple no esta validado)
    let vacio= elementoHTML.value.trim()===""
    vacio?crearDivError(elementoHTML,`Este campo es obligatorio`):noModificarDivError(elementoHTML)
    let yaExiste = users.some((el) => el.email == elementoHTML.value)
    yaExiste?crearDivError(elementoHTML,`Ya existe una cuenta con este email`):noModificarDivError(elementoHTML)
    let validado
    vacio||yaExiste?validado=false:validado=true
    validado?eliminarDivError(elementoHTML):noModificarDivError(elementoHTML)
    return validado
}
function validarUsuario(elementoHTML){
    // Los criterios están definidos por la negativa(osea, si los cumple no esta validado)
    let esCorto = elementoHTML.value.length<5
    esCorto?crearDivError(elementoHTML,`Mínimo 5 caracteres`):noModificarDivError(elementoHTML)
    let yaExiste = users.some((el) => el.usuario == elementoHTML.value)
    yaExiste?crearDivError(elementoHTML,`Este usuario ya existe`):noModificarDivError(elementoHTML)
    let vacio= elementoHTML.value.trim()==""
    vacio?crearDivError(elementoHTML,`Este campo es obligatorio`):noModificarDivError(elementoHTML)
    let validado
    vacio|| esCorto || yaExiste? validado = false : validado = true
    validado?eliminarDivError(elementoHTML):noModificarDivError(elementoHTML)
    return validado
}

function validarContraseña(elementoHTML){
    // Los criterios se definen por la positiva (osea, si los cumple esta validado)
    let largo = elementoHTML.value.length>5
    largo?noModificarDivError(elementoHTML):crearDivError(elementoHTML,`Mínimo 5 caracteres`)
    
    let hayCaracteres= elementoHTML.value.trim()!==""
    hayCaracteres?noModificarDivError(elementoHTML):crearDivError(elementoHTML,`Este campo es obligatorio`)   
    
    let validado
    hayCaracteres&& largo? validado=true:validado=false

    validado?eliminarDivError(elementoHTML):noModificarDivError(elementoHTML)
    return validado
}

function validarContraseñaRepetida(elementoHTML){
    // El criterio está definido por la positiva(osea, si lo cumple)
    let sonIdenticas = elementoHTML.value===registerPassword.value? true:false
    sonIdenticas?noModificarDivError(elementoHTML):crearDivError(elementoHTML,`Las contraseñas no son identicas` )
    let validado
    sonIdenticas? validado=true:validado=false

    validado?eliminarDivError(elementoHTML):noModificarDivError(elementoHTML)
    return validado
}

function campoVacio(elementoHTML){
    let campoVacio=elementoHTML.value===""
    return campoVacio
}
function huboError(elementoHTML){
    let divError= elementoHTML.parentNode.querySelector(`.error-div`)
    let hubo
    divError.textContent==""?hubo=false:hubo=true
    return hubo
}
function crearDivError(elementoHTML, mensaje){
    let divError= elementoHTML.parentNode.querySelector(`.error-div`)
    divError.innerText=`${mensaje}`
}

function eliminarDivError(elementoHTML){
    let divError= elementoHTML.parentNode.querySelector(`.error-div`)
    divError.innerText=""
}
function noModificarDivError(elementoHTML){
    let divError= elementoHTML.parentNode.querySelector(`.error-div`)
    divError.innerText+=""
}

// VALIDACIONES CAMPOS AL AGENDAR EVENTOS EN AGENDA.HTML
// Validacion de inputs al agregar un evento
function queNoEsteVacio(elementoHTML){
    let vacio= elementoHTML.value.trim()==""
    vacio?crearDivError(elementoHTML,`Este campo es obligatorio`):noModificarDivError(elementoHTML)
    let validacion 
    vacio?validacion=false:validacion=true
    validacion?eliminarDivError(elementoHTML):noModificarDivError(elementoHTML)
    return validacion
}
function queSeaDespues(elementoHTML1,elementoHTML2){
    let validacion
    elementoHTML1.value>elementoHTML2.value?validacion=false:validacion=true
    crearDivError(elementoHTML1,"El evento debe terminar luego de haber empezado")
    validacion?eliminarDivError(elementoHTML1):noModificarDivError(elementoHTML1)
    return validacion
}