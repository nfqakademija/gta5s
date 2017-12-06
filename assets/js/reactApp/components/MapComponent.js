const siteURL = window.location.href;
let markers = {};
let googleMap = {};

window.initMap = initMap;
window.addMarkers = addMarkers;


function initMap() {
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

        // don't repeat across x-axis (vertically)
        if (x < 0 || x >= tileRange) {
            return null;
        }

        return {
            x: x,
            y: y
        };
    }

// Boundaries for normalized tile selection in specific map options
    const bounds = {
        3: 2,
        4: 5,
        5: 10,
        6: 21,
        7: 42
    };

// Options for specific map styles
    const mapAtlasOptions = {
        getTileUrl: function getTileUrlHelper(coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (!normalizedCoord || normalizedCoord.x > bounds[zoom] || normalizedCoord.y > bounds[zoom]) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return window.location.href + "assets/images/Tiles_ATLAS/" + zoom + '-' + normalizedCoord.x + '_' + normalizedCoord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 7,
        minZoom: 3,
        name: 'Atlas'
    };
    const mapSatelliteOptions = {
        getTileUrl: function (coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (!normalizedCoord || normalizedCoord.x > bounds[zoom] || normalizedCoord.y > bounds[zoom]) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return siteURL + 'assets/images/Tiles_SAT/' + zoom + '-' + normalizedCoord.x + '_' + normalizedCoord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 7,
        minZoom: 3,
        name: 'Satellite'
    };
    const mapRoadOptions = {
        getTileUrl: function (coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (!normalizedCoord || normalizedCoord.x > bounds[zoom] || normalizedCoord.y > bounds[zoom]) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return siteURL + 'assets/images/Tiles_ROAD/' + zoom + '-' + normalizedCoord.x + '_' + normalizedCoord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 7,
        minZoom: 3,
        name: 'Road'
    };
// Options for overlay names (i.e. streets) used on all maps
    const overlayNames = new google.maps.ImageMapType({
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
    const mapAtlas = new google.maps.ImageMapType(mapAtlasOptions);
    const mapSatellite = new google.maps.ImageMapType(mapSatelliteOptions);
    const mapRoad = new google.maps.ImageMapType(mapRoadOptions);

    // Projection for map to calculate longitude correctly, removes Mercator projection
    const projection = {
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
    mapAtlas.projection = projection;
    mapSatellite.projection = projection;
    mapRoad.projection = projection;

    var mapOptions = {
        backgroundColor: '#0fa8d2',
        center: new google.maps.LatLng(62, 39),
        zoom: 4,
        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ['Atlas', 'Satellite', 'Road']
        }
    }

    googleMap = new google.maps.Map(document.getElementById('react-map'), mapOptions);

    googleMap.mapTypes.set('Atlas', mapAtlas);
    googleMap.mapTypes.set('Satellite', mapSatellite);
    googleMap.mapTypes.set('Road', mapRoad);
    googleMap.setMapTypeId('Atlas');

    googleMap.overlayMapTypes.push(overlayNames);

    // Change background color depending on map selected
    google.maps.event.addListener(googleMap, 'maptypeid_changed', function () {
        var type = googleMap.getMapTypeId();
        switch (type) {
            case 'Atlas':
                document.getElementById('react-map').firstElementChild.style.backgroundColor = '#0fa8d2';
                break;
            case 'Satellite':
                document.getElementById('react-map').firstElementChild.style.backgroundColor = '#143d6b';
                break;
            case 'Road':
                document.getElementById('react-map').firstElementChild.style.backgroundColor = '#1862ad';
                break;
        }
    });

    addMarkers();
}

function addMarkers() {
    if (markers.length > 0) {
        deleteMarkers();
    }

    // demo fake players
    const positions = [
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

    // marker icon
    const image = {
        url: siteURL + 'assets/images/blip_1.png',
        scaledSize: new google.maps.Size(15, 15),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(7.5, 7.5)
    };

    // Convert gta game map coordinates to google map
    function convertXYtoLatLng(x, y) {
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
    }

    positions.forEach((item) => {
        const contentStrings = item.firstName+' '+item.lastName;

        const marker = new google.maps.Marker({
            position: convertXYtoLatLng(item.position[0], item.position[1]),
            icon: image
        });

        marker.setMap(googleMap);

        const infowindow = new google.maps.InfoWindow({
            content: "<div>;)</div>"
        });

        marker.addListener("click", () => {
            infowindow.open(googleMap, marker);
        });

        markers.push(marker);
    })
}

function deleteMarkers() {
    markers.forEach(marker => {
       marker.setMap(null);
    });
    markers = [];
}

setInterval(addMarkers, 5000);

import React from 'react';
import {connect} from "react-redux";
import * as markersActions from "../actions/markersActions";
import PropTypes from "prop-types";

class MapComponent extends React.Component
{
    componentWillMount() {
        this.props.dispatch(markersActions.loadMarkersJson());
    }

    render() {
        console.log(this.props.markers)
        return(
            <div id="react-map"></div>
        );
    }
}

MapComponent.propTypes = {
    markers: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        markers: state.markers
    };
}

export default connect(mapStateToProps)(MapComponent);