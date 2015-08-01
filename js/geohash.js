if (!String.fromCodePoint) {
/*! http://mths.be/fromcodepoint v0.2.1 by @mathias */
  (function() {
    var defineProperty = (function() {
      // IE 8 only supports `Object.defineProperty` on DOM elements
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch(error) {}
      return result;
    }());
    var stringFromCharCode = String.fromCharCode;
    var floor = Math.floor;
    var fromCodePoint = function(_) {
      var MAX_SIZE = 0x4000;
      var codeUnits = [];
      var highSurrogate;
      var lowSurrogate;
      var index = -1;
      var length = arguments.length;
      if (!length) {
        return '';
      }
      var result = '';
      while (++index < length) {
        var codePoint = Number(arguments[index]);
        if (
          !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
          codePoint < 0 || // not a valid Unicode code point
          codePoint > 0x10FFFF || // not a valid Unicode code point
          floor(codePoint) != codePoint // not an integer
        ) {
          throw RangeError('Invalid code point: ' + codePoint);
        }
        if (codePoint <= 0xFFFF) { // BMP code point
          codeUnits.push(codePoint);
        } else { // Astral code point; split in surrogate halves
          // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          codePoint -= 0x10000;
          highSurrogate = (codePoint >> 10) + 0xD800;
          lowSurrogate = (codePoint % 0x400) + 0xDC00;
          codeUnits.push(highSurrogate, lowSurrogate);
        }
        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
          result += stringFromCharCode.apply(null, codeUnits);
          codeUnits.length = 0;
        }
      }
      return result;
    };
    if (defineProperty) {
      defineProperty(String, 'fromCodePoint', {
        'value': fromCodePoint,
        'configurable': true,
        'writable': true
      });
    } else {
      String.fromCodePoint = fromCodePoint;
    }
  }());
}

// reference emoji
var emojiAt = function (order, block) {
  // emoji blocks, in order, with start, missing blocks, and symbol length
  var emojiBlocks = {
    "Miscellaneous Symbols and Pictographs": {
     count: 766,
     start: 0x1F300,
     missing: [0x1F57A, 0x1F5A4]
     },
     "Emoticons": {
     count: 80,
     start: 0x1F600,
     missing: []
     },
     "Transport and Map Symbols": {
     count: 98,
     start: 0x1F680,
     missing: [0x1F6D1,0x1F6D2,0x1F6D3,0x1F6D4,0x1F6D5,0x1F6D6,0x1F6D7,0x1F6D8,0x1F6D9,0x1F6DA,0x1F6DB,0x1F6DC,0x1F6DD,0x1F6DE,0x1F6DF,0x1F6ED,0x1F6EE,0x1F6EF,0x1F6F4,0x1F6F5,0x1F6F6,0x1F6F7,0x1F6F8,0x1F6F9,0x1F6FA,0x1F6FB,0x1F6FC,0x1F6FD,0x1F6FE,0x1F6FF]
     },
     "Supplemental Symbols and Pictographs": {
     count: 15,
     start: 0x1F910,
     missing: [
0x1F919,0x1F91A,0x1F91B,0x1F91C,0x1F91D,0x1F91E,0x1F91F,0x1F920,0x1F921,0x1F922,0x1F923,0x1F924,0x1F925,0x1F926,0x1F927,0x1F928,0x1F929,0x1F92A,0x1F92B,0x1F92C,0x1F92D,0x1F92E,0x1F92F,0x1F930,0x1F931,0x1F932,0x1F933,0x1F934,0x1F935,0x1F936,0x1F937,0x1F938,0x1F939,0x1F93A,0x1F93B,0x1F93C,0x1F93D,0x1F93E,0x1F93F,0x1F940,0x1F941,0x1F942,0x1F943,0x1F944,0x1F945,0x1F946,0x1F947,0x1F948,0x1F949,0x1F94A,0x1F94B,0x1F94C,0x1F94D,0x1F94E,0x1F94F,0x1F950,0x1F951,0x1F952,0x1F953,0x1F954,0x1F955,0x1F956,0x1F957,0x1F958,0x1F959,0x1F95A,0x1F95B,0x1F95C,0x1F95D,0x1F95E,0x1F95F,0x1F960,0x1F961,0x1F962,0x1F963,0x1F964,0x1F965,0x1F966,0x1F967,0x1F968,0x1F969,0x1F96A,0x1F96B,0x1F96C,0x1F96D,0x1F96E,0x1F96F,0x1F970,0x1F971,0x1F972,0x1F973,0x1F974,0x1F975,0x1F976,0x1F977,0x1F978,0x1F979,0x1F97A,0x1F97B,0x1F97C,0x1F97D,0x1F97E,0x1F97F,0x1F985,0x1F986,0x1F987,0x1F988,0x1F989,0x1F98A,0x1F98B,0x1F98C,0x1F98D,0x1F98E,0x1F98F,0x1F990,0x1F991,0x1F992,0x1F993,0x1F994,0x1F995,0x1F996,0x1F997,0x1F998,0x1F999,0x1F99A,0x1F99B,0x1F99C,0x1F99D,0x1F99E,0x1F99F,0x1F9A0,0x1F9A1,0x1F9A2,0x1F9A3,0x1F9A4,0x1F9A5,0x1F9A6,0x1F9A7,0x1F9A8,0x1F9A9,0x1F9AA,0x1F9AB,0x1F9AC,0x1F9AD,0x1F9AE,0x1F9AF,0x1F9B0,0x1F9B1,0x1F9B2,0x1F9B3,0x1F9B4,0x1F9B5,0x1F9B6,0x1F9B7,0x1F9B8,0x1F9B9,0x1F9BA,0x1F9BB,0x1F9BC,0x1F9BD,0x1F9BE,0x1F9BF
     ]
     }
  };

  if (!block || !emojiBlocks[block]) {
    // determine overall Unicode order
    var bs = Object.keys(emojiBlocks);
    for (var b = 0; b < bs.length; b++) {
    if (order < emojiBlocks[bs[b]].count) {
      return emojiAt(order, bs[b]);
    } else {
      order -= emojiBlocks[bs[b]].count;
    }
    }
  } else {
    // get nth valid character within block
    var nth = emojiBlocks[block].start + order;
    for (var m = 0; m < emojiBlocks[block].missing.length; m++) {
    if (emojiBlocks[block].missing[m] <= nth) {
      nth++;
    } else {
      break;
    }
    }
    return String.fromCodePoint(nth);
  }
};

var coordAt = function(lat, lng, precision) {
  // emoji grid reference
  var emojiHeight = 30;
  var emojiWidth = 30;
  
  var substitutes = {};
  // love hotel replaced by walking person
  substitutes[String.fromCodePoint(127977)] = String.fromCodePoint(0x1F6B6);
  // pile of poo replaced by no-walking sign
  substitutes[String.fromCodePoint(128169)] = String.fromCodePoint(0x1F6B7);

  precision = precision || 3;
  var hash = "";
  var north = 90.0;
  var south = -90.0;
  var east = 180.0;
  var west = -180.0;

  for (var i = 0; i < precision; i++) {
    var latRatio = ((lat - south) / (north - south));
    var lngRatio = ((lng - west) / (east - west));
    var latRow = Math.floor(latRatio * emojiHeight);
    var lngColumn = Math.floor(lngRatio * emojiWidth);
    // console.log("zoom " + (i+1) + ": at " + (latRow+1) + "th row, " + (lngColumn+1) + "th column");

    // add appropriate emoji to hash
    var newc = emojiAt(emojiWidth * latRow + lngColumn);
    if (substitutes[newc]) {
      newc = substitutes[newc];
    }
    hash += newc;

    // calculate next box of the grid
    var gridHeight = (north - south) / emojiHeight;
    var gridWidth = (east - west) / emojiWidth;
    south += gridHeight * latRow;
    north = south + gridHeight;
    west += gridWidth * lngColumn;
    east = west + gridWidth;
  }
  return hash;
};
/*
if (process.argv.length < 4) {
  console.log("use syntax: node geohash.js LATITUDE LONGITUDE"); 
} else {
  // retrieve arguments
  var lat = process.argv[2] * 1;
  var lng = process.argv[3] * 1;
  if (isNaN(lat) || isNaN(lng)) {
    return console.log("use syntax: node geohash.js LATITUDE LONGITUDE"); 
  }
  
  console.log( coordAt( lat, lng ) );
}
*/
if (typeof exports !== "undefined") {
  exports.emojiAt = emojiAt;
  exports.coordAt = coordAt;
}