 import $ from 'jquery';
 import 'bootstrap';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import './css/styles.css';
 import WeatherService from './weather-service.js';

function displayResults(response) {
  if(response.list) {
    console.log("It's weather time!");
  } else {
    console.log("No weather for you");
  }
}

 $(document).ready(function() {
  $('.main_nav').click(function(event) {
    event.preventDefault();

    WeatherService.getWeatherForecast()
    .then(function(response) {
      displayResults(response);
    });
  });
 });
