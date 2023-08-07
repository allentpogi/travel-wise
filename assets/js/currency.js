/* To retrieve the latest currency exchange rate data of the selected destination */
/* Used Fixer.io API to get the required data */

// extra API key
// sBkWGidcvvz1zCSDEmsTtV9vXxdD1Nvr
// SlevtC27eE76f6urUpqiJisdHBEjYRXC
// QaMPdQvBv497O2H54foAV8WnMhQzurnJ
// jfuosGoy8iVo05vjAEZURsKhYyYP6lvh
// 9uOvRX8iS0Fegq3opZyi87ZWXRyj3vTr
// 5qrVWFzMGJQw43t4W1EbXhgawiJF95SM

/* to store key value pair of cities and its currencies  */
var citiesCurrencies = 
{
  "Shanghai": "CNY",
  "São Paulo": "BRL",
  "Mexico City": "MXN",
  "Cairo": "EGP",
  "Mumbai": "INR",
  "Beijing": "CNY",
  "Dhaka": "BDT",
  "Osaka": "JPY",
  "New York": "USD",
  "Karachi": "PKR",
  "Buenos Aires": "ARS",
  "Chongqing": "CNY",
  "Istanbul": "TRY",
  "Kolkata": "INR",
  "Manila": "PHP",
  "Lagos": "NGN",
  "Rio de Janeiro": "BRL",
  "Tianjin": "CNY",
  "Kinshasa": "CDF",
  "Guangzhou": "CNY",
  "Los Angeles": "USD",
  "Moscow": "RUB",
  "Shenzhen": "CNY",
  "Lahore": "PKR",
  "Bangalore": "INR",
  "Paris": "EUR",
  "Bogotá": "COP",
  "Jakarta": "IDR",
  "Chennai": "INR",
  "Lima": "PEN",
  "Bangkok": "THB",
  "Seoul": "KRW",
  "Nagoya": "JPY",
  "Hyderabad": "INR",
  "London": "GBP",
  "Tehran": "IRR",
  "Chicago": "USD",
  "Chengdu": "CNY",
  "Nanjing": "CNY",
  "Wuhan": "CNY",
  "Ho Chi Minh City": "VND",
  "Luanda": "AOA",
  "Ahmedabad": "INR",
  "Kuala Lumpur": "MYR",
  "Hong Kong": "HKD",
  "Dongguan": "CNY",
  "Hangzhou": "CNY",
  "Foshan": "CNY",
  "Shenyang": "CNY",
  "Riyadh": "SAR",
  "Baghdad": "IQD",
  "Santiago": "CLP",
  "Surat": "INR",
  "Madrid": "EUR",
  "Suzhou": "CNY",
  "Pune": "INR",
  "Harbin": "CNY",
  "Houston": "USD",
  "Dallas": "USD",
  "Toronto": "CAD",
  "Miami": "USD",
  "Singapore": "SGD",
  "Philadelphia": "USD",
  "Atlanta": "USD",
  "Fukuoka": "JPY",
  "Khartoum": "SDG",
  "Barcelona": "EUR",
  "Johannesburg": "ZAR",
  "Saint Petersburg": "RUB",
  "Qingdao": "CNY",
  "Dalian": "CNY",
  "Washington": "USD",
  "Yangon": "MMK",
  "Alexandria": "EGP",
  "Jinan": "CNY",
  "Guadalajara": "MXN"
}

/* the selected destination by the user */
var destinatedCity = localStorage.getItem("userSelectedCity");

/* variables that need to be used to fetch data from the server */
var endpoint = "latest";
var symbol = "USD";
var base = "AUD";

/* the currency code of the selected destination */
var symbol = citiesCurrencies[destinatedCity];
/* selecting currency data id div block from destination.html page */
var currencyEl = $(".currency-container");
/* creating the div block to display exchange rate */
var exchangeRateEl = $('<div>');

/* 
* render data using jQuery
* from the response result, retrieve the rate
* then render the rate on html page
*/
function renderCurrencyData(data) {
    const dataString = data;
    const jsonData = JSON.parse(dataString);
    var rates = jsonData.rates[symbol];
    const text = `1 ${base} = ${rates} ${symbol}`;
    exchangeRateEl.text(text);
    exchangeRateEl.attr('id', 'exchange-rate');
    currencyEl.append(exchangeRateEl);
}

/* header for the request */
var fixerRequestHeader = new Headers();
fixerRequestHeader.append("apikey", "5qrVWFzMGJQw43t4W1EbXhgawiJF95SM");

/* request options */
var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: fixerRequestHeader
};

/* requesting data from the server */
var url = `https://api.apilayer.com/fixer/${endpoint}?symbols=${symbol}&base=${base}`;

fetch(url, requestOptions)
  .then(response => response.text())
  .then(result => renderCurrencyData(result))
  .catch(error => console.log('error', error));