//Referencing NavBar-Buttons as constants to use
const navBarStartBtn = document.getElementById("navBarStartBtn")
const navBarAboutUsBtn = document.getElementById("navBarAboutUsBtn")
const navBarCrisesBtn = document.getElementById("navBarCrisesBtn")
const navBarDonationBtn = document.getElementById("navBarDonationBtn")

//Referencing cards to be able to show or hide them, when necessary
const cardStart = document.getElementById("cardStart")
const cardRegistrationForm = document.getElementById("cardRegistrationForm")
const cardError = document.getElementById("cardError")
const cardSuccess = document.getElementById("cardSuccess")
const cardLoremIpsum = document.getElementById("cardLoremIpsum")

//Referencing forms, buttons and the list of clothes inside the registrationform 
const btnHandover = document.getElementById("btnHandover")
const btnPickup = document.getElementById("btnPickup")
const inputFirstName = document.getElementById("inputFirstName")
const inputLastName = document.getElementById("inputLastName")
const inputStreet = document.getElementById("inputStreet")
const inputZIPCode = document.getElementById("inputZIPCode")
const inputCity = document.getElementById("inputCity")
const selectClothes = document.getElementById("selectClothes")
const selectConflictArea= document.getElementById("selectConflictArea")
const addBtn = document.getElementById("addBtn")
const submitBtn = document.getElementById("submitBtn")
const btnNewDonation = document.getElementById("btnNewDonation")
const tableOfClothes = document.getElementById("tableOfClothes")

//Introducing variables used for functionality
let kindOfTransaction = "Übergabe"
let listOfClothes = []


//function, that starts the webapplication with the start-page. It also clears the sessionStorage, so there won't be any data left from previous uses.
window.onload = function() {
    showStart();
    sessionStorage.clear()
}

/*
Following up, there will be a few functions to implement the functionality of the navigationbar. 
Different buttons will load and hide different cards
*/

navBarStartBtn.onclick = function () {
    showStart();
}
        
navBarAboutUsBtn.onclick = function () {
    showError();
}

navBarCrisesBtn.onclick = function () {
    showError();
}

navBarDonationBtn.onclick = function () {
    showRegistrationForm();
}

/*
This onclick-eventhandler hides unneccessary forms inside the registrationcard, if the option "handover" is chosen.
It also saves the kind of transaction for later use in the variable "kindOfTransaction"
*/

btnHandover.onclick = function () {
    kindOfTransaction = "Übergabe"
    btnHandover.classList.add("active")
    btnPickup.classList.remove("active")

    inputFirstName.style.display = "none";
    inputLastName.style.display = "none";
    inputStreet.style.display = "none";
    inputZIPCode.style.display = "none";
    inputCity.style.display = "none";
}

/*
Same with this eventhandler, but for the option "pickup"
*/

btnPickup.onclick = function () {
    kindOfTransaction = "Abholung"
    btnPickup.classList.add("active")
    btnHandover.classList.remove("active")
    inputFirstName.style.display = "block";
    inputLastName.style.display = "block";
    inputStreet.style.display = "block";
    inputZIPCode.style.display = "block";
    inputCity.style.display = "block";
}


/*
onclick-eventhandler to add a piece of clothes to the list of clothes.
At first it checks, that the input isn't empty. If it is empty, the border of the inputform will be red.
Then it introduces the variable "alreadyChosen" as false and iterates over the list of clothes to assure, that this peace of clothes hasnt't been picked already.
This way, clothes cannot be chosen more than once.
If it hasn't been picked, the function pushes the clothing to the array "listOfClothes" and also adds a listelement to the list in the registrationcard.
*/
addBtn.onclick = function () {
    if(selectClothes.value != "") {

        let alreadyChosen = false

        for(i=0; i<listOfClothes.length; i++) {
            if (listOfClothes[i] === selectClothes.value) {
                //console.log("Kleidungsstück wurde schon gewählt")
                alreadyChosen = true;
            }
        }

        if (alreadyChosen === false) {
            listOfClothes.push(selectClothes.value) 
            tableOfClothes.innerHTML += "<li  class='list-group-item'>"+selectClothes.value+"</li>"
            selectClothes.style["border-color"] = "lightgrey"
        }

        
    } else {
        selectClothes.style["border-color"] = "red"
    }

}


/*
The submitbutton is the button under the list of clothes in the registration card.
This eventhandler takes care of the validation of the inputfields according to the kind of transaction chosen.
If "Handover" is chosen, it calls the functions "checkIfArrayIsEmpty" and "checkIfInputIsEmpty" which will return true, if inputs were made.
Then it will build the successcard.
If "Pickup" is chosen, the eventhandler will call the function "checkInputs".
Also both variations save the clothes and the conflictarea into the sessionstorage.
There should be now failure until now, but if in some case the kind of transaction isn't one of these two options, there will be an alert to restart the page.
*/ 
submitBtn.onclick = function () {
    
    if(kindOfTransaction === "Übergabe") {
        if (checkIfArrayIsEmpty(listOfClothes) && checkIfInputIsFilled (selectConflictArea)) {
            
            inputZIPCode.value = "93049"
            buildSuccessCard();
            writeSessionStorage("clothes", listOfClothes)
            writeSessionStorage("conflictArea", selectConflictArea.value)
        } else { 
            //Errorhandling not necessary, because the functions in the if-clause already light up the borders of missing inputs, if the function returns false
        }
    } else if (kindOfTransaction === "Abholung") {
        checkInputs();
        writeSessionStorage("clothes", listOfClothes)
        writeSessionStorage("conflictArea", selectConflictArea.value)
    } else {
        alert("Es ist ein Fehler aufgetreten. Bitte lade die Seite erneut!")
    }

}


//This eventhandler reloads the registrationform and clears the sessionStorage
btnNewDonation.onclick = function () {
    inputFirstName.value = ""
    inputLastName.value = ""
    inputStreet.value = ""
    inputZIPCode.value = ""
    inputCity.value = ""
    selectClothes.value = ""
    selectConflictArea.value = ""
    listOfClothes = []
    
    tableOfClothes.innerHTML = ""

    sessionStorage.clear()
    showRegistrationForm();
}


//This function shows the startcard and hides the others
function showStart () {
    cardStart.style.display = "block"
    cardRegistrationForm.style.display = "none"
    cardError.style.display = "none"
    cardSuccess.style.display = "none"
    cardLoremIpsum.style.display = "none"

}

//This function shows the errorcard and hides the others
function showError() {
    cardStart.style.display = "none"
    cardRegistrationForm.style.display = "none"
    cardError.style.display = "block"
    cardSuccess.style.display = "none"
    cardLoremIpsum.style.display = "none"

}

//This function shows the successcard and hides the others
function showSuccess() {
    cardSuccess.style.display = "block"
    cardRegistrationForm.style.display = "none"
    cardLoremIpsum.style.display = "none"

}

//This function shows the registrationform and hides the other cards
function showRegistrationForm() {
    cardStart.style.display = "none"
    cardRegistrationForm.style.display = "block"
    cardError.style.display = "none"
    cardSuccess.style.display = "none"
    cardLoremIpsum.style.display = "none"
}


/*
This function gets called earlier in the script to make sure, that inputs are filled properly.
It introduces an array of the inputs and iterates over them, calling another function called "checkIfInputIsFilled" which will return "true" if the input isn't empty. 
In that case it increments the counter by 1.
Then it makes sure, that the zipcode-input contains exactly 5 digits.
If everything is fine, the counter will be "6".
If thats the case and the list of clothes isn't empty, "checkInputs" will call the function to check the zipcode to compare the first two digits.
*/
function checkInputs () {
    const inputs = [inputFirstName, inputLastName, inputStreet, inputZIPCode, inputCity, selectConflictArea]
    let counter = 0

    for (i = 0; i < inputs.length; i++) {
        if(checkIfInputIsFilled(inputs[i])) {
            counter += 1;
        }
    } 

    if (inputZIPCode.value.length != 5) {
        inputZIPCode.style["border-color"] = "red"
        counter = 0
        
    } else {
        inputZIPCode.style["border-color"] = "lightgrey"
    }


    if(counter === 6 && checkIfArrayIsEmpty(listOfClothes)) {
        //console.log("Success, Abholung erfolgreich gebucht!")
        checkZIPCode();
    } else {
        //console.log("Fehler") //TODO Errorhandling
    }
}

/*
This compares the first two digits of the zipcode to the String "93". 
In case the comparison returns true, it will build the successcard and write every detail of the address into the sessionstorage for later use in a database.
If the address is too far away from the given zipcode, the page will alert, that the distance is to far.
*/
function checkZIPCode() {
    const digits = inputZIPCode.value.toString().slice(0,2)
    if (digits === "93") {
        buildSuccessCard();
        writeSessionStorage("firstName", inputFirstName.value)
        writeSessionStorage("lastName", inputLastName.value)
        writeSessionStorage("street", inputStreet.value)
        writeSessionStorage("zip", inputZIPCode.value)
        writeSessionStorage("city", inputCity.value)
    } else {
        alert("Es tut uns leid! Leider ist Deine Abholungsadresse zu weit weg von unserer Regensburger Filiale!")
        
    }
}


/*
This function gets an array and makes sure, its not empty. In this case, its the array that contains the list of clothes.
If there is at least one item in the list, the inputform for the clothing will be bordered grey and the function returns "true".
If the array is empty, the input will be bordered red and the function returns false.
*/
function checkIfArrayIsEmpty (arr) {
    
    if (arr.length > 0) {
        selectClothes.style["border-color"] = "lightgrey"
        return true;
    } else { 
        selectClothes.style["border-color"] = "red"
        return false; }
}

/*
This function is called ealier with an array of inputs.
It will assure, that the given inputs aren't empty. It'll return "false" in that case and make the given input bordered red.
If everything is fine, it'll return "true" and changes the bordercolor to grey.
*/
function checkIfInputIsFilled (input) {
    if (input.value != "") {
        input.style["border-color"] = "lightgrey";
        return true; 
    } else { 
        input.style["border-color"] = "red";
        return false; 
    }
}


/**
This function will build the successcard if every check wen't fine until now.
At first it introduces the constant "date" for a timestamp.
Then it will build the timeStampDate and the timeStampTime.
Both timestamps will be stored in the sessionStorage.

Then it will build the body of the successcard, using the timestamp and the listOfClothes to return the data to the customer.
Finally it will call the function "showSuccess" to show the card and hide the others.
*/
function buildSuccessCard () {

    //Building the timestamp
    const date = new Date();
    const timeStampDate = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    writeSessionStorage("date", timeStampDate)

    const timeStampTime = () => {
        let hours 
        let minutes
        if(date.getHours() < 10) { //add a zero, if it only has one digit
            hours = "0" + date.getHours()
        } else { hours = date.getHours()}

        
        if(date.getMinutes() < 10) { //add a zero, if it only has one digit
            minutes = "0" + date.getMinutes()
        } else { minutes = date.getMinutes()}
    

        return hours + ":" + minutes
    
    }

    writeSessionStorage("time", timeStampTime())

    
    //Building the card
    const successCardBody = document.getElementById("successCardBody")

    let k = ""
    
    k += "<p class='card-text'>Kleidung: " + listOfClothes.join(", ")

    k += "</p> <p class='card-text'>Krisengebiet: "  

    k += selectConflictArea.value 

    k += "</p> <p class='card-text'>Datum: " + timeStampDate
    
    k += "</p> <p class='card-text'>Uhrzeit: " + timeStampTime()

    k += "</p> <p class='card-text'>Ort: " + inputZIPCode.value + "</p>"
    
    successCardBody.innerHTML = k
    showSuccess();
}


//This function gets called directly inside the HTML to show a Lorem Ipsum Page in case one of the links in the footer gets called.
function showLoremIpsum() {
    cardStart.style.display = "none"
    cardError.style.display = "none"
    cardSuccess.style.display = "none"
    cardRegistrationForm.style.display = "none"
    cardLoremIpsum.style.display = "block"
}

/*
This function gets called multiple times in the script with two parameters.
One is the key and one the value. Both get stored in the sessionstorage of the browser as an example of how to store the data.
In reality, we would for example build an object with all the important information and send it to the backend to store it in a database, where we could read it to send the pickupcars to the adresses.
*/
function writeSessionStorage(key, value) {
    sessionStorage.setItem(key, value)

}


