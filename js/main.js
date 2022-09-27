if(users__storage.length!=0){users=users__storage} //IMPORTANTE PARA QUE CADA VEZ QUE SE ABRE LA VENTANA AGENDA TRAIGA LOS DATOS
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

// Snippets y funciones globales
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
    function yyyyMMdd(fecha){
    let copiaFecha = new Date(fecha.valueOf())
    let año = copiaFecha.toLocaleString("default", { year: "numeric" });
    let mes = copiaFecha.toLocaleString("default", { month: "2-digit" });
    let dia = copiaFecha.toLocaleString("default", { day: "2-digit" });
    let fechaString = año + "-" + mes + "-" + dia;
    return fechaString
    }

    function redondearA15Minutos(fecha) {
        const minutos = 15;
        const ms = 1000 * 60 * minutos;
      
        return new Date(Math.ceil(fecha.getTime() / ms) * ms);
    }
    // Storage
    const usuarioActual__storage = localStorage.getItem("usuarioActual")
    const usuarioActual = users.find((el)=> usuarioActual__storage==el.usuario)
    const agenda__Storage=JSON.parse(sessionStorage.getItem(`agenda de ${usuarioActual.usuario}`))
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
// Cerrar sesion
function cerrarSesion(){
    sessionStorage.removeItem("usuarioActual")
    localStorage.removeItem("usuarioActual")
}
const btn_cerrarSesion = document.querySelector(`#cerrarSesion`) 
btn_cerrarSesion.addEventListener("click", ()=>cerrarSesion())


// VISTA MES
// Boton para visualizar todo el contenido
monthButton.addEventListener("click",()=>{
    activar("month-link", "agenda-link")
    vistaCalendario.classList.add("d-flex")
    vistaCalendario.classList.remove("d-none")
    vistaAgenda.classList.add("d-none")
    vistaAgenda.classList.remove("d-block")
    navBar.classList.add("d-flex")
    navBar.classList.remove("d-none")
})
//Elementos de la vista mes
const hoy = new Date()
function inicio(){
    let copiaHoy = new Date(hoy.valueOf())//Con esta voy a trabajar
    let mesActual = copiaHoy.getMonth()
    calendario(copiaHoy)//Imprimo el calendario en pantalla en base al dia de hoy
    botonHoy.addEventListener("click",()=>{//BOTON PARA VOLVER AL DIA DE HOY
        copiaHoy = new Date(hoy)
        mesActual = hoy.getMonth()
        calendario(copiaHoy)
    })
    botonSiguiente.addEventListener("click",()=>{//BOTON PARA MOSTRAR EL MES SIGUIENTE
        if(mesActual>=11){
            mesActual=0
            copiaHoy.setFullYear(copiaHoy.getFullYear() + 1)
        }else{
        mesActual++
        }
        copiaHoy.setMonth(mesActual)
        calendario(copiaHoy)
    })
    botonAtras.addEventListener("click",()=>{//BOTON PARA MOSTRAR EL DIA ANTERIOR
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

//Hago dinamico el contenido de lo que se ve en pantalla y defino los contenidos y funcionalidades de la vista MES
function calendario(copiaHoy){
    mesDiv.innerText = `${monthName(copiaHoy).toUpperCase()}`
    añoDiv.innerText = `${copiaHoy.getFullYear()}`
    fechasCalendario.innerHTML=``
    crearCuadricula(copiaHoy)
    resaltarHoy(hoy)
}

// Resalto al dia actual
function resaltarHoy(fecha){
    const diasCalendario = document.querySelectorAll(`.diaCalendario`)
    diasCalendario.forEach((div)=>{
        if(fecha.valueOf()==div.id){
            div.classList.add("diaActual"); 
    }})
}


// Creo el calendario especifico segun las particularidades de cada mes y año
function crearCuadricula(fecha0){
    let fecha = new Date(fecha0)//Hago una copia para no modificar el paramentro que recibo
    fecha.setDate(1) //Fecha de referencia estática por cada mes: el primero de cada mes. (Explicacion: Si la fecha fuese 31 de enero, cuando quiera crear un calendario para el mes siguiente no voy a poder porque no hay 31 de feb, con esto elimino el dia actual como referencia)
    const copiaFecha = new Date(fecha.valueOf())// Creo una segunda variable igual a la primera: es la que va a ir cambiando en funcion de cada cuadrado-calendario, asi mantengo sin modificar el mes cuando tengo que crear cuadrados previos
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
            if (fecha.getMonth()==0){// Creando enero (cuando hay un cambio de año es un caso conflictivo por el la forma de)
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
        //Creo los div con sus clases correspondientes.
        let div = document.createElement("div");
		div.innerHTML = `<div id="${copiaFecha.valueOf()}" class="diaCalendario  vw-10">${copiaFecha.getDate()}</div>`
		fechasCalendario.appendChild(div);
        //  A los dias anteriores al dia actual no permito agendar.
        let fecha2 =new Date() //Otra copia. Me sirve para tener de referencia la hora 0 (quiero que tenga la clase enabled el div que sea durante el mismo dia)
        fecha2.setHours(0,0,0,0)
        fecha2.valueOf()<=div.firstElementChild.id?div.firstElementChild.classList.add("enabled"):div.firstElementChild.classList.add("disabled")
    }
    
    eventoToggle()//Abrir ventana de agendar un evento. NOTA: Si o si se inicializa aca. Sino queda por fuera de los eventos
    
}

// Cuando clickeo un div que se visualice el modal para agendar un evento
function eventoToggle(){ 
    const diasCalendario = document.querySelectorAll(`.enabled`)
    diasCalendario.forEach((div) =>{//Se activa cuando clickeo una fecha especifica
        div.addEventListener("click", ()=>{//Por cada dia del calendario creo la posibilidad de agendar un nuevo evento en aquel que clickee
            // Formateos de fecha para poder poner placeholders en forma de values
            let date = new Date(parseInt(div.id));
            let valueEventoDia = yyyyMMdd(new Date(parseInt(div.id)))
            let value= redondearA15Minutos(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            date.setHours(date.getHours() + 1)
            let value2 = redondearA15Minutos(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            //Minimos a seleccionar
            let eventoDiaMin= new Date().toISOString().split('T')[0]
            //Que se vea el menu
            pestañaEvento.style.display = "block"
            pestañaEvento.innerHTML = `
                <div id="evento" class="d-flex flex-column justify-content-center w-100 h-100 p-3 gap-3">
                    <h2> Agende un evento </h2>
                    <div>
                        <input type="text" id="eventoNombre" placeholder="Ingrese un titulo">
                        <div class="error-div text-danger"></div>
                    </div>
                    <div>
                        <input type="date" id="eventoDia" value="${valueEventoDia}" min="${eventoDiaMin}">
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
            agendarEvento()
        })
    })  
}

//Agendar un evento y tambien cancelar el agregar
function agendarEvento(){
    // Variables DOM de la ventana toggle de eventoToggle()
    const eventoNombre = document.querySelector(`#eventoNombre`)
    const eventoDesde = document.querySelector(`#eventoDesde`)
    const eventoHasta = document.querySelector(`#eventoHasta`)
    const eventoDetalle = document.querySelector(`#eventoDetalle`)
    const eventoDia = document.querySelector(`#eventoDia`)
    const cancelarEvento = document.querySelector(`#cancelarEvento`)
    const agregarEvento = document.querySelector(`#agregarEvento`)
    cancelarEvento.addEventListener("click", ()=>{//BOTON PARA CERRAR EL MODAL
        pestañaEvento.style.display = "none"
    })
    agregarEvento.addEventListener("click", ()=>{// BOTON PARA AGREGAR EVENTO
        // Manipulo los datos del html para armar la fecha DESDE (lio por los tipos de datos y conversiones del objeto Date)
        let [horasDesde, minutosDesde] = [eventoDesde.value.split(':')[0], eventoDesde.value.split(':')[1]]
        let [añoDesde, mesDesde, diaDesde] = [eventoDia.value.split('-')[0],eventoDia.value.split('-')[1],eventoDia.value.split('-')[2]]
        let desde= new Date(añoDesde,mesDesde-1,diaDesde,horasDesde,minutosDesde)
    
        // Manipulo los datos del html para armar la fecha HASTA (lio por los tipos de datos y conversiones del objeto Date)
        let [horasHasta, minutosHasta] = [eventoHasta.value.split(':')[0], eventoHasta.value.split(':')[1]]
        let [añoHasta, mesHasta, diaHasta] = [eventoDia.value.split('-')[0],eventoDia.value.split('-')[1],eventoDia.value.split('-')[2]]
        let hasta = new Date(añoHasta, mesHasta-1, diaHasta, horasHasta,minutosHasta,0)

        // Agrego el nuevo evento a la agenda
        let eventoCreado = {
            titulo: eventoNombre.value,
            desde: desde.getTime(),
            hasta:hasta.getTime(),
            informacion: eventoDetalle.value,
            id: parseInt(Math.random()*100000)
        }
        // Validaciones de los datos (*buscar estas funciones en el archivo validaciones.js)
        let validaciones= queNoEsteVacio(eventoNombre)&&queSeaDespues(desde,hasta)&&queSeaDespues(new Date(),desde)
        if(validaciones){
            const agenda__Storage=JSON.parse(sessionStorage.getItem(`agenda de ${usuarioActual.usuario}`))

            if(agenda__Storage!=null){
                //Si estoy volviendo a iniciar sesion vuelvo a traer lo que cargué previamente
                usuarioActual.agenda=agenda__Storage
            }
            // Subo a la BBDD simulada
            usuarioActual.agenda.push(eventoCreado)
            sessionStorage.setItem(`usuarios`, JSON.stringify(users))
            sessionStorage.setItem(`agenda de ${usuarioActual.usuario}`, JSON.stringify(usuarioActual.agenda))
            //Hago que se cierre la ventana
            pestañaEvento.style.display = "none"
            agendaDisplay()//Cada vez que se crea un evento se debe actualizar
        }else{
            // Estas validaciones estan hechas sin efectos secundarios en el dom ya que uso la misma funcion para mas de un caso y resultaria dificil que no se sobreescriban las validaciones
            queSeaDespues(desde,hasta)&&queSeaDespues(new Date(),desde)?eliminarDivError(eventoDesde):noModificarDivError(eventoDesde)
            queSeaDespues(desde,hasta)?noModificarDivError(eventoDesde):crearDivError(eventoDesde, `El evento debe terminar luego de haber empezado`)
            queSeaDespues(new Date(),desde)?noModificarDivError(eventoDesde):crearDivError(eventoDesde, `No se puede empezar un evento previo al momento actual`)
        }
    })
}
// VISTA AGENDA
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
    // Ordeno la agenda para poder visualizar desde lo mas proximo a lo mas lejano
    agenda.sort((a,b)=>a.desde-b.desde)
    // Vacío para eliminar rastros que pueden haber quedado de otros efectos secundarios
    vistaAgenda.innerHTML= ``
    // Y visualizo los distintos eventos que hayan sido agendados
    vistaAgenda.innerHTML += `    <h3 class="m-4 font-italic">Agenda de ${usuarioActual.nombre}</h3>`
    if (agenda!= null){
        for (let evento of agenda){ //Recorro la agenda y voy pintando 
            vistaAgenda.innerHTML += `
            <div id="${evento.id}"class="elementoAgenda d-flex border rounded m-4 agenda-event-hover align-items-baseline justify-content-between" >
                <div class="d-flex gap-4 align-items-baseline"> 
                    <div>${parseDate(evento.desde).toLocaleDateString()}</div>
                    <h4>${evento.titulo}</h4>
                    <div>${hhmm(parseDate(evento.desde))} a ${hhmm(parseDate(evento.hasta))}</div>
                    <p> ${evento.informacion}</p>
                </div>
                <div class="d-flex gap-4 ">
                    <button id=""class="editarEvento bg-transparent border-0"><img width="20px" src="../icons/edit-icon.svg" /></button>
                    
                    <button id="" class="eliminarEvento bg-transparent border-0"><img width="16px" src="../icons/cross-icon.svg" /></button>
                </div>
                
            </div>`
    }}
    
    botonesAgenda()//Le doy funcionalidad a cada boton de cada div

}

function botonesAgenda(){
    const elementosAgenda= document.querySelectorAll(`.elementoAgenda`)
    elementosAgenda.forEach((div)=>{//Por cada div que contenga la info de un evento voy a dar funcionalidad a los botones
        // Editar evento:
        const editarEvento= div.querySelector(`.editarEvento`)
        let evento = usuarioActual.agenda.find((el)=>el.id == parseInt(div.id))
        editarEvento.addEventListener("click", ()=>{
            // Creo un modal
            const modal = crearModal(evento, div)
            // funcionalidad del boton No Modificar
            const noModificarEvento = modal.querySelector(`#noModificarEvento`)
            noModificarEvento.addEventListener("click", ()=>modal.remove())
            // funcionaliad del boton modificar
            const modificarEvento = modal.querySelector(`#modificarEvento`)
            modificarEvento.addEventListener("click",()=>{
                // Variables del DOM del modal
                const eventoNombre = div.querySelector(`#eventoNombre`)
                const eventoDesde = div.querySelector(`#eventoDesde`)
                const eventoHasta = div.querySelector(`#eventoHasta`)
                const eventoDetalle = div.querySelector(`#eventoDetalle`)
                const eventoDia = div.querySelector(`#eventoDia`)
                // Manipulo los datos del html para armar la fecha DESDE
                let [horasDesde, minutosDesde] = [eventoDesde.value.split(':')[0], eventoDesde.value.split(':')[1]]
                let [añoDesde, mesDesde, diaDesde] = [eventoDia.value.split('-')[0],eventoDia.value.split('-')[1],eventoDia.value.split('-')[2]]
                let desde= new Date(añoDesde,mesDesde-1,diaDesde,horasDesde,minutosDesde)
            
                // Manipulo los datos del html para armar la fecha HASTA
                let [horasHasta, minutosHasta] = [eventoHasta.value.split(':')[0], eventoHasta.value.split(':')[1]]
                let [añoHasta, mesHasta, diaHasta] = [eventoDia.value.split('-')[0],eventoDia.value.split('-')[1],eventoDia.value.split('-')[2]]
                let hasta = new Date(añoHasta, mesHasta-1, diaHasta, horasHasta,minutosHasta,0)
                // Creo el nuevo evento
                let eventoModificado={
                    titulo:eventoNombre.value||"",
                    desde:desde.getTime(),
                    hasta:hasta.getTime(),
                    informacion:eventoDetalle.value||"",
                    id:evento.id                    
                }
                // Modifico el evento
                let eventoActual = usuarioActual.agenda.indexOf(evento)
                //Validaciones
                let validaciones= queNoEsteVacio(eventoNombre)&&queSeaDespues(desde,hasta)&&queSeaDespues(new Date(),desde)
                if(validaciones){
                
                usuarioActual.agenda.splice(eventoActual,1)
                usuarioActual.agenda.push(eventoModificado)
                sessionStorage.setItem(`usuarios`, JSON.stringify(users))
                sessionStorage.setItem(`agenda de ${usuarioActual.usuario}`, JSON.stringify(usuarioActual.agenda))
                // Lanzo alerta de exito
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Evento modificado con exito',
                    showConfirmButton: true,
                    confirmButtonColor: "#000000c1",
                    
                })   
                
                //Hago que se cierre la ventana
                agendaDisplay()//// Actualizo la vista
                }else{
                    // Estas validaciones estan hechas sin efectos secundarios en el dom ya que se usa la misma funcion para mas de un caso. Y resulta conflictivo
                    queSeaDespues(desde,hasta)&&queSeaDespues(new Date(),desde)?eliminarDivError(eventoDesde):noModificarDivError(eventoDesde)
                    queSeaDespues(desde,hasta)?noModificarDivError(eventoDesde):crearDivError(eventoDesde, `El evento debe terminar luego de haber empezado`)
                    queSeaDespues(new Date(),desde)?noModificarDivError(eventoDesde):crearDivError(eventoDesde, `No se puede empezar un evento previo al momento actual`)
                }
            })
        })
        
        // eliminar evento
        const eliminarEvento =div.querySelector(`.eliminarEvento`)
        eliminarEvento.addEventListener("click", ()=>{
            let eventoActual = usuarioActual.agenda.indexOf(evento)
            // Elimino
            usuarioActual.agenda.splice(eventoActual,1)
            // Subo los cambios a la BBDD simulada
            sessionStorage.setItem(`usuarios`, JSON.stringify(users))
            sessionStorage.setItem(`agenda de ${usuarioActual.usuario}`, JSON.stringify(usuarioActual.agenda))
            //Actualizo
            agendaDisplay()
        })        
    })
}

function crearModal(evento, div){//Creo el modal para modificar el evento deseado
    let modal = document.createElement("div")
    // let eventoDia = new Date(parseInt(evento.desde)).toISOString().split('T')[0]
    let eventoDia = yyyyMMdd(new Date(parseInt(evento.desde)))
    modal.innerHTML = `
                        <div id="evento" class="d-flex flex-column justify-content-center w-100 h-100 p-3 gap-3">
                        <h4> Editar evento </h4>
                        <div>
                            <input type="text" id="eventoNombre" value="${evento.titulo}">
                            <div class="error-div text-danger"></div>
                        </div>
                        <div>
                            <input type="date" id="eventoDia" value="${eventoDia}" >
                            <div class="error-div text-danger"></div>
                        </div>                    
                        <div class="d-flex">
                            <input type="time" id="eventoDesde" value="${hhmm(parseDate(evento.desde))}" >
                            <input type="time" id="eventoHasta" value="${hhmm(parseDate(evento.hasta))}">
                            <div class=" mx-5 error-div text-danger"></div>
                        </div>
                        <input id="eventoDetalle" type="text" value="${evento.informacion}">
                        <div class="d-flex gap-1">
                            <button id="modificarEvento" class="boton rounded">Modificar</button>
                            <button id="noModificarEvento" class="btn-dark rounded">Cancelar</button>
                        </div>
                    </div>
                        `
    div.appendChild(modal)
    return modal

}


// Inicializacion de funciones
inicio()
eventoToggle()

// A futuro:
// Si entras directo a la url de la agenda sin estar logueado, no deberia dejarte, podes hacer una redireccion. NO SE COMO HACER ESTO
// Eliminar usuarios
// Crear eventos que duren mas de un dia. Desde y hasta tambien con la fecha y no solo horas.
// Interconexion entre usuarios. Distintas funcionalidades: agregar amigo (buscador de usuarios). Crear evento con mi amigo, etc. NO SE HACER ESTO. DEBERIA INVESTIGAR COMO CREAR UNA BBDD CON LOS DATOS QUE TENGO
