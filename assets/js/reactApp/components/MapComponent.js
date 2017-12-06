import React from 'react';
import {connect} from "react-redux";
import * as markersActions from "../actions/markersActions";
import PropTypes from "prop-types";
import Map from "../classes/Map";

function initMap() {
    console.log("init called");
    const gMap = new Map();
    gMap.initMap();
}
window.initMap = initMap;

class MapComponent extends React.Component
{
    componentWillMount() {
        this.props.dispatch(markersActions.loadMarkersJson());
    }

    render() {
        if (this.props.markersJson.players) {
            const markersArr = Object.entries(this.props.markersJson.players);
        }
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

