
const registerButton = document.querySelector(`#register-button`);
const registerLink = document.querySelector(`#register-link`)
const registerForm = document.querySelector(`#pills-register`)
const loginButton = document.querySelector(`#login-button`);
const loginForm = document.querySelector(`#pills-login`)
const tabLogin =document.querySelector(`#tab-login`)

if(users__storage!=null){users=users__storage}
// logIn.html carga. Botones y display de los formularios
function activar(divMostrarID, divOcultarID){
    let divMostrar = document.querySelector(`#${divMostrarID}`)
    let divOcultar = document.querySelector(`#${divOcultarID}`)

    divMostrar.classList.add("active");
    divOcultar.classList.remove("active");
    
}
function mostrarDiv(divMostrarSelector, divOcultarSelector){
    let divMostrar = document.querySelector(`${divMostrarSelector}`)
    let divOcultar = document.querySelector(`${divOcultarSelector}`)
    divMostrar.classList.add("show","active");
    divOcultar.classList.remove("show","active");  
}

registerButton.addEventListener("click", (e)=>{
    activar("tab-register", "tab-login");
    mostrarDiv("#pills-register", "#pills-login")
    e.preventDefault()
});
loginButton.addEventListener("click", (e)=>{
    tabLogin.classList.remove("active")
    activar("tab-login","tab-register")
    mostrarDiv("#pills-login","#pills-register")
    e.preventDefault()
    
})


registerLink.addEventListener("click", (e)=>{
    tabLogin.classList.remove("active")
    activar("tab-register", "tab-login");
    mostrarDiv("#pills-register", "#pills-login")
    e.preventDefault()
})


// Login form 
const signIn = document.querySelector(`#signIn-button`)
const rememberMe = document.querySelector(`#loginCheck`)

signIn.addEventListener("click", (e)=>{
    e.preventDefault()
    const loginName= document.querySelector(`#loginName`)
    const loginPassword = document.querySelector(`#loginPassword`)

    // chequear en base de datos
    let usuario = users.find((el) => el.usuario == loginName.value && el.contraseña == loginPassword.value)
    // inicio sesion del usuario
    if(usuario){
        localStorage.setItem("usuarioActual", usuario.usuario)

        if(rememberMe.checked){
            sessionStorage.setItem("usuarioActual", usuario.usuario)
        }
        window.location.href='html/agenda.html'
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Usuario no encontrado',
            showConfirmButton: false,
            timer: 1700
          })
    }    
})

// Register form
const signUp = document.querySelector(`#signUp-button`)
const registerInputs = registerForm.querySelectorAll(`input`)
signUp.addEventListener("click", (e)=>{
    e.preventDefault()
//     registerInputs.forEach((input)=>console.log(input.value))
    let nuevoUsuario = new User (registerInputs[0].value, registerInputs[2].value, registerInputs[1].value, registerInputs[3].value)
    users.push(nuevoUsuario)
    sessionStorage.setItem("usuarios", JSON.stringify(users))
    console.log(users)
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario creado con éxito',
        showConfirmButton: true,
        // timer: 1500
      })
    
})


