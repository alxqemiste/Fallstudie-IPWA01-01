        //Navbar-ButtonsnavBarAboutUsBtn
        const navBarStartBtn = document.getElementById("navBarStartBtn")
        const navBarAboutUsBtn = document.getElementById("navBarAboutUsBtn")
        const navBarCrisesBtn = document.getElementById("navBarCrisesBtn")
        const navBarDonationBtn = document.getElementById("navBarDonationBtn")
        
        //Cards
        const cardStart = document.getElementById("cardStart")
        const cardRegistrationForm = document.getElementById("cardRegistrationForm")
        const cardError = document.getElementById("cardError")
        const cardSuccess = document.getElementById("cardSuccess")
        
        //Card-Buttons
        const btnHandover = document.getElementById("btnHandover")
        const btnPickup = document.getElementById("btnPickup")
        
        //Inputfelder
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
        
        //Kleidungsliste
        const tableOfClothes = document.getElementById("tableOfClothes")
        
        //Variablen
        let kindOfTransaction = "Übergabe"
        let listOfClothes = []

        window.onload = function() {
            showStart();
        }
        
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
        
        addBtn.onclick = function () {
            if(selectClothes.value != "") {

                let alreadyChosen = false

                for(i=0; i<listOfClothes.length; i++) {
                    if (listOfClothes[i] === selectClothes.value) {
                        console.log("Kleidungsstück wurde schon gewählt")
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
        
        submitBtn.onclick = function () {
            if(kindOfTransaction === "Übergabe") {
                
                if (checkIfArrayIsEmpty(listOfClothes) && checkIfInputIsFilled (selectConflictArea)) {
                    
                    inputZIPCode.value = "93049"
                    buildSuccessCard();

        
                } else { 
                    console.log("Fehler") //TODO Errorhandling
                }
        
        
            } else if (kindOfTransaction === "Abholung") {

                checkInputs();
                
                              
        
            } else {
                console.log("Fehler") //TODO Errorhandling
            }
        
        }

        btnNewDonation.onclick = function () {
            inputFirstName.value = ""
            inputLastName.value = ""
            inputStreet.value = ""
            inputZIPCode.value = ""
            inputCity.style.value = ""
            selectClothes.value = ""
            selectConflictArea.value = ""
            listOfClothes = []

            showRegistrationForm();
        }

        
        function showStart () {
            cardStart.style.display = "block"
            cardRegistrationForm.style.display = "none"
            cardError.style.display = "none"
            cardSuccess.style.display = "none"

        }

        function showError() {
            cardStart.style.display = "none"
            cardRegistrationForm.style.display = "none"
            cardError.style.display = "block"
            cardSuccess.style.display = "none"

        }

        function showSuccess() {
            cardSuccess.style.display = "block"

        }

        function showRegistrationForm() {
            cardStart.style.display = "none"
            cardRegistrationForm.style.display = "block"
            cardError.style.display = "none"
            cardSuccess.style.display = "none"
        }

        function checkZIPCode() {
            const digits = inputZIPCode.value.toString().slice(0,2)
            if (digits === "93") {
                buildSuccessCard();
            } else {
                alert("Es tut uns leid! Leider ist Deine Abholungsadresse zu weit weg von unserer Regensburger Filiale!")
                //TODO Fehlerhandling
            }
      
            
            
        }

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
                console.log("Success, Abholung erfolgreich gebucht!")
                checkZIPCode();
            } else {
                console.log("Fehler") //TODO Errorhandling
            }
        }
        
        function checkIfArrayIsEmpty (arr) {
            
            if (arr.length > 0) {
                selectClothes.style["border-color"] = "lightgrey"
                return true;
            } else { 
                selectClothes.style["border-color"] = "red"
                return false; }
        }
        
        function checkIfInputIsFilled (input) {
            if (input.value != "") {
                console.log("Erfolg in InputIsFilled");
                input.style["border-color"] = "lightgrey";
                return true; 
            } else { 
                console.log("Fehler in InputIsFilled");
                input.style["border-color"] = "red";
                return false; 
            }
        }

        function buildSuccessCard () {

            const date = new Date();
            const timeStampDate = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
            const timeStampTime = date.getHours() + ":"  + date.getMinutes()
            
            const successCardBody = document.getElementById("successCardBody")
        
            let k = ""
            let clothes = ""

            k += "<p class='card-text'>Kleidung: " + listOfClothes.join(", ")

            k += "</p> <p class='card-text'>Krisengebiet: "  

            k += selectConflictArea.value 

            k += "</p> <p class='card-text'>Datum: " + timeStampDate
            
            k += "</p> <p class='card-text'>Uhrzeit: " + timeStampTime

            k += "</p> <p class='card-text'>Ort: " + inputZIPCode.value + "</p>"
            
            successCardBody.innerHTML = k
            showSuccess();
        }


        
        