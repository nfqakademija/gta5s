function Map() {
    const self = this;

    this.bounds = {
        3: 2,
        4: 5,
        5: 10,
        6: 21,
        7: 42
    };
    this.element = document.getElementById('react-map');
    this.image = {
        url: 'assets/images/blip_1.png',
        scaledSize: new google.maps.Size(15, 15),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(7.5, 7.5)
    };
    this.markers = [];
    this.positions = [
        {
            "firstName": "Kung",
            "lastName": "Lao",
            "position": [5.363882, 0.044922]
        },
        {
            "firstName": "Johnny",
            "lastName": "Cage",
            "position": [21.363882, 10.044922]
        },
        {
            "firstName": "Sonya",
            "lastName": "Blade",
            "position": [2.363882, 15.044922]
        }
    ];
    this.convertedJson = function(json) {
        return Object.entries(json);
    };
    this.projection = {
        fromLatLngToPoint: function(latLng) {
            return new google.maps.Point(
                latLng.lng(),
                latLng.lat()
            );
        },
        fromPointToLatLng: function(point) {
            return new google.maps.LatLng(
                point.y,
                point.x
            );
        }
    };
    this.siteURL = window.location.href;

    this.mapAtlasOptions = {
        getTileUrl: function getTileUrlHelper(coord, zoom) {
            var normalizedCoord = self.getNormalizedCoord(coord, zoom);
            if (!normalizedCoord || normalizedCoord.x > self.bounds[zoom] || normalizedCoord.y > self.bounds[zoom]) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return "assets/images/Tiles_ATLAS/" + zoom + '-' + normalizedCoord.x + '_' + normalizedCoord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 7,
        minZoom: 3,
        name: 'Atlas'
    };
    this.mapSatelliteOptions = {
        getTileUrl: function (coord, zoom) {
            var normalizedCoord = self.getNormalizedCoord(coord, zoom);
            if (!normalizedCoord || normalizedCoord.x > self.bounds[zoom] || normalizedCoord.y > self.bounds[zoom]) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return 'assets/images/Tiles_SAT/' + zoom + '-' + normalizedCoord.x + '_' + normalizedCoord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 7,
        minZoom: 3,
        name: 'Satellite'
    };
    this.mapRoadOptions = {
        getTileUrl: function (coord, zoom) {
            var normalizedCoord = self.getNormalizedCoord(coord, zoom);
            if (!normalizedCoord || normalizedCoord.x > self.bounds[zoom] || normalizedCoord.y > self.bounds[zoom]) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return 'assets/images/Tiles_ROAD/' + zoom + '-' + normalizedCoord.x + '_' + normalizedCoord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 7,
        minZoom: 3,
        name: 'Road'
    };
    this.mapOptions = {
        backgroundColor: '#0fa8d2',
        center: new google.maps.LatLng(62, 39),
        zoom: 4,
        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ['Atlas', 'Satellite', 'Road']
        }
    }

    this.overlayNames = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            var normalizedCoord = self.getNormalizedCoord(coord, zoom);
            if (!normalizedCoord) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return 'assets/images/Tiles_Streets/' + zoom + '-' + coord.x + '_' + coord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256)
    });
    this.mapAtlas = new google.maps.ImageMapType(this.mapAtlasOptions);
    this.mapSatellite = new google.maps.ImageMapType(this.mapSatelliteOptions);
    this.mapRoad = new google.maps.ImageMapType(this.mapRoadOptions);
    this.googleMap = new google.maps.Map(this.element, this.mapOptions);

    this.convertXYtoLatLng = function(x, y) {
        var lat;
        var long;

        if ((x < 0) && ((x * 0.006896) + 39.4 < 39.4)) {
            long = (x * 0.006896) + 39.4;
        }
        else if ((x < 0) && ((x * 0.006896) + 39.4 >= 39.4) || (x >= 0) && ((x * 0.006896) + 39.4 < 39.4)) {
            long = -(x * 0.006896) + 39.4;
        }
        else {
            long = (x * 0.006896) + 39.4;
        }

        if ((y < 0) && ((y * 0.006896) + 58 < 58)) {
            lat = -(y * 0.006896) + 58;
        }
        else if ((y < 0) && ((y * 0.006896) + 58 >= 58) || (y >= 0) && ((y * 0.006896) + 58 < 58)) {
            lat = (y * 0.006896) + 58;
        }
        else {
            lat = -(y * 0.006896) + 58;
        }

        return new google.maps.LatLng(lat, long);
    };
    this.getNormalizedCoord = function(coord, zoom) {
        var y = coord.y;
        var x = coord.x;

        // tile range in one direction range is dependent on zoom level
        // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
        var tileRange = 1 << zoom;

        // don't repeat across y-axis (vertically)
        if (y < 0 || y >= tileRange) {
            return null;
        }

        // don't repeat across x-axis (vertically)
        if (x < 0 || x >= tileRange) {
            return null;
        }

        return {
            x: x,
            y: y
        };
    };
    this.markerListenerCallback = function() {console.log(marker.user);};

    this.initMap = function() {
        this.mapAtlas.projection = this.projection;
        this.mapSatellite.projection = this.projection;
        this.mapRoad.projection = this.projection;

        this.googleMap.mapTypes.set('Atlas', this.mapAtlas);
        this.googleMap.mapTypes.set('Satellite', this.mapSatellite);
        this.googleMap.mapTypes.set('Road', this.mapRoad);
        this.googleMap.setMapTypeId('Atlas');

        this.googleMap.overlayMapTypes.push(this.overlayNames);

        // Change background color depending on map selected
        google.maps.event.addListener(this.googleMap, 'maptypeid_changed', function () {
            var type = self.googleMap.getMapTypeId();
            switch (type) {
                case 'Atlas':
                    self.element.firstElementChild.style.backgroundColor = '#0fa8d2';
                    break;
                case 'Satellite':
                    self.element.firstElementChild.style.backgroundColor = '#143d6b';
                    break;
                case 'Road':
                    self.element.firstElementChild.style.backgroundColor = '#1862ad';
                    break;
            }
        });
    };
    this.addMarkers = function(json) {
        if (this.markers.length > 0) {
            this.deleteMarkers();
        }

        const convertedJson = this.convertedJson(json);
        convertedJson.forEach((item) => {
            const marker = new google.maps.Marker({
                position: this.convertXYtoLatLng(item[1].position.x, item[1].position.y),
                icon: this.image,
                user: item[1].firstName + ' ' + item[1].lastName,
                user_id: Number(item[0].substring(2))
            });

            marker.setMap(this.googleMap);

            this.markers.push(marker);
        });
    };
    this.deleteMarkers = function() {
        this.markers.forEach(marker => {
            marker.setMap(null);
        });
        this.markers = [];
    };
}

export default Map;