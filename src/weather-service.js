//api.openweathermap.org/data/2.5/forecast?appid=7f2804a37e3a228a08d8c5003214d84d&q=Portland,Oregon
//api.openweathermap.org/data/2.5/forecast?appid=7f2804a37e3a228a08d8c5003214d84d&q=97206

export default class WeatherService {
  // constructor() {
  //   maxTemp = this.calcMaxTemp();
  //   minTemp = this.calcMinTemp();
  // }
  //static getWeatherForecast(zipcode){}
  static getWeatherForecast() {
    //Note: It could be zipcode or city/state etc, but city state seems more reliable. Fetch below just for testing with Portland,Oregon
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?appid=${process.env.API_KEY_WEATHER}&q=97206&country=US&units=imperial`)
    //return fetch(`/api.openweathermap.org/data/2.5/forecast?appid=${process.env.API_KEY}&q=${zipcode}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        else if (response.ok && response.status === 200){
          return response.json();
        }
        else {
          throw Error (response.statusText);
        }
      })
      .catch(function(error) {
        return error;
      });
  }
  //  calcMinTemp() {
  //     let minTemp = 100;
  //     for(let hourlyInterval = 0; hourlyInterval<=8; hourlyInterval++) {
  //       if (response.list[i].main.temp_max > maxTemp) {
  //         maxTemp = response.list[i].main.temp_max;
  //       }
  //       if (response.list[i].main.temp_min < minTemp) {
  //         minTemp = response.list[i].main.temp_min;
  //       }
  //       else {
  //         console.log("No change to temp max and min");
  //       }
  //     }
  //   }
}