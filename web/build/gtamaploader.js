/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/gtamaploader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/gtamaploader.js":
/*!***********************************!*\
  !*** ./assets/js/gtamaploader.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

window.map;
window.isMobile = window.innerWidth < 721 ? true : false;
var currentMarker;
var siteURL = window.location.href + "assets/images/";

var bounds = {
    3: 2,
    4: 5,
    5: 10,
    6: 21,
    7: 42
};

function getNormalizedCoord(coord, zoom) {
    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
        return null;
    }

    // repeat across x-axis
    if (x < 0 || x >= tileRange) {
        x = (x % tileRange + tileRange) % tileRange;
    }

    return {
        x: x,
        y: y
    };
}

function initMap() {
    console.log('a');
    var mapAtlasOptions = {
        getTileUrl: function getTileUrl(coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (!normalizedCoord || normalizedCoord.x > bounds[zoom] || normalizedCoord.y > bounds[zoom]) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return siteURL + 'Tiles_ATLAS/' + zoom + '-' + normalizedCoord.x + '_' + normalizedCoord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 7,
        minZoom: 3,
        name: 'Atlas'
    };

    var mapSatelliteOptions = {
        getTileUrl: function getTileUrl(coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (!normalizedCoord || normalizedCoord.x > bounds[zoom] || normalizedCoord.y > bounds[zoom]) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return siteURL + 'Tiles_SAT/' + zoom + '-' + coord.x + '_' + coord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 7,
        minZoom: 3,
        name: 'Satellite'
    };

    var mapRoadOptions = {
        getTileUrl: function getTileUrl(coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (!normalizedCoord || normalizedCoord.x > bounds[zoom] || normalizedCoord.y > bounds[zoom]) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            console.log(siteURL + 'Tiles_ROAD/' + zoom + '-' + coord.x + '_' + coord.y + '.png');
            return siteURL + 'Tiles_ROAD/' + zoom + '-' + coord.x + '_' + coord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 7,
        minZoom: 3,
        name: 'Road'
    };

    var overlayNames = new google.maps.ImageMapType({
        getTileUrl: function getTileUrl(coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (!normalizedCoord) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return siteURL + 'Tiles_Streets/' + zoom + '-' + coord.x + '_' + coord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256)
    });

    var mapAtlas = new google.maps.ImageMapType(mapAtlasOptions);
    var mapSatellite = new google.maps.ImageMapType(mapSatelliteOptions);
    var mapRoad = new google.maps.ImageMapType(mapRoadOptions);

    var centerCoords = new google.maps.LatLng(window.startLat || 66.722541, window.startLng || -140.625000);
    var mapOptions = {
        backgroundColor: '#0fa8d2',
        center: centerCoords,
        zoom: parseInt(window.startZoom) || 4,
        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ['Atlas', 'Satellite', 'Road']
        }
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    map.mapTypes.set('Atlas', mapAtlas);
    map.mapTypes.set('Satellite', mapSatellite);
    map.mapTypes.set('Road', mapRoad);
    map.setMapTypeId('Atlas');

    map.overlayMapTypes.push(overlayNames);

    google.maps.event.addListener(map, 'maptypeid_changed', function () {
        var type = map.getMapTypeId();
        switch (type) {
            case 'Atlas':
                document.getElementById('map').firstElementChild.style.backgroundColor = '#0fa8d2';
                break;
            case 'Satellite':
                document.getElementById('map').firstElementChild.style.backgroundColor = '#143d6b';
                break;
            case 'Road':
                document.getElementById('map').firstElementChild.style.backgroundColor = '#1862ad';
                break;
        }
    });
}

window.initMap = initMap;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzYwOWJkMGMzYTRmMWI4NjYzNTMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2d0YW1hcGxvYWRlci5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJtYXAiLCJpc01vYmlsZSIsImlubmVyV2lkdGgiLCJjdXJyZW50TWFya2VyIiwic2l0ZVVSTCIsImxvY2F0aW9uIiwiaHJlZiIsImJvdW5kcyIsImdldE5vcm1hbGl6ZWRDb29yZCIsImNvb3JkIiwiem9vbSIsInkiLCJ4IiwidGlsZVJhbmdlIiwiaW5pdE1hcCIsImNvbnNvbGUiLCJsb2ciLCJtYXBBdGxhc09wdGlvbnMiLCJnZXRUaWxlVXJsIiwibm9ybWFsaXplZENvb3JkIiwiYm91bmQiLCJNYXRoIiwicG93IiwidGlsZVNpemUiLCJnb29nbGUiLCJtYXBzIiwiU2l6ZSIsIm1heFpvb20iLCJtaW5ab29tIiwibmFtZSIsIm1hcFNhdGVsbGl0ZU9wdGlvbnMiLCJtYXBSb2FkT3B0aW9ucyIsIm92ZXJsYXlOYW1lcyIsIkltYWdlTWFwVHlwZSIsIm1hcEF0bGFzIiwibWFwU2F0ZWxsaXRlIiwibWFwUm9hZCIsImNlbnRlckNvb3JkcyIsIkxhdExuZyIsInN0YXJ0TGF0Iiwic3RhcnRMbmciLCJtYXBPcHRpb25zIiwiYmFja2dyb3VuZENvbG9yIiwiY2VudGVyIiwicGFyc2VJbnQiLCJzdGFydFpvb20iLCJzdHJlZXRWaWV3Q29udHJvbCIsIm1hcFR5cGVDb250cm9sT3B0aW9ucyIsIm1hcFR5cGVJZHMiLCJNYXAiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibWFwVHlwZXMiLCJzZXQiLCJzZXRNYXBUeXBlSWQiLCJvdmVybGF5TWFwVHlwZXMiLCJwdXNoIiwiZXZlbnQiLCJhZGRMaXN0ZW5lciIsInR5cGUiLCJnZXRNYXBUeXBlSWQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsInN0eWxlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNB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eEIsRUFBK0JVLGlCQUEvQixDQUFpREMsS0FBakQsQ0FBdURwQixlQUF2RCxHQUF5RSxTQUF6RTtBQUNBO0FBVFI7QUFXSCxLQWJEO0FBY0g7O0FBRUQzQyxPQUFPZSxPQUFQLEdBQWlCQSxPQUFqQixDIiwiZmlsZSI6Imd0YW1hcGxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL2pzL2d0YW1hcGxvYWRlci5qc1wiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjNjA5YmQwYzNhNGYxYjg2NjM1MyIsIndpbmRvdy5tYXA7XG53aW5kb3cuaXNNb2JpbGUgPSB3aW5kb3cuaW5uZXJXaWR0aCA8IDcyMSA/IHRydWUgOiBmYWxzZTtcbnZhciBjdXJyZW50TWFya2VyO1xudmFyIHNpdGVVUkwgPSB3aW5kb3cubG9jYXRpb24uaHJlZitcImFzc2V0cy9pbWFnZXMvXCI7XG5cbnZhciBib3VuZHMgPSB7XG4gICAgMzogMixcbiAgICA0OiA1LFxuICAgIDU6IDEwLFxuICAgIDY6IDIxLFxuICAgIDc6IDQyXG59O1xuXG5mdW5jdGlvbiBnZXROb3JtYWxpemVkQ29vcmQoY29vcmQsIHpvb20pIHtcbiAgICB2YXIgeSA9IGNvb3JkLnk7XG4gICAgdmFyIHggPSBjb29yZC54O1xuXG4gICAgLy8gdGlsZSByYW5nZSBpbiBvbmUgZGlyZWN0aW9uIHJhbmdlIGlzIGRlcGVuZGVudCBvbiB6b29tIGxldmVsXG4gICAgLy8gMCA9IDEgdGlsZSwgMSA9IDIgdGlsZXMsIDIgPSA0IHRpbGVzLCAzID0gOCB0aWxlcywgZXRjXG4gICAgdmFyIHRpbGVSYW5nZSA9IDEgPDwgem9vbTtcblxuICAgIC8vIGRvbid0IHJlcGVhdCBhY3Jvc3MgeS1heGlzICh2ZXJ0aWNhbGx5KVxuICAgIGlmICh5IDwgMCB8fCB5ID49IHRpbGVSYW5nZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyByZXBlYXQgYWNyb3NzIHgtYXhpc1xuICAgIGlmICh4IDwgMCB8fCB4ID49IHRpbGVSYW5nZSkge1xuICAgICAgICB4ID0gKHggJSB0aWxlUmFuZ2UgKyB0aWxlUmFuZ2UpICUgdGlsZVJhbmdlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHlcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBpbml0TWFwKCkge1xuICAgIGNvbnNvbGUubG9nKCdhJyk7XG4gICAgdmFyIG1hcEF0bGFzT3B0aW9ucyA9IHtcbiAgICAgICAgZ2V0VGlsZVVybDogZnVuY3Rpb24gKGNvb3JkLCB6b29tKSB7XG4gICAgICAgICAgICB2YXIgbm9ybWFsaXplZENvb3JkID0gZ2V0Tm9ybWFsaXplZENvb3JkKGNvb3JkLCB6b29tKTtcbiAgICAgICAgICAgIGlmICghbm9ybWFsaXplZENvb3JkIHx8IG5vcm1hbGl6ZWRDb29yZC54ID4gYm91bmRzW3pvb21dIHx8IG5vcm1hbGl6ZWRDb29yZC55ID4gYm91bmRzW3pvb21dKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYm91bmQgPSBNYXRoLnBvdygyLCB6b29tKTtcbiAgICAgICAgICAgIHJldHVybiBzaXRlVVJMICsgJ1RpbGVzX0FUTEFTLycgKyB6b29tICsgJy0nICsgbm9ybWFsaXplZENvb3JkLnggKyAnXycgKyBub3JtYWxpemVkQ29vcmQueSArICcucG5nJztcbiAgICAgICAgfSxcbiAgICAgICAgdGlsZVNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDI1NiwgMjU2KSxcbiAgICAgICAgbWF4Wm9vbTogNyxcbiAgICAgICAgbWluWm9vbTogMyxcbiAgICAgICAgbmFtZTogJ0F0bGFzJ1xuICAgIH07XG5cbiAgICB2YXIgbWFwU2F0ZWxsaXRlT3B0aW9ucyA9IHtcbiAgICAgICAgZ2V0VGlsZVVybDogZnVuY3Rpb24gKGNvb3JkLCB6b29tKSB7XG4gICAgICAgICAgICB2YXIgbm9ybWFsaXplZENvb3JkID0gZ2V0Tm9ybWFsaXplZENvb3JkKGNvb3JkLCB6b29tKTtcbiAgICAgICAgICAgIGlmICghbm9ybWFsaXplZENvb3JkIHx8IG5vcm1hbGl6ZWRDb29yZC54ID4gYm91bmRzW3pvb21dIHx8IG5vcm1hbGl6ZWRDb29yZC55ID4gYm91bmRzW3pvb21dKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYm91bmQgPSBNYXRoLnBvdygyLCB6b29tKTtcbiAgICAgICAgICAgIHJldHVybiBzaXRlVVJMICsgJ1RpbGVzX1NBVC8nICsgem9vbSArICctJyArIGNvb3JkLnggKyAnXycgKyBjb29yZC55ICsgJy5wbmcnO1xuICAgICAgICB9LFxuICAgICAgICB0aWxlU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMjU2LCAyNTYpLFxuICAgICAgICBtYXhab29tOiA3LFxuICAgICAgICBtaW5ab29tOiAzLFxuICAgICAgICBuYW1lOiAnU2F0ZWxsaXRlJ1xuICAgIH07XG5cbiAgICB2YXIgbWFwUm9hZE9wdGlvbnMgPSB7XG4gICAgICAgIGdldFRpbGVVcmw6IGZ1bmN0aW9uIChjb29yZCwgem9vbSkge1xuICAgICAgICAgICAgdmFyIG5vcm1hbGl6ZWRDb29yZCA9IGdldE5vcm1hbGl6ZWRDb29yZChjb29yZCwgem9vbSk7XG4gICAgICAgICAgICBpZiAoIW5vcm1hbGl6ZWRDb29yZCB8fCBub3JtYWxpemVkQ29vcmQueCA+IGJvdW5kc1t6b29tXSB8fCBub3JtYWxpemVkQ29vcmQueSA+IGJvdW5kc1t6b29tXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGJvdW5kID0gTWF0aC5wb3coMiwgem9vbSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzaXRlVVJMICsgJ1RpbGVzX1JPQUQvJyArIHpvb20gKyAnLScgKyBjb29yZC54ICsgJ18nICsgY29vcmQueSArICcucG5nJyk7XG4gICAgICAgICAgICByZXR1cm4gc2l0ZVVSTCArICdUaWxlc19ST0FELycgKyB6b29tICsgJy0nICsgY29vcmQueCArICdfJyArIGNvb3JkLnkgKyAnLnBuZyc7XG4gICAgICAgIH0sXG4gICAgICAgIHRpbGVTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgyNTYsIDI1NiksXG4gICAgICAgIG1heFpvb206IDcsXG4gICAgICAgIG1pblpvb206IDMsXG4gICAgICAgIG5hbWU6ICdSb2FkJ1xuICAgIH07XG5cbiAgICB2YXIgb3ZlcmxheU5hbWVzID0gbmV3IGdvb2dsZS5tYXBzLkltYWdlTWFwVHlwZSh7XG4gICAgICAgIGdldFRpbGVVcmw6IGZ1bmN0aW9uIChjb29yZCwgem9vbSkge1xuICAgICAgICAgICAgdmFyIG5vcm1hbGl6ZWRDb29yZCA9IGdldE5vcm1hbGl6ZWRDb29yZChjb29yZCwgem9vbSk7XG4gICAgICAgICAgICBpZiAoIW5vcm1hbGl6ZWRDb29yZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGJvdW5kID0gTWF0aC5wb3coMiwgem9vbSk7XG4gICAgICAgICAgICByZXR1cm4gc2l0ZVVSTCArICdUaWxlc19TdHJlZXRzLycgKyB6b29tICsgJy0nICsgY29vcmQueCArICdfJyArIGNvb3JkLnkgKyAnLnBuZyc7XG4gICAgICAgIH0sXG4gICAgICAgIHRpbGVTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgyNTYsIDI1NilcbiAgICB9KTtcblxuICAgIHZhciBtYXBBdGxhcyA9IG5ldyBnb29nbGUubWFwcy5JbWFnZU1hcFR5cGUobWFwQXRsYXNPcHRpb25zKTtcbiAgICB2YXIgbWFwU2F0ZWxsaXRlID0gbmV3IGdvb2dsZS5tYXBzLkltYWdlTWFwVHlwZShtYXBTYXRlbGxpdGVPcHRpb25zKTtcbiAgICB2YXIgbWFwUm9hZCA9IG5ldyBnb29nbGUubWFwcy5JbWFnZU1hcFR5cGUobWFwUm9hZE9wdGlvbnMpO1xuXG4gICAgdmFyIGNlbnRlckNvb3JkcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcod2luZG93LnN0YXJ0TGF0IHx8IDY2LjcyMjU0MSwgd2luZG93LnN0YXJ0TG5nIHx8IC0xNDAuNjI1MDAwKTtcbiAgICB2YXIgbWFwT3B0aW9ucyA9IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzBmYThkMicsXG4gICAgICAgIGNlbnRlcjogY2VudGVyQ29vcmRzLFxuICAgICAgICB6b29tOiBwYXJzZUludCh3aW5kb3cuc3RhcnRab29tKSB8fCA0LFxuICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXG4gICAgICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xuICAgICAgICAgICAgbWFwVHlwZUlkczogWydBdGxhcycsICdTYXRlbGxpdGUnLCAnUm9hZCddXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIG1hcE9wdGlvbnMpO1xuICAgIG1hcC5tYXBUeXBlcy5zZXQoJ0F0bGFzJywgbWFwQXRsYXMpO1xuICAgIG1hcC5tYXBUeXBlcy5zZXQoJ1NhdGVsbGl0ZScsIG1hcFNhdGVsbGl0ZSk7XG4gICAgbWFwLm1hcFR5cGVzLnNldCgnUm9hZCcsIG1hcFJvYWQpO1xuICAgIG1hcC5zZXRNYXBUeXBlSWQoJ0F0bGFzJyk7XG5cbiAgICBtYXAub3ZlcmxheU1hcFR5cGVzLnB1c2gob3ZlcmxheU5hbWVzKTtcblxuXG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFwLCAnbWFwdHlwZWlkX2NoYW5nZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0eXBlID0gbWFwLmdldE1hcFR5cGVJZCgpO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0F0bGFzJzpcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJykuZmlyc3RFbGVtZW50Q2hpbGQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMwZmE4ZDInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnU2F0ZWxsaXRlJzpcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJykuZmlyc3RFbGVtZW50Q2hpbGQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMxNDNkNmInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnUm9hZCc6XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLmZpcnN0RWxlbWVudENoaWxkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMTg2MmFkJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG53aW5kb3cuaW5pdE1hcCA9IGluaXRNYXA7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2pzL2d0YW1hcGxvYWRlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=