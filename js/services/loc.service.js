function getCurrPosition() {
  console.log('Getting Pos');

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}


function getLocs() {
  const API_KEY = 'AIzaSyDV9d-qBLfy7tbaa9tLfJSJm8XeyB82cQI';
  let address = document.querySelector('.search-field').value.replace(/ /g, '+');
  return new Promise((resolve) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
      .then(res => {
        let geoLoc = res.data.results["0"].geometry.location
        resolve(geoLoc);
      });
  })
};


function locName(lat, lng) {
  const API_KEY = 'AIzaSyDV9d-qBLfy7tbaa9tLfJSJm8XeyB82cQI';
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`)
    .then(res => {
      let locName = res.data.results[1].formatted_address;
      document.querySelector('.curr-loc').innerHTML = `Looking at ${locName}`;
    });
}


export default {
  getLocs,
  getCurrPosition,
  locName,

};
