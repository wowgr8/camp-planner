export default class MapService {
  static getMap(lat,lon) {
    return fetch(`https://maps.locationiq.com/v3/staticmap?key=${process.env.API_KEY_MAP}&center=${lat},${lon}&zoom=18`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return `https://maps.locationiq.com/v3/staticmap?key=${process.env.API_KEY_MAP}&center=${lat},${lon}&zoom=18`;
      })
      .catch(function(error) {
        return Error(error);
      });
  }
}