window.map;
window.isMobile = window.innerWidth < 721 ? true : false;
var siteURL = window.location.href;

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
        getTileUrl: function (coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (!normalizedCoord || normalizedCoord.x > bounds[zoom] || normalizedCoord.y > bounds[zoom]) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return siteURL + 'assets/images/Tiles_ATLAS/' + zoom + '-' + normalizedCoord.x + '_' + normalizedCoord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 7,
        minZoom: 3,
        name: 'Atlas'
    };

    var mapSatelliteOptions = {
        getTileUrl: function (coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (!normalizedCoord || normalizedCoord.x > bounds[zoom] || normalizedCoord.y > bounds[zoom]) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return siteURL + 'assets/images/Tiles_SAT/' + zoom + '-' + coord.x + '_' + coord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 7,
        minZoom: 3,
        name: 'Satellite'
    };

    var mapRoadOptions = {
        getTileUrl: function (coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (!normalizedCoord || normalizedCoord.x > bounds[zoom] || normalizedCoord.y > bounds[zoom]) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return siteURL + 'assets/images/Tiles_ROAD/' + zoom + '-' + coord.x + '_' + coord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 7,
        minZoom: 3,
        name: 'Road'
    };

    var overlayNames = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (!normalizedCoord) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return siteURL + 'assets/images/Tiles_Streets/' + zoom + '-' + coord.x + '_' + coord.y + '.png';
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
    addMarkers();
}

function addMarkers() {
    $.getJSON(siteURL + 'json/map', function(data) {
        var arr = $.map(data.players, function(el) { return el });
        console.log(arr);

        var i = 0;
        arr.forEach(function(feature) {
            contentStrings = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h4 id="firstHeading" class="firstHeading">'+feature.firstName+' '+feature.lastName+'</h4>'+
                // '<div id="bodyContent">'+
                // '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
                // 'sandstone rock formation in the southern part of the '+
                // 'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
                // 'south west of the nearest large town, Alice Springs; 450&#160;km '+
                // '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
                // 'features of the Uluru - Kata Tjuta National Park. Uluru is '+
                // 'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
                // 'Aboriginal people of the area. It has many springs, waterholes, '+
                // 'rock caves and ancient paintings. Uluru is listed as a World '+
                // 'Heritage Site.</p>'+
                // '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
                // 'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
                // '(last visited June 22, 2009).</p>'+
                // '</div>'+
                '</div>';

            infowindow = new google.maps.InfoWindow({
                content: contentStrings
            });

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(feature.position.x, feature.position.y),
                map: map,
                icon: siteURL + 'assets/images/blip_1.png'
            });

            google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
                return function () {
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                };
            })(marker, content, infowindow));;
            i++;
        });
        console.log(Date.now());
    });
}

window.addMarkers = addMarkers;
window.initMap = initMap;

setInterval(addMarkers, 15000);