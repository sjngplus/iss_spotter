const request = require('request-promise-native');

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((resolved) => {
    const flyOverTimes = JSON.parse(resolved).response;
    let output = ``;
    for (let item of flyOverTimes) {
    let timeAndDate = new Date((item.risetime*1000))
    let time = timeAndDate.toTimeString();
    let date = timeAndDate.toDateString();  
    output += `Next pass at ${date} ${time} for ${item.duration} seconds!\n`  
  }  
    return output;
  });
};

const fetchMyIP = function() {
  return request('https://api.ipify.org/?format=json');
};

const fetchCoordsByIP = function(ipAddressJSON) {
  const ipAddress = JSON.parse(ipAddressJSON).ip
  return request(`https://freegeoip.app/json/${ipAddress}`);
};

const fetchISSFlyOverTimes = function(coordsObject) {
  const parsedCoords = JSON.parse(coordsObject)
  const coords = {};
  coords.latitude = parsedCoords.latitude;
  coords.longitude = parsedCoords.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`);
};

module.exports = {
  nextISSTimesForMyLocation
}