// Simulador - Agenda grupal para coordinacion de citas
class User {
    constructor(usuario, contraseña) {
        this.usuario = usuario
        this.contraseña = contraseña
        this.agenda ={}
    }
}

let users = {}

// Genero la base de datos simulada
function cargarUsuarios(){
    let seguirCargando= true
    let i = 0
    while (seguirCargando) {
        let nombreCompleto = validarDato(`Ingrese el nombre y el apellido del usuario N°${i+1}`)
        let usuario = validarDato(`Escriba el usuario con el que ${nombreCompleto} quiere registrarse`)
        alert("Su contraseña por este momento es 123456789 para evitarle llenar campos innecesarios")
        let contraseña = 123456789
        users[`${nombreCompleto}`] = new User (usuario, contraseña)
        seguirCargando = confirm("¿Desea cargar otro usuario más para cruzar agendas?")
        i++
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
cargarUsuarios()

// Cargar para cada usuario los horarios que tiene libre
function cargarHorarios (){
    for (let user in users){
        let i = 0
        console.log(`Agenda de ${user}\nUsuario:`,users[`${user}`].usuario,`Contraseña:`,users[`${user}`].contraseña)        
        let seguirCargando = true     
        while(seguirCargando){
            let desde = validarDato(`Desde qué horario esta disponible ${user}?`)
            let hasta = validarDato(`Hasta qué horario esta disponible ${user}?`)
            users[`${user}`].agenda[`desde${i}`] = desde;
            users[`${user}`].agenda[`hasta${i}`] = hasta;
            console.log(`Estoy disponible de las`, users[`${user}`].agenda[`desde${i}`]+`hs`, `a`, users[`${user}`].agenda[`hasta${i}`]+`hs`)
            i++
            seguirCargando = confirm(`¿Desea seguir agregando horarios del usuario ${user}?`)
        }
    }
}
cargarHorarios()
alert("Por consola se mostrará la disponibilidad de los usuarios ingresados:")
console.log("DISPONIBILIDAD GRUPAL")

// AGENDA GRUPAL PARA DESPUES CRUZAR LA INFORMACION
function mostrarDisponibilidad(){
    for (const user in users){
        let disponibilidad = users[`${user}`].agenda
        let amountOfKeys = Object.keys(disponibilidad).length
        for (let i = 0; i < amountOfKeys/2; i++) {
            console.log(`${user} puede desde las`, disponibilidad[`desde${i}`]+`hs`, `hasta las`, disponibilidad[`hasta${i}`]+`hs`)  
        }
    }
}
mostrarDisponibilidad()