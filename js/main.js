if(users__storage.length!=0){users=users__storage}


// Elementos HTML
// index
const index = document.querySelector(`#index`)
// Nav-Bar
    const navBar = document.querySelector(`#nav-bar`)
    const mesDiv = document.querySelector(`#mes-titulo`)
    const añoDiv = document.querySelector(`#año-titulo`)
    const botonSiguiente = document.querySelector(`#botonSiguiente`)
    const botonAtras = document.querySelector(`#botonAtras`)
    const botonHoy = document.querySelector(`#botonHoy`)
// Pestaña pop up de creacion de eventos
    const pestañaEvento = document.querySelector(`#pestañaEvento`)
// Botones de las distintas vistas
    // Vista agenda
    const vistaAgenda = document.querySelector(`#vista-agenda`)
    const agendaButton = document.querySelector("#agenda-button")
    const agendaLink = document.querySelector(`#agenda-link`)
    const monthButton = document.querySelector("#month-button")
    const monthLink = document.querySelector(`#month-link`)
    // Vista calendario
    const vistaCalendario = document.querySelector(`#vista-calendario`)
    const fechasCalendario = document.querySelector(`#fechasCalendario`)

// Snippets y variables globales
    // Me da el nombre entero de cualquier mes
    function monthName(fecha){
        return fecha.toLocaleDateString('default', { month: 'long' })
    }
    // Me da el nombre entero de cualquier dia de la semana
    function dayName(fecha){
        return fecha.toLocaleDateString('default', { weekday: 'long' })
    }
    // Me da el valor numerico de cuantos dias tiene un mes determinado
    function daysInMonth(fecha){
        let copiaDeFecha = new Date(fecha.valueOf())
        copiaDeFecha.setDate(1)
        copiaDeFecha.setMonth(copiaDeFecha.getMonth()+1)
        copiaDeFecha.setDate(0)
        return copiaDeFecha.getDate()
    }
    // Me da el indice del primer dia de la semana del mes Si es viernes, me devuelve 5
    function primerDia(fecha){
        let copiaDeFecha = new Date(fecha.valueOf())
        return copiaDeFecha.getDay(copiaDeFecha.setDate(1))
    }
    // Me da el indice del ultimo dia de la semana del mes. X Ej: Si es viernes, me devuelve 5
    function ultimoDia (fecha){
        let copiaDeFecha = new Date(fecha.valueOf())
        return copiaDeFecha.getDay(copiaDeFecha.setDate(daysInMonth(copiaDeFecha)))
    }
    const hhmm = (fecha)=>{
        return fecha.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
    function redondearA15Minutos(fecha) {
        const minutos = 15;
        const ms = 1000 * 60 * minutos;
      
        return new Date(Math.ceil(fecha.getTime() / ms) * ms);
    }
    // Storage
    const usuarioActual__storage = localStorage.getItem("usuarioActual")
    const usuarioActual = users.find((el)=> usuarioActual__storage==el.usuario)
    const agenda__Storage=JSON.parse(sessionStorage.getItem(`agenda de ${usuarioActual.nombre}`))
    usuarioActual.agenda=agenda__Storage||[]
    const parseDate = (string) =>{
        let date = new Date (string)
        return date 
    }
    // DOM
    function activar(divMostrarID, divOcultarID){
        let divMostrar = document.querySelector(`#${divMostrarID}`)
        let divOcultar = document.querySelector(`#${divOcultarID}`)
        divMostrar.classList.add("active");
        divOcultar.classList.remove("active");
        
    }
// 

// FUNCIONES DEL PROYECTO
const hoy = new Date()
function inicio(){
    let copiaHoy = new Date(hoy.valueOf())
    let mesActual = copiaHoy.getMonth()
    calendario(copiaHoy)//Imprimo el calendario en pantalla en base al dia de hoy
    botonHoy.addEventListener("click",()=>{
        copiaHoy = new Date(hoy.valueOf())
        mesActual = hoy.getMonth()
        calendario(copiaHoy)
    })
    botonSiguiente.addEventListener("click",()=>{
        if(mesActual>=11){
            mesActual=0
            copiaHoy.setFullYear(copiaHoy.getFullYear() + 1)
        }else{
        mesActual++
        }
        copiaHoy.setMonth(mesActual)
        calendario(copiaHoy)
    })
    botonAtras.addEventListener("click",()=>{
        if(mesActual<=0){
           mesActual=11
            copiaHoy.setFullYear(copiaHoy.getFullYear() -1)
        }else{
        mesActual--
        }
        copiaHoy.setMonth(mesActual)
        calendario(copiaHoy)
    })
    agendaDisplay()//Cuando se abra la app que se muestre la agenda    
}

//Hago dinamico el contenido de lo que se ve en pantalla
function calendario(copiaHoy){
    mesDiv.innerText = `${monthName(copiaHoy).toUpperCase()}`
    añoDiv.innerText = `${copiaHoy.getFullYear()}`
    fechasCalendario.innerHTML=``
    crearCuadricula(copiaHoy)
    resaltarHoy(hoy)
}

// Darle un detalle al dia actual
function resaltarHoy(fecha){
    const diasCalendario = document.querySelectorAll(`.diaCalendario`)
    
    diasCalendario.forEach((div)=>{
        if(fecha.valueOf()==div.id){
            div.classList.add("diaActual"); 
    }})
}


// Crear el calendario especifico segun las particularidades de cada mes y año
function crearCuadricula(fecha){
    fecha.setDate(1) //Fecha de referencia estática por cada mes: el primero de cada mes. (Explicacion: Si la fecha fuese 31 de enero, cuando quiera crear un calendario para el mes siguiente no voy a poder porque no hay 31 de feb, con esto elimino el dia actual como referencia.9
    hoy.setHours(0,0,0,0)
    const copiaFecha = new Date(fecha.valueOf())// Creo una segunda variable igual a la primera: es la que va a ir cambiando en funcion de cada cuadrado-calendario
    let cuadradosPrevios = primerDia(fecha)
    let cuadradosPosteriores = 6 - ultimoDia(fecha)
    for(let i = 0, j = 1; i<daysInMonth(fecha)+cuadradosPrevios+cuadradosPosteriores; i++, j++){
        if(cuadradosPrevios==0){// Para los casos que no haya que crear cuadrados antes
            if(j>daysInMonth(fecha)){//Pero sí hay que crear despues
                copiaFecha.setDate(1)
                j=1
                copiaFecha.setMonth(fecha.getMonth()+1)
            }
            copiaFecha.setDate(j)
        }else{// Para los casos que hay que crear cuadros antes
              
            copiaFecha.setDate(1)
            if (fecha.getMonth()==0){// Creando enero (cuando se manejan dos años distintos en la creacion)
                copiaFecha.setMonth(11)
                copiaFecha.setFullYear(fecha.getFullYear()-1)
            }
            else{//El resto de los meses que no son Enero
                copiaFecha.setMonth(fecha.getMonth()-1)}
                copiaFecha.setDate(parseInt(daysInMonth(copiaFecha))-cuadradosPrevios+j) //Esto me dice cual es el valor del primer cuadrado a pintar.
                if(fecha.getMonth()==11&&copiaFecha.getMonth()==0){//Cuando tengo que crear los cuadrados posteriores de diciembre
                    copiaFecha.setFullYear(fecha.getFullYear()+1)
                }
        }
        //Creo los div con sus clases correspondientes. A los anteriores al dia actual no permito agendar.
        let div = document.createElement("div");
		div.innerHTML = `<div id="${copiaFecha.valueOf()}" class="diaCalendario border vw-10">${copiaFecha.getDate()}</div>`
		fechasCalendario.appendChild(div);
        hoy.valueOf()<=div.firstElementChild.id?div.firstElementChild.classList.add("enabled"):div.firstElementChild.classList.add("disabled")
    }
    
    eventoToggle()//Abrir ventana de agendar un evento. NOTA: Si o si se inicializa aca. Sino queda por fuera de los eventos
    
}

// Cuando clickeo un div que se visualice el menu para agendar un evento
function eventoToggle(){ //Se activa cuando clickeo una fecha especifica
    const diasCalendario = document.querySelectorAll(`.enabled`)
    diasCalendario.forEach((div) =>{
        div.addEventListener("click", (e)=>{//Por cada dia del calendario creo la posibilidad de agendar un nuevo evento en aquel que clickee
            // Formateos de fecha para poder poner placeholders en forma de values
            let date = new Date(parseInt(div.id));
            let valueEventoDia = new Date(parseInt(div.id)).toISOString().split('T')[0]
            let value= redondearA15Minutos(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            date.setHours(date.getHours() + 1)
            let value2 = redondearA15Minutos(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

            pestañaEvento.style.display = "block"//Que se vea el menu
            pestañaEvento.innerHTML = `
                <div id="evento" class="d-flex flex-column justify-content-center w-100 h-100 p-3 gap-3">
                    <h2> Agende un evento </h2>
                    <div>
                        <input type="text" id="eventoNombre" placeholder="Ingrese un titulo">
                        <div class="error-div text-danger"></div>
                    </div>
                    <div>
                    <input type="date" id="eventoDia" value="${valueEventoDia}">
                        <div class="error-div text-danger"></div>
                    </div>                    
                    <div class="d-flex">
                        <input type="time" id="eventoDesde" value="${value}">
                        
                        <input type="time" id="eventoHasta" value="${value2}">
                        
                        <div class=" mx-5 error-div text-danger"></div>
                    </div>
                    <input id="eventoDetalle" type="text" placeholder="Agregar informacion">
                    <div class="d-flex gap-1">
                        <button id="agregarEvento" class="boton rounded">Agregar</button>
                        <button id="cancelarEvento" class="btn-dark rounded">Cancelar</button>
                    </div>
                </div>
            `
           
            agendarEvento(e)
        })
    })  
}

  
//Agendar un evento y tambien cancelar el agregar
function agendarEvento(e){
    // Variables DOM de la ventana toggle de eventoToggle()
    
    const eventoNombre = document.querySelector(`#eventoNombre`)
    const eventoDesde = document.querySelector(`#eventoDesde`)
    const eventoHasta = document.querySelector(`#eventoHasta`)
    const eventoDetalle = document.querySelector(`#eventoDetalle`)
    const cancelarEvento = document.querySelector(`#cancelarEvento`)
    const agregarEvento = document.querySelector(`#agregarEvento`)
    

    cancelarEvento.addEventListener("click", ()=>{//Si no quiero agregar, cierro la ventana
        pestañaEvento.style.display = "none"
    })
    agregarEvento.addEventListener("click", ()=>{
        // Manipulo los datos del html para armar la fecha DESDE (lio por los tipos de datos y conversiones del objeto Date)
        let desde=  new Date(parseInt(e.target.id))
        let [horasDesde, minutosDesde] = [eventoDesde.value.split(':')[0], eventoDesde.value.split(':')[1]]
        desde.setHours(horasDesde,minutosDesde,0)
        // Manipulo los datos del html para armar la fecha HASTA (lio por los tipos de datos y conversiones del objeto Date)
        let hasta = new Date(parseInt(e.target.id))
        let [horasHasta, minutosHasta] = [eventoHasta.value.split(':')[0], eventoHasta.value.split(':')[1]]
        hasta.setHours(horasHasta,minutosHasta,0)
        // Agrego el nuevo evento a la agenda
        let eventoCreado = {
            titulo: eventoNombre.value,
            desde: desde.getTime(),
            hasta:hasta.getTime(),
            informacion: eventoDetalle.value,
        }
        let validaciones= queNoEsteVacio(eventoNombre)&&queSeaDespues(eventoDesde,eventoHasta)
        if(validaciones){
            const agenda__Storage=JSON.parse(sessionStorage.getItem(`agenda de ${usuarioActual.nombre}`))
            if(agenda__Storage!=null){//Si estoy volviendo a iniciar sesion vuelvo a traer lo que cargué previamente
                usuarioActual.agenda=agenda__Storage
            }
            usuarioActual.agenda.push(eventoCreado)
            sessionStorage.setItem(`usuarios`, JSON.stringify(users))
            sessionStorage.setItem(`agenda de ${usuarioActual.nombre}`, JSON.stringify(usuarioActual.agenda))
            //Hago que se cierre la ventana
            pestañaEvento.style.display = "none"
            agendaDisplay()//Cada vez que se crea un evento se debe actualizar
        }else{
            queNoEsteVacio(eventoNombre)
            queSeaDespues(eventoDesde,eventoHasta)
        }
    })
}

function pintarDiv(){}
// Cerrar sesion
function cerrarSesion(){
    sessionStorage.removeItem("usuarioActual")
    localStorage.removeItem("usuarioActual")

}
const btn_cerrarSesion = document.querySelector(`#cerrarSesion`) 
btn_cerrarSesion.addEventListener("click", ()=>cerrarSesion())


// Distintas vistas:

// Vista agenda

agendaButton.addEventListener("click",()=>{
    activar("agenda-link", "month-link")
    vistaCalendario.classList.add("d-none")
    vistaCalendario.classList.remove("d-flex")
    vistaAgenda.classList.add("d-block")
    vistaAgenda.classList.remove("d-none")
    navBar.classList.add("d-none")
    navBar.classList.remove("d-flex")      
})
function agendaDisplay(){
    const agenda= usuarioActual.agenda
    agenda.sort((a,b)=>a.desde-b.desde)
    vistaAgenda.innerHTML= ``
    vistaAgenda.innerHTML += `    <h3 class="m-4 font-italic">Agenda de ${usuarioActual.nombre}</h3>`
    if (agenda!= null){
        for (let evento of agenda){ 
            vistaAgenda.innerHTML += `
            <div class="d-flex gap-3 border m-4 agenda-event-hover align-items-baseline">
                <p>${parseDate(evento.desde).toLocaleDateString()}</p>
                <h4>${evento.titulo}</h4>
                <p>${hhmm(parseDate(evento.desde))} a ${hhmm(parseDate(evento.hasta))}</p>
                <div class="trash-icon-container"></div>
                
            </div>`
    }}

}
// Vista mes
monthButton.addEventListener("click",()=>{
    activar("month-link", "agenda-link")
    vistaCalendario.classList.add("d-flex")
    vistaCalendario.classList.remove("d-none")
    vistaAgenda.classList.add("d-none")
    vistaAgenda.classList.remove("d-block")
    navBar.classList.add("d-flex")
    navBar.classList.remove("d-none")
})

// Inicializacion de funciones
inicio()
eventoToggle()


// pendiente:

// Validacion de campos en general tambien para el calendario
// Si el evento empieza 22hs que no termine 21 hs del mismo dia. (¿Evento change de la clase de librerias? Investigar)
// Crear eventos que duren mas de un dia. Desde y hasta tambien con la fecha y no solo horas.
// Interconexion entre usuarios. Distintas funcionalidades: agregar amigo (buscador de usuarios). Crear evento con mi amigo, etc
// Eliminar eventos y usuarios


// CORRECCION:
// Si entras directo a la url de la agenda sin estar logueado, no deberia dejarte, podes hacer una redireccion.

// Los datos que guardas en session storage, quizas deberias guardarlos en local storage, como por ejemplo los datos del registro o la agenda.

// La agenda cuando guardas algo, si recargas, reemplaza lo que ya tenias. Estaria bueno que se sume LISTO
//  y que se puedan eliminar o editar lo agregado a la agenda.
// Esto es similar a lo de usuario. Cuando refresco el array interno de JS se vacia. Por eso no puede guardar lo anterior.

// No deberia dejar agendar cosas para dias o horas del dia de hoy que ya pasaron, incluso podrias poner los dias que ya pasaron en un gris mas oscuro y bloquear los botones.
