import L from 'leaflet'
import { LHash } from 'leaflet-hash'
import { geocoder } from 'leaflet-geocoder-mapzen'
import geohash from 'geohash-emoji'
import { leafletLayer } from 'protomaps-leaflet'
import { LocateControl } from 'leaflet.locatecontrol'
import pointIcon from 'url:../images/point_icon.png'
import polygonIcon from 'url:../images/polygon_icon.png'

// Create a basic Leaflet map
const map = L.map('map').setView([51.4700, 0.2592], 12)

const accessToken = "1b6f5f2a9ad19a57"
const layer = leafletLayer({
  attribution:'Map imagery © <a href="https://protomaps.com">Protomaps</a> © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  url:'https://api.protomaps.com/tiles/v2/{z}/{x}/{y}.pbf?key=' + accessToken
})
layer.addTo(map)

const urlFragment = decodeURIComponent(window.location.hash).replace('#', '');
if ([...urlFragment].length == 3) {
  const location = geohash.coordFromHash(urlFragment);
  map.setView([location[0], location[1]], 12);
} else {
  new L.Hash(map)
}

// Geolocator
const control = new LocateControl({
  drawCircle: false,
  follow: false,
  showPopup: false,
  markerStyle: {
    opacity: 0,
  }
})
control.addTo(map)

// Add Pelias geocoding plugin
const pelias = new L.Control.Geocoder('ge-1793afb81c0a7784', {
  url: 'https://api.geocode.earth/v1',
  markers: false,
  pointIcon: pointIcon,
  polygonIcon: polygonIcon,
  expanded: true,
  fullWidth: false, // Handle this ourselves.
}).addTo(map)

map.on('moveend', getEmoji)

getEmoji()

if (document.getElementById('map').className.indexOf('leaflet-touch') > 0) {
  document.body.className += ' leaflet-touch'
}

function getEmoji() {
  const center = map.getCenter()
  const lat = center.lat
  const lng = center.lng
  const emoji = geohash.coordAt(lat, lng)
  window.location.replace("#" + emoji)

  const link = document.createElement('a')
  link.setAttribute('href', '#' + emoji)

  const emojis = splitEmoji(emoji)
  for (let i = 0; i < emojis.length; i++) {
    const emojiEl = document.createElement('span')
    emojiEl.className = 'emoji-character'
    emojiEl.textContent = emojis[i]
    link.appendChild(emojiEl)
  }
  
  document.getElementById('emojis').innerHTML = link.outerHTML
  setTitle(emoji)
}

/**
 * Utility for splitting the string of emoji returned by geohash.coordAt()
 * to an array of emoji that we can iterate through. We can't use standard
 * string.split('') because some emoji are two code points long.
 * 
 * @example
 * splitEmoji("😴😄😃⛔🎠🚓🚇") // ['😴', '😄', '😃', '⛔', '🎠', '🚓', '🚇']
 * 
 * @todo
 * (bug) This incorrectly splits '🗃📠🏾' into two segments instead of 3.
 *
 * @param {string} emojiHash 
 * @returns string[] array of emojis
 */
function splitEmoji(emojiHash) {
  return [...new Intl.Segmenter().segment(emojiHash)].map(x => x.segment)
}

function setTitle(emoji) {
  document.title = emoji + ' · what3emojis map'
}
