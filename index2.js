const {nextISSTimesForMyLocation} = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((resolved => {
    console.log(resolved)
  }))
  .catch((error) => {
    console.log("There was an error:", error)
  });