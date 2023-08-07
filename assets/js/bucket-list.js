// sets the variables for bucket-list.js
var cities = [];
var visitedCities =[];
var bucketList = document.querySelector("#bucket-list");

// This function is being called below and will run when the page loads. This will get the city history from local storage
function init() {
  var savedCities = JSON.parse(
    localStorage.getItem("group6-bucket-list-cities")
  );
  console.log(savedCities);


  // If cities are found in the history were retrieved from localStorage
  if (savedCities !== null) {
    cities = savedCities;
  }

  var savedVisitedcities = JSON.parse(
    localStorage.getItem("visited-cities")
  )

  if (savedVisitedcities !== null) {
    visitedCities = savedVisitedcities;
  }

  // Display city search history
  displaySavedcities();
}

// The following function displays items from local storage as buttons
function displaySavedcities() {
  // Render buttons for each history
  bucketList.innerHTML = "";
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];

    var divCity = document.createElement("div");
    divCity.classList.add("listItems");
    divCity.setAttribute(
      "style",
      "display: flex; justify-content: space-between; width: 80%;"
    );

    var button = document.createElement("a");
    button.textContent = city;
    button.classList.add("btn");
    button.setAttribute("style", "width: 70%");

    button.href = "destinations.html";

    var removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.setAttribute("style", "width: 8em");

    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("checkbox");

    divCity.appendChild(checkBox);
    divCity.appendChild(button);
    divCity.appendChild(removeBtn);

    bucketList.appendChild(divCity);

    if (visitedCities.includes(city) == true) {
      checkBox.checked = true;
    }

    checkBox.addEventListener("change", function () {
      if (this.checked) {
        console.log("Checkbox is checked..");
        visitedCities.push(this.nextSibling.text);
        localStorage.setItem("visited-cities", JSON.stringify(visitedCities));
      } 
    });

  }
}




//this will remove the city from local storage when the user clicks remove
bucketList.addEventListener("click", function (event) {
  var element = event.target;

  // Checks if element is a remove button
  if (element.matches("button") === true) {
    // console.log("it matches the remove button");

    // console.log(element)
    var cityToremove = element.previousSibling.text
    // console.log(cityToremove)

    var index = cities.indexOf(cityToremove)


    cities.splice(index, 1);

    localStorage.setItem("group6-bucket-list-cities", JSON.stringify(cities));

    displaySavedcities();
  }
});

//this will save the city in local storage when the user clicks on it
bucketList.addEventListener("click", function (event) {
  var element = event.target;

  // Checks if element is a link
  if (element.matches("a") === true) {
    console.log("it matches the link");
    // var index = cities.indexOf("Apple");
    // var index = element.parentElement.getAttribute("data-index");
    // var text = element.text
    // console.log("text", text)
    // console.log(cities)
    // console.log(index)
    // console.log(cities[index])
    var cityTosave = element.text;
    // console.log("link is clicked", cityTosave)

    localStorage.setItem("userSelectedCity", cityTosave);
  }
});

// sets the backBtn on html, as a variable
var homeBtn = document.getElementById("goBack");
// add click event to back button; goes back to index.html
homeBtn.addEventListener("click", function () {
  window.location.href = "index.html";
});

// when clicked, the sidebar will change to the 'sidebar_large' styling
var sidebar = document.querySelector(".sidebar");
var sideContainer = document.querySelector(".side-container")
var sidebarWidth
var goBacklink = document.querySelector("#goBack")

// adds on click function to the sidebar button
document.querySelector("#side-btn").onclick = function () {
  sidebar.classList.toggle("sidebar-large");
  goBacklink.classList.toggle("button-link-visible");
  var sidebarWidth1 = document.querySelector(".sidebar-large")
  // console.log(sidebarWidth1)
  if (sidebarWidth1 === null) {
    goBacklink.textContent = ""
  } else {
    goBacklink.textContent = "Back to Home"
  }

};


init();
