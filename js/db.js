//Base de datos
class User {
    constructor(nombre, email, usuario, contraseña) {
        this.nombre = nombre
        this.email = email
        this.usuario = usuario
        this.contraseña = contraseña
        this.agenda =[]
    }
}
let users = []

//Aca van a estar guardados todos los datos de los usuarios. Acá se aloja la db simulada.
const users__storage = JSON.parse(sessionStorage.getItem("usuarios"))

