const request = require('request');


const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);
    // console.log(ip);

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) return callback(error, null);
      // console.log(coordinates);

      fetchISSFlyOverTimes(coordinates, (error, flyOverTimes) => {
        if (error) return callback(error, null);
        // console.log(flyOverTimes);
        return callback(null, flyOverTimes);
      });

    });

  });
  
};

const fetchMyIP = function(callbackFunc) {

  request('https://api.ipify.org/?format=json', (requestError, responseCode, requestBody) => {
    if (requestError) return callbackFunc(`Request Error fetching IP address: ${requestError}`, null);
    if (responseCode.statusCode !== 200) return callbackFunc(`Status Code is not 200 ${requestError}`, null);
    return callbackFunc(null, JSON.parse(requestBody));
  });

};

const fetchCoordsByIP = function(ipAddress, callbackFunc) {

  request(`https://freegeoip.app/json/${ipAddress.ip}`, (requestError, responseCode, requestBody) => {
    if (requestError) return callbackFunc(`Request Error fetching coordinates: ${requestError}`, null);
    if (responseCode.statusCode !== 200) return callbackFunc(`Status Code is not 200, Fetching coordinates failed ${requestBody}`, null);
    const parsedResult = (JSON.parse(requestBody));
    const result = {};
    result.latitude = parsedResult.latitude;
    result.longitude = parsedResult.longitude;
    return callbackFunc(null, result);
  });

};

const fetchISSFlyOverTimes = function(coords, callbackFunc) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (requestError, responseCode, requestBody) => {
    if (requestError) return callbackFunc(`Request error fetching ISS flyover times: ${requestError}`, null);
    if (responseCode.statusCode !== 200) return callbackFunc(`Status Code is not 200, Fetching ISS flyover times ${requestBody}`, null);
    return callbackFunc(null, JSON.parse(requestBody).response);
  });

};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};


