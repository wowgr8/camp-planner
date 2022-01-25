export default class MealService {
  static getSearch(meal) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let meal1 = meal;
      const searchURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal1}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", searchURL, true);
      request.send();
    });
  }
}