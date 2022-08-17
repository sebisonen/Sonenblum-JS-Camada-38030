// -----------------DOM Y EVENTS----------------

// Elementos HTML

const mesDiv = document.querySelector(`#mes-titulo`)
const añoDiv = document.querySelector(`#año-titulo`)
const botonSiguiente = document.querySelector(`#botonSiguiente`)
const botonAtras = document.querySelector(`#botonAtras`)
const botonHoy = document.querySelector(`#botonHoy`)
const fechasCalendario = document.querySelector(`#fechasCalendario`)
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
function calendario(copiaHoy){
    mesDiv.innerText = `${monthName(copiaHoy).toUpperCase()}`
    añoDiv.innerText = `${copiaHoy.getFullYear()}`
    fechasCalendario.innerHTML=``
    crearCuadricula(copiaHoy)
    pintarHoy(hoy)
}

function inicio(){
    let copiaHoy = new Date(hoy.valueOf())
    let mesActual = copiaHoy.getMonth()
    calendario(copiaHoy)
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

// Crear el calendario especifico para cada mes y año
function crearCuadricula(fecha){
    fecha.setDate(1) //Importante: Si la fecha fuese 31 de enero, cuando quiera crear un calendario para el mes siguiente no voy a poder porque no hay 31 de feb, con esto elimino el dia actual como referencia.
    const copiaFecha = new Date(fecha.valueOf())// Creo una segunda variable con el dia de hoy igual a la primera para poder trabajar sin que me pise los valores de la original
    let cuadradosPrevios = primerDia(fecha)
    let cuadradosPosteriores = 6 - ultimoDia(fecha)
    for(let i = 0, j = 1; i<daysInMonth(fecha)+cuadradosPrevios+cuadradosPosteriores; i++, j++){
        if(cuadradosPrevios==0){// Para los casos que no haya que crear cuadrados antes
            if(j>daysInMonth(fecha)){//Pero sí hay que crear despues
                copiaFecha.setDate(1)
                j=1
                copiaFecha.setMonth(fecha.getMonth()+1)
                pintarHoy(copiaFecha)
            }
            copiaFecha.setDate(j)
        }
        else{// Para los casos que hay que crear cuadros antes   
            copiaFecha.setDate(1)
            copiaFecha.setMonth(fecha.getMonth()-1)
            copiaFecha.setDate(parseInt(daysInMonth(copiaFecha))-cuadradosPrevios+j) //Esto asigna la fecha que se pinta primero en el calendario(de las que pertenecen al mes anterior y van en la misma fila en el calendario).
            if(i-cuadradosPrevios==primerDia(copiaFecha)){//Cuando terminé de crear los dias previos al primer dia
                copiaFecha.setDate(j-cuadradosPrevios)
                copiaFecha.setMonth(+1)
            }
        }
        let div = document.createElement("div");
		div.innerHTML = `<div id="${copiaFecha.valueOf()}" class="diaCalendario border vw-10">${copiaFecha.getDate()}</div>`
		fechasCalendario.appendChild(div);
    }
}
// Pintar el dia actual
function pintarHoy(fecha){
    const diasCalendario = document.querySelectorAll(`.diaCalendario`)
    diasCalendario.forEach((div)=>{
        if(fecha.valueOf()==div.id){
            div.classList.add("diaActual"); 
}})}

// Crear un evento

// Inicializacion de funciones
inicio()




// ----------------------------ENTREGAS PASADAS------------------------
// Simulador - Agenda grupal para coordinacion de citas
// FUNCIONES Y VARIABLES
class User {
    constructor(usuario, contraseña, nombreCompleto) {
        this.nombreCompleto = nombreCompleto
        this.usuario = usuario
        this.contraseña = contraseña
        this.agenda ={}
    }
}

let users = []

// Genero la base de datos simulada

function cargarUsuarios(){
    let seguirCargando= true
    let i = 1
    while (seguirCargando) {
        let nombreCompleto = validarDato(`Ingrese el nombre y el apellido del usuario N°${i}`)
        let usuario = validarDato(`Escriba el usuario con el que ${nombreCompleto} quiere registrarse`)
        alert("Su contraseña por este momento es 123456789 para evitarle llenar campos innecesarios")
        let contraseña = 123456789
        let nuevoUsuario = new User (usuario, contraseña, nombreCompleto)
        users.push(nuevoUsuario)
        console.log(`La cuenta de ${usuario} ha sido creada con éxito` )
        seguirCargando = confirm("¿Desea cargar otro usuario más para cruzar agendas?")
        i++
        
    }
    console.clear()
    
}
// Funcion de uso futuro y util para ir debuggeando
function visualizarUsuarios(array){
    array.forEach((el =>{
        console.log(el.usuario)
    }))
}

// Doy la opcion de eliminar algun usuario
function eliminarUsuario(array){
    let eliminar = confirm("Desea eliminar algun usuario?")
    while(eliminar){
        console.log(`Estos son los usuarios que ha cargado:`)
        visualizarUsuarios(users)
        let input = prompt("Escriba el nombre del usuario que quiere borrar")
        let buscar = array.find((el) => el.usuario === input)
        let indice = array.indexOf(buscar)
        while (buscar==undefined){
            alert(`No se ha encontrado el usuario ${input}`)
            input = prompt("Escriba el nombre del usuario que quiere borrar")
            buscar = array.find((el) => el.usuario === input)
            indice = array.indexOf(buscar)
        }
        array.splice(indice,1)
        alert(`Se ha borrado el usuario ${buscar.usuario}`)
        console.clear()
        if (users.length==0){
            alert(`Ya no quedan usuarios cargados. Se le redirigirá al inicio`)
            cargarUsuarios()
        }
        eliminar = confirm("¿Desea eliminar otro mas?")
    }
    
}

// Chequea que se haya escrito algo en todos los campos

function validarDato(mensaje){
    let dato = prompt(mensaje)
    while(dato==null || dato==""){
        alert(`El valor ingresado no es válido.`)
        dato = prompt(mensaje)
    }
    return dato
}


// Cargar para cada usuario los horarios que tiene libre

function cargarHorarios (){
    for (const user of users){
        console.log(`Agenda de ${user.nombreCompleto}\nUsuario:`,user.usuario,`Contraseña:`,user.contraseña)        
        let cargarDia = true
        let cargarHorario = true
        // Cargo dias de la semana
        while(cargarDia){
            let dia = validarDato("Para que día de la semana quiere cargar horarios?")
            user.agenda[`${dia}`] = []

            while(cargarHorario){
                let desde = validarDato(`Desde qué horario esta disponible ${user.nombreCompleto}?`)
                let hasta = validarDato(`Hasta qué horario esta disponible ${user.nombreCompleto}?`)
                let disponibilidad = [desde,hasta]
                user.agenda[`${dia}`].push(disponibilidad)
                console.log(`Estoy disponible el dia ${dia} desde las ${disponibilidad[0]}hs hasta las ${disponibilidad[1]}hs`)
                cargarHorario = confirm(`¿Desea seguir cargando horarios para el dia ${dia}`)
            }
            cargarDia = confirm(`¿Desea seguir agregando horarios del usuario ${user.nombreCompleto}?`)
            cargarHorario=true
        }
    }
}



// Ejecucion
// cargarUsuarios()
// eliminarUsuario(users)
// cargarHorarios()