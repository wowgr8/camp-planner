 import $ from 'jquery';
 import 'bootstrap';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import './css/styles.css';
 import WeatherService from './weather-service.js';
 import MapService from './map-service.js';

 function forecastByDay(response) {
  let forcastDateAndTime = "";
 // let dateArray = [];
 // let dateArrayNice;
  for (let i = 0; i<response.list.length; i++) {
   // let dateToForecast = new Date((response.list[i].dt_txt));
   // let dateToForecastNice = dateToForecast.toDateString();
   // dateArray.push(dateToForecastNice);
    //dateArrayNice = new Set(dateArray);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' };
    let weatherIcon = response.list[i].weather[0].icon;
    let timeStampToNiceFormat = (new Date((response.list[i].dt_txt))).toLocaleDateString('en-US', options);
    forcastDateAndTime += `<li>${timeStampToNiceFormat}: Max Temp: ${response.list[i].main.temp_max} 
    Min Temp: ${response.list[i].main.temp_min}  <img src="${`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}" alt="weather image"></li>`;
    //console.log(dateToForecastNice + response.list[i].main.temp_min);
  }
  //forcastDateAndTime += `<li>${dateArrayNice}</li>`;
  $('.forecast-list').html(forcastDateAndTime);
  //console.log(dateArrayNice);
  return 0;
}

function displayResults(response) {
  if(response.list) {
    console.log("It's weather time!");
    (forecastByDay(response));
  } else {
    console.log("No weather for you");
  }
}

 $(document).ready(function() {
  $('.main_nav').click(function(event) {
    event.preventDefault();
    let lat, lon;

    WeatherService.getWeatherForecast()
    .then(function(response) {
      displayResults(response);
      lat = response.city.coord.lat;
      lon = response.city.coord.lon;
      console.log("This is the lat: " + lat + " lon: " + lon);
      //This seems like a bad idea to call another service from w/in weather service, but here we are!
      MapService.getMap(lat,lon)
      .then(function(mapResponse) {
        $(".map").html(`<img src="${mapResponse}" class="img-fluid">`);
      });
    });
  });
 });
