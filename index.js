const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, flyOverTimes) => {

  if (error) return console.log("It didn't work!", error);
  // console.log(flyOverTimes);  

  let output = ``;
  for (let item of flyOverTimes) {
    let timeAndDate = new Date((item.risetime*1000))
    let time = timeAndDate.toTimeString();
    let date = timeAndDate.toDateString();  
    output += `Next pass at ${date} ${time} for ${item.duration} seconds!\n`  
  }  
  console.log(output)

});





// const datetime = new Date(0);
// datetime.setUTCSeconds(pass.risetime);
// const duration = pass.duration;

// const result = [
//   { duration: 529, risetime: 1630050397 },
//   { duration: 656, risetime: 1630056113 },
//   { duration: 630, risetime: 1630061954 },
//   { duration: 615, risetime: 1630067817 },
//   { duration: 652, risetime: 1630073643 }
// ]

// {
//   message: 'success',
//   request: {
//     altitude: 100,
//     datetime: 1630012011,
//     latitude: ⚠️😸️,
//     longitude: ⚠️😸️,
//     passes: 5
//   },
//   response: [
//     { duration: 529, risetime: 1630050397 },
//     { duration: 656, risetime: 1630056113 },
//     { duration: 630, risetime: 1630061954 },
//     { duration: 615, risetime: 1630067817 },
//     { duration: 652, risetime: 1630073643 }
//   ]
// }
