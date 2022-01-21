//api.openweathermap.org/data/2.5/forecast?appid=7f2804a37e3a228a08d8c5003214d84d&q=Portland,Oregon
//api.openweathermap.org/data/2.5/forecast?appid=7f2804a37e3a228a08d8c5003214d84d&q=97206

export default class WeatherService {
  //static getWeatherForecast(zipcode){}
  static getWeatherForecast() {
    //Note: It could be zipcode or city/state etc. The query area is pretty flexible. Fetch below just for testing with 97206 zip
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?appid=${process.env.API_KEY_WEATHER}&q=97206`)
    //return fetch(`/api.openweathermap.org/data/2.5/forecast?appid=${process.env.API_KEY}&q=${zipcode}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        else if (response.ok && response.status === 200){
          //console.log("response.json");
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
}