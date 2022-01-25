export default class WeatherService {


  static getWeatherForecast(location) {
    //Note: It could be zipcode or city/state etc, but city state seems more reliable. Fetch below just for testing with Portland,Oregon
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?appid=${process.env.API_KEY_WEATHER}&q=${location}&units=imperial`)
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
}