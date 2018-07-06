console.log('Main!');

import utils from './utils.js'
import locService from './services/loc.service.js';
import mapService from './services/map.service.js';
import weatherService from './services/weather.service.js';


window.onload = () => {
  document.querySelector('.my-loc').addEventListener('click', goToMyLoc);
  document.querySelector('.search-go').addEventListener('click', goToPosition);
  document.querySelector('.fa-copy').addEventListener('click', copyURLtoLoc);
  document.querySelector('.close-modal').addEventListener('click', utils.closeModal);
  document.querySelector('.search-field').addEventListener('keypress', () => {
    if ((event.which || event.keyCode) === 13) {
      utils.initDisplay()
      goToPosition()
    }
  });

  let coord = utils.getCordFromURL();
  if (coord) {
    utils.initDisplay();
    renderPlace(coord.lat, coord.lng);
  }
};


function copyURLtoLoc() {
  var url = utils.getURL();
  locService.getLocs()
    .then(pos => {
      url += `?lat=${pos.lat}&lng=${pos.lng}`
      document.querySelector('.modal').classList.add('open')
      document.querySelector('.loc-link').innerHTML = url
    });
}


function goToPosition() {
  utils.initDisplay();
  locService.getLocs().then(pos => {
    let lat = pos.lat;
    let lng = pos.lng;
    renderPlace(lat, lng)
  });
};


function goToMyLoc() {
  utils.initDisplay();
  locService.getCurrPosition().then(pos => {
    let lat = pos.coords.latitude;
    let lng = pos.coords.longitude;
    renderPlace(lat, lng);
  });
};


function renderPlace(lat, lng) {
  mapService.initMap(lat, lng)
    .then(() => mapService.addMarker({
      lat,
      lng
    }))
    .then(() => locService.locName(lat, lng))
    .then(() => {
      weatherService.getWeather(lat, lng)
    })
    .catch(err => {
      console.log('err!!!', err);
    });
};