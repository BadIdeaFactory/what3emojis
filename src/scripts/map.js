'use strict'

var L = require('leaflet')
var LHash = require('leaflet-hash')
var geocoder = require('leaflet-geocoder-mapzen')
var geohash = require('geohash-emoji')
var emojione = require('emojione')
require('leaflet.locatecontrol')

// Create a basic Leaflet map
var accessToken = 'pk.eyJ1IjoibG91IiwiYSI6ImNrcDhwN2M0eDAyaG8ydnA5YXB2bWh1d2YifQ.fz9CF1hJCbjc2arfl9EbCg'
var map = L.map('map').setView([51.4700, 0.2592], 12)

var tileUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
if (window.devicePixelRatio > 1) {
  tileUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={accessToken}'
}
L.tileLayer(tileUrl, {
  attribution: 'Map imagery © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, Emoji by <a href="http://emojione.com/">Emoji One</a>',
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: 'mapbox/streets-v11',
  accessToken: accessToken
}).addTo(map)

var hash = new L.Hash(map)

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
  var output = emojione.toImage(emoji)
  document.getElementById('emojis').innerHTML = output
  setTitle(emoji)
}

function setTitle (emoji) {
  document.title = emoji + ' · what3emojis map'
}
