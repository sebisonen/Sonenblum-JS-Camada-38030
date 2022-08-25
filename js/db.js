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
const users__storage = JSON.parse(sessionStorage.getItem("usuarios"))