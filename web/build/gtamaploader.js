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

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(60, -140),
        map: map,
        icon: siteURL + 'blip_1.png'
    });
}

window.initMap = initMap;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjAzM2U5NmJkZDk1Yzc2ZWRmNDgiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2d0YW1hcGxvYWRlci5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJtYXAiLCJpc01vYmlsZSIsImlubmVyV2lkdGgiLCJzaXRlVVJMIiwibG9jYXRpb24iLCJocmVmIiwiYm91bmRzIiwiZ2V0Tm9ybWFsaXplZENvb3JkIiwiY29vcmQiLCJ6b29tIiwieSIsIngiLCJ0aWxlUmFuZ2UiLCJpbml0TWFwIiwibWFwQXRsYXNPcHRpb25zIiwiZ2V0VGlsZVVybCIsIm5vcm1hbGl6ZWRDb29yZCIsImJvdW5kIiwiTWF0aCIsInBvdyIsInRpbGVTaXplIiwiZ29vZ2xlIiwibWFwcyIsIlNpemUiLCJtYXhab29tIiwibWluWm9vbSIsIm5hbWUiLCJtYXBTYXRlbGxpdGVPcHRpb25zIiwibWFwUm9hZE9wdGlvbnMiLCJvdmVybGF5TmFtZXMiLCJJbWFnZU1hcFR5cGUiLCJtYXBBdGxhcyIsIm1hcFNhdGVsbGl0ZSIsIm1hcFJvYWQiLCJjZW50ZXJDb29yZHMiLCJMYXRMbmciLCJzdGFydExhdCIsInN0YXJ0TG5nIiwibWFwT3B0aW9ucyIsImJhY2tncm91bmRDb2xvciIsImNlbnRlciIsInBhcnNlSW50Iiwic3RhcnRab29tIiwic3RyZWV0Vmlld0NvbnRyb2wiLCJtYXBUeXBlQ29udHJvbE9wdGlvbnMiLCJtYXBUeXBlSWRzIiwiTWFwIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm1hcFR5cGVzIiwic2V0Iiwic2V0TWFwVHlwZUlkIiwib3ZlcmxheU1hcFR5cGVzIiwicHVzaCIsImV2ZW50IiwiYWRkTGlzdGVuZXIiLCJ0eXBlIiwiZ2V0TWFwVHlwZUlkIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJzdHlsZSIsIm1hcmtlciIsIk1hcmtlciIsInBvc2l0aW9uIiwiaWNvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7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LENBQVlhLE1BQWhCLENBQXVCLEVBQXZCLEVBQTJCLENBQUMsR0FBNUIsQ0FEc0I7QUFFaENuQyxhQUFLQSxHQUYyQjtBQUdoQytELGNBQU01RCxVQUFVO0FBSGdCLEtBQXZCLENBQWI7QUFLSDs7QUFFREosT0FBT2MsT0FBUCxHQUFpQkEsT0FBakIsQyIsImZpbGUiOiJndGFtYXBsb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9qcy9ndGFtYXBsb2FkZXIuanNcIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjAzM2U5NmJkZDk1Yzc2ZWRmNDgiLCJ3aW5kb3cubWFwO1xud2luZG93LmlzTW9iaWxlID0gd2luZG93LmlubmVyV2lkdGggPCA3MjEgPyB0cnVlIDogZmFsc2U7XG52YXIgc2l0ZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmK1wiYXNzZXRzL2ltYWdlcy9cIjtcblxudmFyIGJvdW5kcyA9IHtcbiAgICAzOiAyLFxuICAgIDQ6IDUsXG4gICAgNTogMTAsXG4gICAgNjogMjEsXG4gICAgNzogNDJcbn07XG5cbmZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRDb29yZChjb29yZCwgem9vbSkge1xuICAgIHZhciB5ID0gY29vcmQueTtcbiAgICB2YXIgeCA9IGNvb3JkLng7XG5cbiAgICAvLyB0aWxlIHJhbmdlIGluIG9uZSBkaXJlY3Rpb24gcmFuZ2UgaXMgZGVwZW5kZW50IG9uIHpvb20gbGV2ZWxcbiAgICAvLyAwID0gMSB0aWxlLCAxID0gMiB0aWxlcywgMiA9IDQgdGlsZXMsIDMgPSA4IHRpbGVzLCBldGNcbiAgICB2YXIgdGlsZVJhbmdlID0gMSA8PCB6b29tO1xuXG4gICAgLy8gZG9uJ3QgcmVwZWF0IGFjcm9zcyB5LWF4aXMgKHZlcnRpY2FsbHkpXG4gICAgaWYgKHkgPCAwIHx8IHkgPj0gdGlsZVJhbmdlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHJlcGVhdCBhY3Jvc3MgeC1heGlzXG4gICAgaWYgKHggPCAwIHx8IHggPj0gdGlsZVJhbmdlKSB7XG4gICAgICAgIHggPSAoeCAlIHRpbGVSYW5nZSArIHRpbGVSYW5nZSkgJSB0aWxlUmFuZ2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGluaXRNYXAoKSB7XG4gICAgdmFyIG1hcEF0bGFzT3B0aW9ucyA9IHtcbiAgICAgICAgZ2V0VGlsZVVybDogZnVuY3Rpb24gKGNvb3JkLCB6b29tKSB7XG4gICAgICAgICAgICB2YXIgbm9ybWFsaXplZENvb3JkID0gZ2V0Tm9ybWFsaXplZENvb3JkKGNvb3JkLCB6b29tKTtcbiAgICAgICAgICAgIGlmICghbm9ybWFsaXplZENvb3JkIHx8IG5vcm1hbGl6ZWRDb29yZC54ID4gYm91bmRzW3pvb21dIHx8IG5vcm1hbGl6ZWRDb29yZC55ID4gYm91bmRzW3pvb21dKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYm91bmQgPSBNYXRoLnBvdygyLCB6b29tKTtcbiAgICAgICAgICAgIHJldHVybiBzaXRlVVJMICsgJ1RpbGVzX0FUTEFTLycgKyB6b29tICsgJy0nICsgbm9ybWFsaXplZENvb3JkLnggKyAnXycgKyBub3JtYWxpemVkQ29vcmQueSArICcucG5nJztcbiAgICAgICAgfSxcbiAgICAgICAgdGlsZVNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDI1NiwgMjU2KSxcbiAgICAgICAgbWF4Wm9vbTogNyxcbiAgICAgICAgbWluWm9vbTogMyxcbiAgICAgICAgbmFtZTogJ0F0bGFzJ1xuICAgIH07XG5cbiAgICB2YXIgbWFwU2F0ZWxsaXRlT3B0aW9ucyA9IHtcbiAgICAgICAgZ2V0VGlsZVVybDogZnVuY3Rpb24gKGNvb3JkLCB6b29tKSB7XG4gICAgICAgICAgICB2YXIgbm9ybWFsaXplZENvb3JkID0gZ2V0Tm9ybWFsaXplZENvb3JkKGNvb3JkLCB6b29tKTtcbiAgICAgICAgICAgIGlmICghbm9ybWFsaXplZENvb3JkIHx8IG5vcm1hbGl6ZWRDb29yZC54ID4gYm91bmRzW3pvb21dIHx8IG5vcm1hbGl6ZWRDb29yZC55ID4gYm91bmRzW3pvb21dKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYm91bmQgPSBNYXRoLnBvdygyLCB6b29tKTtcbiAgICAgICAgICAgIHJldHVybiBzaXRlVVJMICsgJ1RpbGVzX1NBVC8nICsgem9vbSArICctJyArIGNvb3JkLnggKyAnXycgKyBjb29yZC55ICsgJy5wbmcnO1xuICAgICAgICB9LFxuICAgICAgICB0aWxlU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMjU2LCAyNTYpLFxuICAgICAgICBtYXhab29tOiA3LFxuICAgICAgICBtaW5ab29tOiAzLFxuICAgICAgICBuYW1lOiAnU2F0ZWxsaXRlJ1xuICAgIH07XG5cbiAgICB2YXIgbWFwUm9hZE9wdGlvbnMgPSB7XG4gICAgICAgIGdldFRpbGVVcmw6IGZ1bmN0aW9uIChjb29yZCwgem9vbSkge1xuICAgICAgICAgICAgdmFyIG5vcm1hbGl6ZWRDb29yZCA9IGdldE5vcm1hbGl6ZWRDb29yZChjb29yZCwgem9vbSk7XG4gICAgICAgICAgICBpZiAoIW5vcm1hbGl6ZWRDb29yZCB8fCBub3JtYWxpemVkQ29vcmQueCA+IGJvdW5kc1t6b29tXSB8fCBub3JtYWxpemVkQ29vcmQueSA+IGJvdW5kc1t6b29tXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGJvdW5kID0gTWF0aC5wb3coMiwgem9vbSk7XG4gICAgICAgICAgICByZXR1cm4gc2l0ZVVSTCArICdUaWxlc19ST0FELycgKyB6b29tICsgJy0nICsgY29vcmQueCArICdfJyArIGNvb3JkLnkgKyAnLnBuZyc7XG4gICAgICAgIH0sXG4gICAgICAgIHRpbGVTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgyNTYsIDI1NiksXG4gICAgICAgIG1heFpvb206IDcsXG4gICAgICAgIG1pblpvb206IDMsXG4gICAgICAgIG5hbWU6ICdSb2FkJ1xuICAgIH07XG5cbiAgICB2YXIgb3ZlcmxheU5hbWVzID0gbmV3IGdvb2dsZS5tYXBzLkltYWdlTWFwVHlwZSh7XG4gICAgICAgIGdldFRpbGVVcmw6IGZ1bmN0aW9uIChjb29yZCwgem9vbSkge1xuICAgICAgICAgICAgdmFyIG5vcm1hbGl6ZWRDb29yZCA9IGdldE5vcm1hbGl6ZWRDb29yZChjb29yZCwgem9vbSk7XG4gICAgICAgICAgICBpZiAoIW5vcm1hbGl6ZWRDb29yZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGJvdW5kID0gTWF0aC5wb3coMiwgem9vbSk7XG4gICAgICAgICAgICByZXR1cm4gc2l0ZVVSTCArICdUaWxlc19TdHJlZXRzLycgKyB6b29tICsgJy0nICsgY29vcmQueCArICdfJyArIGNvb3JkLnkgKyAnLnBuZyc7XG4gICAgICAgIH0sXG4gICAgICAgIHRpbGVTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgyNTYsIDI1NilcbiAgICB9KTtcblxuICAgIHZhciBtYXBBdGxhcyA9IG5ldyBnb29nbGUubWFwcy5JbWFnZU1hcFR5cGUobWFwQXRsYXNPcHRpb25zKTtcbiAgICB2YXIgbWFwU2F0ZWxsaXRlID0gbmV3IGdvb2dsZS5tYXBzLkltYWdlTWFwVHlwZShtYXBTYXRlbGxpdGVPcHRpb25zKTtcbiAgICB2YXIgbWFwUm9hZCA9IG5ldyBnb29nbGUubWFwcy5JbWFnZU1hcFR5cGUobWFwUm9hZE9wdGlvbnMpO1xuXG4gICAgdmFyIGNlbnRlckNvb3JkcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcod2luZG93LnN0YXJ0TGF0IHx8IDY2LjcyMjU0MSwgd2luZG93LnN0YXJ0TG5nIHx8IC0xNDAuNjI1MDAwKTtcbiAgICB2YXIgbWFwT3B0aW9ucyA9IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzBmYThkMicsXG4gICAgICAgIGNlbnRlcjogY2VudGVyQ29vcmRzLFxuICAgICAgICB6b29tOiBwYXJzZUludCh3aW5kb3cuc3RhcnRab29tKSB8fCA0LFxuICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXG4gICAgICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xuICAgICAgICAgICAgbWFwVHlwZUlkczogWydBdGxhcycsICdTYXRlbGxpdGUnLCAnUm9hZCddXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIG1hcE9wdGlvbnMpO1xuICAgIG1hcC5tYXBUeXBlcy5zZXQoJ0F0bGFzJywgbWFwQXRsYXMpO1xuICAgIG1hcC5tYXBUeXBlcy5zZXQoJ1NhdGVsbGl0ZScsIG1hcFNhdGVsbGl0ZSk7XG4gICAgbWFwLm1hcFR5cGVzLnNldCgnUm9hZCcsIG1hcFJvYWQpO1xuICAgIG1hcC5zZXRNYXBUeXBlSWQoJ0F0bGFzJyk7XG5cbiAgICBtYXAub3ZlcmxheU1hcFR5cGVzLnB1c2gob3ZlcmxheU5hbWVzKTtcblxuXG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFwLCAnbWFwdHlwZWlkX2NoYW5nZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0eXBlID0gbWFwLmdldE1hcFR5cGVJZCgpO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0F0bGFzJzpcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJykuZmlyc3RFbGVtZW50Q2hpbGQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMwZmE4ZDInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnU2F0ZWxsaXRlJzpcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJykuZmlyc3RFbGVtZW50Q2hpbGQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMxNDNkNmInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnUm9hZCc6XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLmZpcnN0RWxlbWVudENoaWxkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMTg2MmFkJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg2MCwgLTE0MCksXG4gICAgICAgIG1hcDogbWFwLFxuICAgICAgICBpY29uOiBzaXRlVVJMICsgJ2JsaXBfMS5wbmcnXG4gICAgfSk7XG59XG5cbndpbmRvdy5pbml0TWFwID0gaW5pdE1hcDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvanMvZ3RhbWFwbG9hZGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==