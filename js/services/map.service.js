var map;

function initMap(lat, lng) {
  return _connectGoogleApi().then(() => {
    console.log('google available');
    map = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15
    });
    console.log('Map!', map);
  });
}

function addMarker(loc) {
  console.log('markerLoc', loc);
  var marker = new google.maps.Marker({
    position: loc,
    map: map,
    title: 'Current Location'
  });
  return marker;
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  var elGoogleApi = document.createElement('script');
  const API_KEY = 'AIzaSyDV9d-qBLfy7tbaa9tLfJSJm8XeyB82cQI';
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  elGoogleApi.async = true;
  elGoogleApi.defer = true;

  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject('Google script failed to load');
    // elGoogleApi.onerror = reject.bind(null,'Google script failed to load')
  });
}

export default {
  initMap,
  addMarker
};
