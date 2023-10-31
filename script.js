//Navbar-Buttons
let navBarStartBtn = document.getElementById("navBarStartBtn")
let navBarAboutBtn = document.getElementById("navBarAboutBtn")
let navBarKrisenBtn = document.getElementById("navBarKrisenBtn")
let navBarSpendenBtn = document.getElementById("navBarSpendenBtn")

//Cards
let cardWillkommen = document.getElementById("cardWillkommen")
let cardFormular = document.getElementById("cardFormular")
let cardError = document.getElementById("cardError")

//Card-Buttons
let btnUebergabe = document.getElementById("btnUebergabe")
let btnAbholung = document.getElementById("btnAbholung")

//Inputfelder
let inputVorname = document.getElementById("inputVorname")
let inputNachname = document.getElementById("inputNachname")
let inputStraße = document.getElementById("inputStraße")
let inputPLZ = document.getElementById("inputPLZ")
let inputOrt = document.getElementById("inputOrt")
let selectKleidung= document.getElementById("selectKleidung")
let selectKrisengebiet= document.getElementById("selectKrisengebiet")
let addBtn = document.getElementById("addBtn")
let submitBtn = document.getElementById("submitBtn")

//Kleidungsliste
let listeKleider = document.getElementById("listeKleider")

//Variablen
let artDerUebergabe = "Übergabe"
let listeKleidungsstücke = []

navBarStartBtn.onclick = function () {
    //console.log("Start-Button geklickt")  //Test

    cardWillkommen.style.display = "block"
    cardFormular.style.display = "none"
    cardError.style.display = "none"

}

navBarAboutBtn.onclick = function () {
    //console.log("Über Uns Button geklickt")  //Test

    cardWillkommen.style.display = "none"
    cardFormular.style.display = "none"
    cardError.style.display = "block"
}

navBarKrisenBtn.onclick = function () {
    //console.log("Krisen-Button geklickt")  //Test

    cardWillkommen.style.display = "none"
    cardFormular.style.display = "none"
    cardError.style.display = "block"
}

navBarSpendenBtn.onclick = function () {
    //console.log("Spenden-Button geklickt")  //Test

    cardWillkommen.style.display = "none"
    cardFormular.style.display = "block"
    cardError.style.display = "none"
}

btnUebergabe.onclick = function () {
    //console.log("Übergabe!")

    artDerUebergabe = "Übergabe"
    btnUebergabe.classList.add("active")
    btnAbholung.classList.remove("active")

    inputVorname.style.display = "none";
    inputNachname.style.display = "none";
    inputStraße.style.display = "none";
    inputPLZ.style.display = "none";
    inputOrt.style.display = "none";
}

btnAbholung.onclick = function () {
    //console.log("Abholung!")

    artDerUebergabe = "Abholung"
    btnAbholung.classList.add("active")
    btnUebergabe.classList.remove("active")
    inputVorname.style.display = "block";
    inputNachname.style.display = "block";
    inputStraße.style.display = "block";
    inputPLZ.style.display = "block";
    inputOrt.style.display = "block";
}

addBtn.onclick = function () {
    if(selectKleidung.value != "") {
        listeKleidungsstücke.push(selectKleidung.value) 
        listeKleider.innerHTML += "<li  class='list-group-item'>"+selectKleidung.value+"</li>"
    }
    //console.log(selectKleidung.value)
    //console.log(listeKleidungsstücke)
}

submitBtn.onclick = function () {
    //console.log("SUBMIT")

    if(artDerUebergabe === "Übergabe") {
        console.log("Übergabe")


    } else if (artDerUebergabe === "Abholung") {
        console.log("Abholung")
    } else {
        console.log("Fehler")
    }


}