import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js';
import MapService from './map-service.js';
import MealService from './meal-service.js';
import DrinkService from './drink-service.js';

function forecastByDay(response) {
  let forcastDateAndTime = "";
  for (let i = 0; i<response.list.length; i++) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' };
    let weatherIcon = response.list[i].weather[0].icon;
    let timeStampToNiceFormat = (new Date((response.list[i].dt_txt))).toLocaleDateString('en-US', options);
    forcastDateAndTime += `<li>${timeStampToNiceFormat}: Max Temp: ${response.list[i].main.temp_max} 
    Min Temp: ${response.list[i].main.temp_min} <img src="${`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}" alt="weather image"></li>`;
  }
  $('.showForcast').html(forcastDateAndTime);
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
  $('#location').submit(function(event) {
    event.preventDefault();
    let location=$('input#zipcode').val();
    let lat, lon;

    WeatherService.getWeatherForecast(location)
      .then(function(response) {
        displayResults(response);
        lat = response.city.coord.lat;
        lon = response.city.coord.lon;
        MapService.getMap(lat,lon)
          .then(function(mapResponse) {
            $(".map").html(`<img src="${mapResponse}" class="img-fluid">`);
          });
      }); 
  });
});

//data tab target links two together 
//loop through the tabs and adding an event listener and show the target
//data tab congit comtent, you going to loop thru, add classList of remove to remove the active 
//21Attributes can be set and read by the camelCase name/key as an object property of the dataset: element.dataset.keyname
const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active');
    });
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    tab.classList.add('active');
    target.classList.add('active');
  });
});

//draggables
//first grab all the things you can grab and containers is where you can drop elements
const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

//loop through each draggable and add and EventListener.  1st you have to start it with dragstart event. add to class using .classList, add dragging. then stop ghost like effect by classlist.remove 
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});
//looping through the container.  dragover will check if over something. then check to see what which container it is in.  draggable is the one you are draggin and it will add to the container 1 vs 2. e preventdefault is to drop it in the element/container 
//if afterElements is not anything then goes on the bottom of the list 
containers.forEach(container => {
  container.addEventListener('dragover', e => {
    console.log ('dragover'); 
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});
//this will put it in a certain position (not just containers). to get all of the draggable elements (container.querySelectorAll) but to return it into a array use the spread operator 
//closest and  every one is a child of the container
//offset (middle of the box) is the to figure out what it is closest to.  if less than zero it is above, if closest to offset and barely above element 
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}



// ----------------------------Meal Service and Drink Service Logic ---------------------------- //

// function clearFields(){
//   $('#search').val("");
//   $('#imageToShow').attr("");
//   $('.showName').text("");
//   $('.showCategory').text("");
//   $('.showArea').text("");
// }

$('#mealSearch').click(function() {
  let search1 = $('#search1').val();
  // clearFields();
  let promise = MealService.getSearch(search1);
  promise.then(function(response){
    const body = JSON.parse(response);
    console.log(body);
    let mealImage = body.meals[0].strMealThumb;
    $('#imageToShow').attr("src", mealImage);
    let mealName = body.meals[0].strMeal;
    $('.showName').text(mealName);
    let mealCategory = body.meals[0].strCategory;
    $('.showCategory').text(mealCategory);
    let mealArea = body.meals[0].strArea;
    $('.showArea').text(mealArea);
    // Ingredients
    let mealIngredient1 = body.meals[0].strIngredient1;
    $('.showIngredient1').text(mealIngredient1);
    let mealIngredient2 = body.meals[0].strIngredient2;
    $('.showIngredient2').text(mealIngredient2);
    let mealIngredient3 = body.meals[0].strIngredient3;
    $('.showIngredient3').text(mealIngredient3);
    let mealIngredient4 = body.meals[0].strIngredient4;
    $('.showIngredient4').text(mealIngredient4);
    let mealIngredient5 = body.meals[0].strIngredient5;
    $('.showIngredient5').text(mealIngredient5);
    let mealIngredient6 = body.meals[0].strIngredient6;
    $('.showIngredient6').text(mealIngredient6);
    let mealIngredient7 = body.meals[0].strIngredient7;
    $('.showIngredient7').text(mealIngredient7);
    let mealIngredient8 = body.meals[0].strIngredient8;
    $('.showIngredient8').text(mealIngredient8);
    let mealIngredient9 = body.meals[0].strIngredient9;
    $('.showIngredient9').text(mealIngredient9);
    let mealIngredient10 = body.meals[0].strIngredient10;
    $('.showIngredient10').text(mealIngredient10);
    let mealIngredient11 = body.meals[0].strIngredient11;
    $('.showIngredient11').text(mealIngredient11);
    let mealIngredient12 = body.meals[0].strIngredient12;
    $('.showIngredient12').text(mealIngredient12);
    let mealIngredient13 = body.meals[0].strIngredient13;
    $('.showIngredient13').text(mealIngredient13);
    let mealIngredient14 = body.meals[0].strIngredient14;
    $('.showIngredient14').text(mealIngredient14);
    let mealIngredient15 = body.meals[0].strIngredient15;
    $('.showIngredient15').text(mealIngredient15);
    let mealIngredient16 = body.meals[0].strIngredient16;
    $('.showIngredient16').text(mealIngredient16);
    let mealIngredient17 = body.meals[0].strIngredient17;
    $('.showIngredient17').text(mealIngredient17);
    let mealIngredient18 = body.meals[0].strIngredient18;
    $('.showIngredient18').text(mealIngredient18);
    let mealIngredient19 = body.meals[0].strIngredient19;
    $('.showIngredient19').text(mealIngredient19);
    let mealIngredient20 = body.meals[0].strIngredient20;
    $('.showIngredient20').text(mealIngredient20);
    // Measurements strMeasure1
    let mealMeasurement1 = body.meals[0].strMeasure1;
    $('.showMeasurement1').text(mealMeasurement1);
    let mealMeasurement2 = body.meals[0].strMeasure2;
    $('.showMeasurement2').text(mealMeasurement2);
    let mealMeasurement3 = body.meals[0].strMeasure3;
    $('.showMeasurement3').text(mealMeasurement3);
    let mealMeasurement4 = body.meals[0].strMeasure4;
    $('.showMeasurement4').text(mealMeasurement4);
    let mealMeasurement5 = body.meals[0].strMeasure5;
    $('.showMeasurement5').text(mealMeasurement5);
    let mealMeasurement6 = body.meals[0].strMeasure6;
    $('.showMeasurement6').text(mealMeasurement6);
    let mealMeasurement7 = body.meals[0].strMeasure7;
    $('.showMeasurement7').text(mealMeasurement7);
    let mealMeasurement8 = body.meals[0].strMeasure8;
    $('.showMeasurement8').text(mealMeasurement8);
    let mealMeasurement9 = body.meals[0].strMeasure9;
    $('.showMeasurement9').text(mealMeasurement9);
    let mealMeasurement10 = body.meals[0].strMeasure10;
    $('.showMeasurement10').text(mealMeasurement10);
    let mealMeasurement11 = body.meals[0].strMeasure11;
    $('.showMeasurement11').text(mealMeasurement11);
    let mealMeasurement12 = body.meals[0].strMeasure12;
    $('.showMeasurement12').text(mealMeasurement12);
    let mealMeasurement13 = body.meals[0].strMeasure13;
    $('.showMeasurement13').text(mealMeasurement13);
    let mealMeasurement14 = body.meals[0].strMeasure14;
    $('.showMeasurement14').text(mealMeasurement14);
    let mealMeasurement15 = body.meals[0].strMeasure15;
    $('.showMeasurement15').text(mealMeasurement15);
    let mealMeasurement16 = body.meals[0].strMeasure16;
    $('.showMeasurement16').text(mealMeasurement16);
    let mealMeasurement17 = body.meals[0].strMeasure17;
    $('.showMeasurement17').text(mealMeasurement17);
    let mealMeasurement18 = body.meals[0].strMeasure18;
    $('.showMeasurement18').text(mealMeasurement18);
    let mealMeasurement19 = body.meals[0].strMeasure19;
    $('.showMeasurement19').text(mealMeasurement19);
    let mealMeasurement20 = body.meals[0].strMeasure20;
    $('.showMeasurement20').text(mealMeasurement20);
    // Instructions
    let mealInstructions = body.meals[0].strInstructions;
    $('.showInstructions').text(mealInstructions);
    // $('.footer').show();
  });
});

$('#drinkSearch').click(function() {
  let search2 = $('#search2').val();
  // clearFields();
  let promise = DrinkService.getSearch(search2);
  promise.then(function(response){
    const body = JSON.parse(response);
    console.log(body);
    let drinkImage = body.drinks[0].strDrinkThumb;
    $('#drinkImageToShow').attr("src", drinkImage);
    let drinkName = body.drinks[0].strDrink;
    $('.showDrinkName').text(drinkName);
    // Ingredients
    let drinkIngredient1 = body.drinks[0].strIngredient1;
    $('.showDrinkIngredient1').text(drinkIngredient1);
    let drinkIngredient2 = body.drinks[0].strIngredient2;
    $('.showDrinkIngredient2').text(drinkIngredient2);
    let drinkIngredient3 = body.drinks[0].strIngredient3;
    $('.showDrinkIngredient3').text(drinkIngredient3);
    let drinkIngredient4 = body.drinks[0].strIngredient4;
    $('.showDrinkIngredient4').text(drinkIngredient4);
    let drinkIngredient5 = body.drinks[0].strIngredient5;
    $('.showDrinkIngredient5').text(drinkIngredient5);
    let drinkIngredient6 = body.drinks[0].strIngredient6;
    $('.showDrinkIngredient6').text(drinkIngredient6);
    // Measurements strMeasure1
    let drinkMeasurement1 = body.drinks[0].strMeasure1;
    $('.showDrinkMeasurement1').text(drinkMeasurement1);
    let drinkMeasurement2 = body.drinks[0].strMeasure2;
    $('.showDrinkMeasurement2').text(drinkMeasurement2);
    let drinkMeasurement3 = body.drinks[0].strMeasure3;
    $('.showDrinkMeasurement3').text(drinkMeasurement3);
    let drinkMeasurement4 = body.drinks[0].strMeasure4;
    $('.showDrinkMeasurement4').text(drinkMeasurement4);
    let drinkMeasurement5 = body.drinks[0].strMeasure5;
    $('.showDrinkMeasurement5').text(drinkMeasurement5);
    let drinkMeasurement6 = body.drinks[0].strMeasure6;
    $('.showDrinkMeasurement6').text(drinkMeasurement6);
    // Instructions
    let drinkInstructions = body.drinks[0].strInstructions;
    $('.showDrinkInstructions').text(drinkInstructions);
    // $('.footer').show();
  });
});

// ----------------------------Meal Service and Drink Service Logic ---------------------------- //