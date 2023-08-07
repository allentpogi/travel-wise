// Sets the variables for destination.js
var city = localStorage.getItem("userSelectedCity");
var google = {};
var Lat, Lng;


// function for initializing the city map
async function initMap() {
  var geocoder = new google.maps.Geocoder();
geocoder.geocode({
  // makes the address the selected city from the search bar
  'address': city
}, async function(results, status) {
  // implements the Google Geocoder
  if (status == google.maps.GeocoderStatus.OK) {
    // variables for latitude and longitude
    // gets the lat and long coordinates from the Google Geocoder
     Lat = results[0].geometry.location.lat();
     Lng = results[0].geometry.location.lng();
    var myOptions = {
      zoom: 11,
      center: new google.maps.LatLng(Lat, Lng)
    };
      // Create a new map centered on a specific location
  var  myMap = await new google.maps.Map(document.getElementById('map'), {
    center: {lat: Lat, lng: Lng},
    zoom: 12
  });
  
  // Add a marker to the map
  // Gets the location of the city from latitude and longitude
  // Gets the name of the selected city from the search bar
  var marker = new google.maps.Marker({
    position: {lat: Lat, lng: Lng},
    map: myMap,
    marker: marker,
    title: city,
  });
  }}
);
};


// Variable for the local time 
var timeZone = document.getElementById("timeZone")
// Function to get the local time
function updateTime(){
  var timestamp = Math.floor(Date.now() / 1000);
 
// fetchs the Google time zone API and the local time via latitude, longitude and the current timestamp
  fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${Lat},${Lng}&timestamp=${timestamp}&key=AIzaSyDGgCB_6d25AXbEuEeg4ieHGmMiWczwcoA`)
  .then(response => response.json())
  .then(data => {
    // inputs the local time to the HTML ID
    const localTime =  new Date(timestamp * 1000);
    const formattedTime = localTime.toLocaleString('en-US', {timeZone: data.timeZoneId, timeZoneOffset: (data.dstOffset + data.rawOffset) * 1000});
   timeZone.textContent = formattedTime;
    // if statement for if the status of the data is OK, data is returned.
    if (data.status === "OK") {
      return data;
    } else {
      throw new Error(data.status);
    }
    
  });
}
// reloads the page every second to get the time to update by the second
setInterval(updateTime, 1000);
// Variable for descriptionText to make it show on the HTML ID
var descriptionText = document.getElementById("description")

// fetchs the description of the city from wikipedia
fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/`+ city)
  .then(response => response.json())
  .then(data => {
    const description = data.extract;
    // returns the description of the city in the HTML ID
    descriptionText.textContent += description
  })
  .catch(error => {
    console.error(error);
  });

  // sets the backBtn on html, as a variable
  var backBtn = document.getElementById("goBack")
// add click event to back button; goes back to index.html
  backBtn.addEventListener("click", function(event){
    window.location.href="index.html"
  
  });

// when clicked, the sidebar will change to the 'sidebar_large' styling
// variables for the sidebar
var sidebar = document.querySelector(".sidebar");
var sideContainer = document.querySelector(".side-container")
var sidebarWidth
var bucketListlink = document.querySelector("#bucket-link")
var goBacklink = document.querySelector("#goBack")

// creates on click function for the sidebar button
document.querySelector("#side-btn").onclick = function () {
  sidebar.classList.toggle("sidebar-large");
  bucketListlink.classList.toggle("button-link-visible");
  goBacklink.classList.toggle("button-link-visible");
  var sidebarWidth1 = document.querySelector(".sidebar-large")

  if (sidebarWidth1 === null) {
    bucketListlink.textContent = ""
    goBacklink.textContent = ""

  } else {
    bucketListlink.textContent = "Your bucket list"
    goBacklink.textContent = "Back to Home"

  }

};
// creates onclick function for the bucket list button; shows bucketlist.html
bucketListlink.onclick= function () {
  window.location.href = 'bucketlist.html'
}
// creates onclick function for the Go back button; shows index.html (home page)
goBacklink.onclick= function () {
  window.location.href = 'index.html'
}




  





