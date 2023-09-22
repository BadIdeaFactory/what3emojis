'use strict'

var L = require('leaflet')
var LHash = require('leaflet-hash')
var geocoder = require('leaflet-geocoder-mapzen')
var geohash = require('geohash-emoji')
var emojione = require('emojione')
var protomaps = require('protomaps')
require('leaflet.locatecontrol')

// Create a basic Leaflet map
var map = L.map('map').setView([51.4700, 0.2592], 12)

var accessToken = "1b6f5f2a9ad19a57"
var layer = protomaps.leafletLayer({
  attribution:'Map imagery © <a href="https://protomaps.com">Protomaps</a> © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, Emoji by <a href="http://emojione.com/">Emoji One</a>',
  url:'https://api.protomaps.com/tiles/v2/{z}/{x}/{y}.pbf?key=' + accessToken
})
layer.addTo(map)

var urlFragment = decodeURIComponent(window.location.hash).replace('#', '');
if ([...urlFragment].length == 3) {
  var location = geohash.coordFromHash(urlFragment);
  map.setView([location[0], location[1]], 12);
} else {
  new L.Hash(map)
}

// Geolocator
L.control.locate({
  drawCircle: false,
  follow: false,
  showPopup: false,
  markerStyle: {
    opacity: 0,
  }
}).addTo(map)

// Bundle
const pointIcon = require('../images/point_icon.png')
const polygonIcon = require('../images/polygon_icon.png')

// Add Pelias geocoding plugin
var pelias = new L.Control.Geocoder('ge-1793afb81c0a7784', {
  url: 'https://api.geocode.earth/v1',
  markers: false,
  pointIcon: pointIcon,
  polygonIcon: polygonIcon,
  expanded: true,
  fullWidth: false, // Handle this ourselves.
}).addTo(map)

map.on('moveend', getEmoji)

// Configure Emoji
emojione.emojiSize = '64'

getEmoji()

if (document.getElementById('map').className.indexOf('leaflet-touch') > 0) {
  document.body.className += ' leaflet-touch'
}

function getEmoji () {
  var center = map.getCenter()
  var lat = center.lat
  var lng = center.lng
  var emoji = geohash.coordAt(lat, lng)
  window.location.replace("#" + emoji)
  var output = emojione.toImage(emoji)

  var link = document.createElement('a');
  link.setAttribute('href', '#' + emoji);
  link.innerHTML = output;

  document.getElementById('emojis').innerHTML = link.outerHTML
  setTitle(emoji)
}

function setTitle (emoji) {
  document.title = emoji + ' · what3emojis map'
}
