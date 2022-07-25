// Ejercicio complementario N1 - Crear un algoritmo utilizando un ciclo

let minScore = 0
let maxScore = 0
let i = 1
let amountOfGames = parseInt(prompt("Ingrese cuantos partidos de basket ha jugado esta temporada:"))
let scores = parseInt(prompt("Ingrese el puntaje del partido numero " + (i)))
minScore = scores
maxScore = scores
i+=1
console.log("El record a batir es de " + scores)
while((scores!=NaN) && (i<=amountOfGames) && (amountOfGames!=NaN)){
    
    scores = parseInt(prompt("Ingrese el puntaje del partido numero " + (i)))
    if (scores<minScore){
        minScore=scores
        i+=1
        console.log(minScore + " puntos en un partido fue el peor resultado de la temporada. A entrenar. Su record sigue siendo " + maxScore)
    }else if(scores>maxScore){
        maxScore=scores
        i+=1
        console.log("Ha batido su record de mayor cantidad de puntos en un partido habiendo anotando " + maxScore + " puntos")
    }else if(scores<=maxScore && scores>=minScore){
        i+=1
        console.log("Ningun record se ha batido")
    }else{
        alert("Ingrese un valor numerico")
        break
    }
}
console.log("El record de mayor puntaje por partido fue de", maxScore + ".", "El menor puntaje que ha hecho en un partido fue de", minScore + ".")
