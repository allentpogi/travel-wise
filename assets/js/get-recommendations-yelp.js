/* To retrieve the data of 10 recommended places to visit in the selected destination */
/* Used Yelp API to get the required data */

/* the selected desitnation by the user */
var city = localStorage.getItem("userSelectedCity");

/* to display the city name in the header for destinations.html page */
var destinationHeaderEl = document.querySelector(".destination-name");
destinationHeaderEl.textContent = city;

var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + city + "&categories=amusementparks&categories=parks&categories=museums&categories=aquariums&categories=arcades&categories=tours&categories=arts&categories=attractionfarms&sort_by=review_count&limit=10";
var apiKey = "kSEvBygo41ZOQRY3djEBiQRa71zBbcE8x6I52buCSjLkMqLdHmjg9YbM4H-WcP6dR3cP0M8PPoh193-K3aq4ns4OJmbEv_PvZFjJmDCKa4OdyuYgkrRgusApVqciZHYx"; 

var businessContainer = document.getElementById('businesses');

/* header for the request */
var requestHeader = {
  "accept": "application/json",
  "Access-Control-Allow-Origin":"*",
  "Authorization": `Bearer ${apiKey}`
}

/* request options */
var requestOption = {
  method: 'GET',
  headers: requestHeader
}

/* requesting data from the server */
fetch(queryURL, requestOption)
  .then(function (response) {
    return response.json();
  })
  .then(result => renderRecommendationsData(result));

  //save to bucketlist
  var addTolistBtn = document.querySelector("#bucketlist-btn");


  addTolistBtn.addEventListener("click", function(event) {
    var bucketCities = [];
    var citiesBucketlist =  JSON.parse(localStorage.getItem("group6-bucket-list-cities"));
    var cityTosave = localStorage.getItem("userSelectedCity")
    if (citiesBucketlist !== null) {
      bucketCities = citiesBucketlist;
    }


    console.log(bucketCities.includes(cityTosave))
    if (bucketCities.includes(cityTosave) == true) {

      $( function() {
        $( "#dialog-fail" ).dialog();
      } );

    } else {
      bucketCities.push(cityTosave);
      localStorage.setItem("group6-bucket-list-cities", JSON.stringify(bucketCities));

      $( function() {
        $( "#dialog-success" ).dialog();
      } );

    }

  });

/* 
* render data retrieved from the server on destinations.html page
* from the response from the server, retrieve the recommended places and its informations
*/
function renderRecommendationsData(data) {
    var business = data.businesses;
    for (var i = 0; i < business.length; i++) {
      //define elements needed to build the business cards
      var businessCard = document.createElement('div');
      var name = document.createElement('h4');
      name.classList.add("rec-name");
      var businessImage = document.createElement('img');
      var imageDiv = document.createElement('div');
      var address = document.createElement('p');
      var rating = document.createElement('p');
      var reviewCount = document.createElement('p');
      var phone = document.createElement('p');
      var url = document.createElement('a');

      //set the attributes and values
      url.href = business[i].url;
      url.classList.add("link-to-destination");
      url.target = "_blank";
      businessImage.src = business[i].image_url;
      imageDiv.setAttribute('style', 'overflow: hidden;');
      imageDiv.setAttribute('id', 'business-image');
      imageDiv.appendChild(businessImage);
      businessImage.setAttribute('style', 'max-width: 100%; max-height: 100%; height: 13em; width: 90%; margin: 1em auto');
      imageDiv.setAttribute('id', 'image');
      name.textContent = business[i].name;
      address.textContent = 'Address: ' + business[i].location.display_address;
      rating.textContent = 'Rating: ' + business[i].rating;
      reviewCount.textContent = 'Review count: ' + business[i].review_count;
      phone.textContent = 'Phone: ' + business[i].display_phone;
      console.log(business[i].name);
      businessCard.classList.add("businessCard");

      //append the elements
      businessCard.appendChild(name);
      businessCard.appendChild(rating);
      businessCard.appendChild(reviewCount);
      businessCard.appendChild(address);
      businessCard.appendChild(phone);
      businessCard.appendChild(imageDiv);
      url.appendChild(businessCard);
      businessContainer.appendChild(url);
    }
}

