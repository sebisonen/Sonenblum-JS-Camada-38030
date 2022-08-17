//Base de datos
class User {
    constructor(usuario, contraseña, nombreCompleto) {
        this.nombreCompleto = nombreCompleto
        this.usuario = usuario
        this.contraseña = contraseña
        this.agenda =[]
    }
}
let users = []
users.push(new User("Sebastian Sonenblum", "sebisonen", "12345"))

// Elementos HTML
const mesDiv = document.querySelector(`#mes-titulo`)
const añoDiv = document.querySelector(`#año-titulo`)
const botonSiguiente = document.querySelector(`#botonSiguiente`)
const botonAtras = document.querySelector(`#botonAtras`)
const botonHoy = document.querySelector(`#botonHoy`)
const fechasCalendario = document.querySelector(`#fechasCalendario`)
const pestañaEvento = document.querySelector(`#pestañaEvento`)

// Snippets
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
    fecha.setDate(1) //Importante: Si la fecha fuese 31 de enero, cuando quiera crear un calendario para el mes siguiente no voy a poder porque no hay 31 de feb, con esto elimino el dia actual como referencia.
    const copiaFecha = new Date(fecha.valueOf())// Creo una segunda variable con el dia de hoy que sea igual a la primera: para poder trabajar sin que me pise los valores de la original
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
        }
        else{// Para los casos que hay que crear cuadros antes   
            copiaFecha.setDate(1)
            copiaFecha.setMonth(fecha.getMonth()-1)
            copiaFecha.setDate(parseInt(daysInMonth(copiaFecha))-cuadradosPrevios+j) //Esto me dice cual es el valor del primer cuadrado a pintar.
            if(i-cuadradosPrevios==primerDia(copiaFecha)){//Cuando terminé de crear los dias previos al primer dia:
                copiaFecha.setDate(j-cuadradosPrevios)//Reinicio el valor del dia que voy a crear
                copiaFecha.setMonth(+1)
            }
        }
        //Creo los div
        let div = document.createElement("div");
		div.innerHTML = `<div id="${copiaFecha.valueOf()}" class="diaCalendario border vw-10">${copiaFecha.getDate()}</div>`
		fechasCalendario.appendChild(div);
    }
    eventoToggle()//Abrir ventana de agendar un evento. NOTA: Si o si se inicializa aca. Sino queda por fuera de los eventos
    
}

// Cuando clickeo un div que se visualice el menu para agendar un evento
function eventoToggle(){ //Se activa cuando clickeo una fecha especifica
    const diasCalendario = document.querySelectorAll(`.diaCalendario`)
    diasCalendario.forEach((div) =>{
        div.addEventListener("click", (e)=>{//Por cada dia del calendario creo la posibilidad de agendar un nuevo evento en aquel que clickee
            // Formateos de fecha para poder poner placeholders en forma de values
            let date = new Date(parseInt(div.id));
            let valueEventoDia = new Date(parseInt(div.id)).toISOString().split('T')[0]
            let value= date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            date.setHours(date.getHours() + 1)
            let value2 = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

            pestañaEvento.style.display = "block"//Que se vea el menu
            pestañaEvento.innerHTML = `
                <div id="evento" class="d-flex flex-column justify-content-center w-100 h-100 p-3 gap-3">
                    <h2> Agende un evento </h2>
                    <input type="text" id="eventoNombre" placeholder="Ingrese un titulo">
                    <input type="date" id="eventoDia" value="${valueEventoDia}">
                    <div class="d-flex">
                        <input type="time" id="eventoDesde" value="${value}">
                        <input type="time" id="eventoHasta" value="${value2}">
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
            // Manipulo los datos del html para armar la fecha desde (lio por los tipos de datos y conversiones del objeto Date)
            let desde=  new Date(parseInt(e.target.id))
            let horasDesde= parseInt(eventoDesde.value.substring(0,2))
            let minutosDesde= parseInt(eventoDesde.value.substring(3))
            desde.setHours(horasDesde,minutosDesde,0)
            // Manipulo los datos del html para armar la fecha hasta (lio por los tipos de datos y conversiones del objeto Date)
            let hasta = new Date(parseInt(e.target.id))
            let horasHasta= parseInt(eventoHasta.value.substring(0,2))
            let minutosHasta= parseInt(eventoHasta.value.substring(3))
            hasta.setHours(horasHasta,minutosHasta,0)
            
            console.log(desde,hasta)
            // Agrego el nuevo evento a la agenda
            let eventoCreado = {
                tíulo: eventoNombre.value,
                desde: desde,
                hasta:hasta,
                informacion: eventoDetalle.value,
            }
            users[0].agenda.push(eventoCreado)
            console.log(users[0].agenda)
            pestañaEvento.style.display = "none" //Hago que se cierre la ventana
})}

// Inicializacion de funciones
inicio()
eventoToggle()