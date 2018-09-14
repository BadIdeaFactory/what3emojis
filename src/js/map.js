'use strict'

var L = require('leaflet')
var LHash = require('leaflet-hash')
var geocoder = require('leaflet-geocoder-mapzen')
var geohash = require('geohash-emoji')
var emojione = require('emojione')
require('leaflet.locatecontrol')

// Create a basic Leaflet map
var accessToken = 'pk.eyJ1IjoibG91IiwiYSI6IkJDYlg3REEifQ.9BLp9eUdT11kUy1jgujSsQ'
var map = L.map('map').setView([51.4700, 0.2592], 12)

var tileUrl = 'https://api.mapbox.com/v4/lou.n26nngnj/{z}/{x}/{y}.png'
if (window.devicePixelRatio >= 2) {
  tileUrl = 'https://api.mapbox.com/v4/lou.n26nngnj/{z}/{x}/{y}@2x.png'
}
L.tileLayer(tileUrl + '?access_token=' + accessToken, {
  attribution: 'Map imagery © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, Emoji by <a href="http://emojione.com/">Emoji One</a>'
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

// Add Pelias geocoding plugin
var pelias = new L.Control.Geocoder('ge-1793afb81c0a7784', {
  url: 'https://api.geocode.earth/v1',
  markers: false,
  pointIcon: '../css/img/point_icon.png',
  polygonIcon: '../css/img/polygon_icon.png',
  expanded: true,
  fullWidth: false, // Handle this ourselves.
}).addTo(map)

map.on('moveend', getEmoji)

getEmoji()

if (document.getElementById('map').className.indexOf('leaflet-touch') > 0) {
  document.body.className += ' leaflet-touch'
}

function getEmoji () {
  var center = map.getCenter()
  var lat = center.lat
  var lng = center.lng
  var emoji = geohash.coordAt(lat, lng)
  var output = emojione.unicodeToImage(emoji)
  document.getElementById('emojis').innerHTML = output
  setTitle(emoji)
}

function setTitle (emoji) {
  document.title = emoji + ' · what3emojis map'
}
