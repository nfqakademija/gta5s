window.map;
window.isMobile = window.innerWidth < 721 ? true : false;
var siteURL = window.location.href+"assets/images/";

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
            return siteURL + 'Tiles_ATLAS/' + zoom + '-' + normalizedCoord.x + '_' + normalizedCoord.y + '.png';
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
            return siteURL + 'Tiles_SAT/' + zoom + '-' + coord.x + '_' + coord.y + '.png';
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
            return siteURL + 'Tiles_ROAD/' + zoom + '-' + coord.x + '_' + coord.y + '.png';
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