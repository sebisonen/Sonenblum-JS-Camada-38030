
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

// Comment cards
const comentarios= document.querySelector(`#comentarios`)
let db = []
function datosTesimonios(){

    fetch('https://631a30c0dc236c0b1ed938be.mockapi.io/testimony') 
        .then((response) =>  response.json()) 
        .then((data) =>{
            db = data
            crearCardsTestimonios()
            
        }) 
        .catch((error)=>console.error("Se produjo un error: ", error))
}


function crearCardsTestimonios(){
    db.forEach((e)=>{
        // Por cada uno creo un div
        let div = document.createElement("div")
        div.classList.add("col-md-4", "mb-5", "mb-md-0")
        // div.classList.add("d-flex flex-row")
        // div.innerHTML = `<div class="card w-75 h-100">
        //                     <img class="card-img-top" src="${e.avatar}" alt="Card image cap">
        //                     <div class="card-body">
        //                     <h5 class="card-title">${e.nombre} ${e.apellido}</h5>
        //                     <p class="card-text">"${e.testimonio}"</p>
        //                     </div>
        //                 </div>`
        div.innerHTML=`
        <div class="row d-flex justify-content-center mb-4">
        <img src="${e.avatar}"
            class="rounded-circle shadow-1-strong w-25" />
        </div>
        <h5 class="mb-3">${e.nombre} ${e.apellido}</h5>
        <h6 class="text-primary mb-3">${e.trabajo}</h6>
        <p class="px-xl-3">
        <i class="fas fa-quote-left pe-2"></i>${e.testimonio}
        </p>
    `
        comentarios.appendChild(div)
    })
}
datosTesimonios()

// `
// <div class="col-md-4 mb-5 mb-md-0">
//     <div class="d-flex justify-content-center mb-4">
//     <img src="${e.avatar}"
//         class="rounded-circle shadow-1-strong" width="150" height="150" />
//     </div>
//     <h5 class="mb-3">${e.nombre} ${e.apellido}</h5>
//     <h6 class="text-primary mb-3">${e.trabajo}</h6>
//     <p class="px-xl-3">
//     <i class="fas fa-quote-left pe-2"></i>${e.testimonio}
//     </p>
// </div>
// `
