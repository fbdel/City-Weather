
function buildQueryURL() {
  // queryURL is the url we'll use to query the API
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

  const cityInput = $("#article-count :selected").val();
  const city= cityInput;
  console.log ("City Selected: "+ city)

  const APIKey = '00f7cf1fb41bd520ded55a47adb1d868';
  // console.log("config" + config + "<br>");
  // Here we are building the URL we need to query the database
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    ",USi&units=imperial&appid=" +
    APIKey;
  return queryURL
}

function updatePage(WeatherData){
  //Append data into the Article-Section area
  $("#article-section").append("<div id='weather-div'>");
  $("#article-section").append("<h3><u>" + WeatherData.name + " Weather Details</u></h3>");
  $("#article-section").append("<h5>Temperature(F): <b>" + WeatherData.main.temp+"</b></h4>");
  $("#article-section").append("<h5>Wind Speed: <b>" + WeatherData.wind.speed+"</b></h5>");
  $("#article-section").append("<h5>Humidity: <b>" + WeatherData.main.humidity+"</b></h5>");
  $("#article-section").append("</div>");


  console.log(WeatherData);

  // Log the data in the console as well
  console.log("Wind Speed: " + WeatherData.wind.speed);
  console.log("Humidity: " + WeatherData.main.humidity);
  console.log("Temperature (F): " + WeatherData.main.temp);
}

// Function to empty out the articles
function clear() {
  $("#article-section").empty();
}

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  clear();

  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();
  console.log ("queryURL: "+ queryURL)
  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});

//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);

