"use strict";

let cityStates = [{
    state: "California",
    stateAbbr: "CA",
    cities: ["Los Angeles", "San Francisco", "San Diego"],
},
{
    state: "Colorado",
    stateAbbr: "CO",
    cities: ["Aspen", "Boulder", "Denver", "Pagosa Springs"],
},
{
    state: "Texas",
    stateAbbr: "TX",
    cities: ["Austin", "Dallas", "Houston", "San Antonio"],
}
];

window.onload = function () {
    // load states dropdown when page first loads
    loadstateDropdown();

    const stateDropdown = document.getElementById("stateDropdown");
    stateDropdown.onchange = onstateDropdownchanged;

    const citiesDropdown = document.getElementById("citiesDropdown");
    citiesDropdown.onchange = onCitiesDropdownChanged;
}

function loadstateDropdown() {
    // Grabs the state information
    const stateDropdown = document.getElementById("stateDropdown");

    // Add a "Select one..." <option>
    let selectOneOption = document.createElement("option");   // creates <option> element
    selectOneOption.textContent = "Select one...";
    selectOneOption.value = "";
    stateDropdown.appendChild(selectOneOption);

    // loop through the cityStates array to create an <option> for each state
    for (let i = 0; i < cityStates.length; i++) {
        let theOption = document.createElement("option");   // creates <option> element
        theOption.textContent = cityStates[i].state;
        theOption.value = cityStates[i].stateAbbr;
        stateDropdown.appendChild(theOption);               // append child attaches it to the end of the options
    }

    // Add a "Select State first..." <option>
    selectOneOption = document.createElement("option"); // creates <option> element
    selectOneOption.textContent = "Select State first...";
    selectOneOption.value = " ";
    citiesDropdown.appendChild(selectOneOption);
}

function onstateDropdownchanged() {
    // finds the state and cities dropdowns
    const stateDropdown = document.getElementById("stateDropdown");
    const citiesDropdown = document.getElementById("citiesDropdown");

    clearPage();
    // remove the previous cities from the cities dropdown because the state changed
    citiesDropdown.options.length = 0;

    // find the cities dropdown selection
    let selectedstateAbbr = stateDropdown.value;

    // did they pick select one???
    if (selectedstateAbbr == " ") {
        // find the cities dropdown
        const citiesDropdown = document.getElementById("citiesDropdown");

        // Add a "Select State first..." <option>
        let selectOneOption = document.createElement("option"); // creates <option> element
        selectOneOption.textContent = "Select State first...";
        selectOneOption.value = " ";
        citiesDropdown.appendChild(selectOneOption);
        return;
    }

    let matchingState = cityStates.find(arrayElement => arrayElement.stateAbbr == selectedstateAbbr);

    // Add a "Select one..." <option>
    let selectOneOption = document.createElement("option");      // creates <option> element
    selectOneOption.textContent = "Select one...";
    selectOneOption.value = "";
    citiesDropdown.appendChild(selectOneOption);


    // loop through the cities in the matching State and create <option> elements for each
    for (let i = 0; i < matchingState.cities.length; i++) {
        let theOption = document.createElement("option");
        theOption.textContent = matchingState.cities[i];
        citiesDropdown.appendChild(theOption);
    }
}

function onCitiesDropdownChanged() {
    const stateDropdown = document.getElementById("stateDropdown");
    const citiesDropdown = document.getElementById("citiesDropdown");

    clearPage();
    // erase previous city message
    /* const messagePara = document.getElementById("messagePara");
    messagePara.innerHTML = "";
    */

    // get the selected city
    let selectedState = stateDropdown.value;

    // if "Select one..." is picked, just exit the function
    if (selectedState == "") {
        return;
    }

    // get the selected city
    let selectedCitiesIndex = citiesDropdown.selectedIndex;
    let selectedCities = citiesDropdown.options[selectedCitiesIndex].text;

    // build a message w/ team and league info and display in <p>
    let message = "State: " + selectedState + "<br>" +
        "City: " + selectedCities;
    messagePara.innerHTML = message;
}

function clearPage() {
    const messagePara = document.getElementById("messagePara");
    messagePara.innerHTML = "";
}