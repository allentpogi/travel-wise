// creates function and variable for all of the cities in the website
$( function() {
  var cities = [
    'Shanghai',
    'São Paulo',
    'Mexico City',
    'Cairo',
    'Mumbai',
    'Beijing',
    'Dhaka',
    'Osaka',
    'New York',
    'Karachi',
    'Buenos Aires',
    'Chongqing',
    'Istanbul',
    'Kolkata',
    'Manila',
    'Lagos',
    'Rio de Janeiro',
    'Tianjin',
    'Kinshasa',
    'Guangzhou',
    'Los Angeles',
    'Moscow',
    'Shenzhen',
    'Lahore',
    'Bangalore',
    'Paris',
    'Bogotá',
    'Jakarta',
    'Chennai',
    'Lima',
    'Bangkok',
    'Seoul',
    'Nagoya',
    'Hyderabad',
    'London',
    'Tehran',
    'Chicago',
    'Chengdu',
    'Nanjing',
    'Wuhan',
    'Ho Chi Minh City',
    'Luanda',
    'Ahmedabad',
    'Kuala Lumpur',
    'Hong Kong',
    'Dongguan',
    'Hangzhou',
    'Foshan',
    'Shenyang',
    'Riyadh',
    'Baghdad',
    'Santiago',
    'Surat',
    'Madrid',
    'Suzhou',
    'Pune',
    'Harbin',
    'Houston',
    'Dallas',
    'Toronto',
    'Miami',
    'Singapore',
    'Philadelphia',
    'Atlanta',
    'Fukuoka',
    'Khartoum',
    'Barcelona',
    'Johannesburg',
    'Saint Petersburg',
    'Qingdao',
    'Dalian',
    'Washington',
    'Yangon',
    'Alexandria',
    'Jinan',
    'Guadalajara',
    'Marrakech'
  ];
  $( "#myCity" ).autocomplete({
    source: cities
  });
} );

//save the country selected by user to local storage
var cityButton = document.getElementById("submit");
var cityTextbox = document.getElementById("myCity");

localStorage.setItem("userSelectedCity", "");


// Add click event to button
cityButton.addEventListener("click", function(event) {
  if (cityTextbox.value != "") {
    localStorage.setItem("userSelectedCity", cityTextbox.value);
    window.location.href = 'destinations.html'
  }
});

//add click event to top 5 destinations images and save the name to local storage
document.addEventListener("click", function(event) {
 
  var element = event.target

  if (element.matches("img") === true) {
    var cityNamealt = element.getAttribute("alt");
    var cityName = cityNamealt.replace("image of ", "");
    localStorage.setItem("userSelectedCity", cityName);

  } else if (element.matches("h3") === true) {
    var cityName = element.textContent
    localStorage.setItem("userSelectedCity", cityName);
  }


});