const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) return console.log("It didn't work!", error);
  console.log(passTimes);
});

fetchMyIP((error, ip) => {
  if (error) return console.log(error);
  console.log(ip);
});

const addressIP = '72.141.2.223'
fetchCoordsByIP(addressIP, (error, coordinates) => {
  if (error) return console.log(error);
  console.log(coordinates);
});

const coords = { latitude: 43.693, longitude: -79.8365 };
fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
  if (error) return console.log(error);
  console.log(flyOverTimes);
});