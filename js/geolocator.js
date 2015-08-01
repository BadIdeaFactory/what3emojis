// (c) 2015 Mapzen
//
// MAP UI · GEOLOCATOR
//
// "Locate me" button for demos
// ----------------------------------------------------------------------------
/* global map */

var MapzenGeolocator = (function () {
  'use strict'

  var latitude
  var longitude
  var protocol = (window.location.protocol === 'https:') ? 'https:' : 'http:'
  var STYLESHEET = protocol + '//s3.amazonaws.com/assets-staging.mapzen.com/ui/components/geolocator/geolocator.min.css'

  var GEOLOCATOR_TITLE_TEXT = 'Get current location'

//  if (!map) return false
  if (window.self !== window.top) return false

  _createElAndAppend()
  _loadExternalStylesheet(STYLESHEET)

  // PLACEHOLDER
  var MapzenGeolocator = function (mapObj, options) {
  }

  function _loadExternalStylesheet (stylesheetUrl) {
    var el = document.createElement('link')
    el.setAttribute('rel', 'stylesheet')
    el.setAttribute('type', 'text/css')
    el.setAttribute('href', stylesheetUrl)
    document.head.appendChild(el)
  }

  function _createElAndAppend () {
    // Create geo locator
    var el = document.createElement('div')
    var buttonEL = document.createElement('div')
    var iconEl = document.createElement('span')

    iconEl.className = 'mz-geolocator-icon'

    buttonEL.className = 'mz-geolocator-button'
    buttonEL.setAttribute('title', GEOLOCATOR_TITLE_TEXT)
    buttonEL.appendChild(iconEl)

    el.id = 'mz-geolocator'
    el.className = 'mz-geolocator'
    el.appendChild(buttonEL)

    document.body.appendChild(el)
    return el
  }

  var getCurrentLocation = function (success, error) {
    var geolocator = window.navigator.geolocation
    var options = {
      enableHighAccuracy: true,
      maximumAge: 10000
    }

    if (geolocator) {
      // Fixes an infinite loop bug with Safari
      // https://stackoverflow.com/questions/27150465/geolocation-api-in-safari-8-and-7-1-keeps-asking-permission/28436277#28436277
      window.setTimeout(function () {
        geolocator.getCurrentPosition(success, error, options)
      }, 0)
    } else {
      document.getElementById('mz-geolocator').style.display = 'none'
      console.log('Browser does not support geolocation')
    }
  }

  var onGeolocateSuccess = function (position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude

    /* global map */
    map.setView([latitude, longitude], 17)
    resetGeolocateButton()
  }

  var onGeolocateError = function (err) {
    console.log(err)
    alert('Unable to retrieve current position. Geolocation may be disabled on this browser or unavailable on this system.')
    resetGeolocateButton()
  }

  var resetGeolocateButton = function () {
    var button = document.getElementById('mz-geolocator').querySelector('.mz-geolocator-icon')
    button.classList.remove('mz-geolocator-active')
  }

  document.getElementById('mz-geolocator').querySelector('.mz-geolocator-icon').addEventListener('click', function (e) {
    if (e.target.classList.contains('mz-geolocator-active')) {
      return false
    }
    e.target.classList.add('mz-geolocator-active')
    getCurrentLocation(onGeolocateSuccess, onGeolocateError)
  })

  return MapzenGeolocator
})()
