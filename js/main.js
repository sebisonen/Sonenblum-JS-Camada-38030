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
        array.splice(indice,1)
        alert(`Se ha borrado el usuario ${buscar.usuario}`)
        console.clear()
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
cargarUsuarios()
eliminarUsuario(users)
cargarHorarios()