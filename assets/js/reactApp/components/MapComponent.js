import React from 'react';
import {connect} from "react-redux";
import * as markersActions from "../actions/markersActions";
import PropTypes from "prop-types";
import Map from "../classes/Map";

let gMap;

function initMap() {
    gMap = new Map();
    gMap.initMap();
}
window.initMap = initMap;

class MapComponent extends React.Component
{
    componentWillMount() {
        this.props.dispatch(markersActions.loadMarkersJson());
    }
    componentDidMount() {
        const self = this;
        window.addEventListener("load", function (event) {
            (function loadMarkers() {
                gMap.addMarkers(self.props.markersJson.players);
                self.props.dispatch(markersActions.loadMarkersJson());
                setTimeout(loadMarkers, 5000)
            })();
        });
    }

    render() {
        return(
            <div id="react-map"></div>
        );
    }
}

MapComponent.propTypes = {
    markersJson: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        markersJson: state.markersJson
    };
}

export default connect(mapStateToProps)(MapComponent);

