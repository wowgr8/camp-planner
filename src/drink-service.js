export default class DrinkService {
  static getSearch(drink) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const searchURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`;
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