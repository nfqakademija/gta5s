import React from 'react';
import {connect} from "react-redux";
import * as markersActions from "../actions/markersActions";
import * as usersActions from "../actions/usersActions";
import PropTypes from "prop-types";
import Map from "../classes/Map";
import * as vars from "../common/variables";

function initMap() {
    vars.gMap = new Map();
    vars.gMap.siteURL = vars.url;
    vars.gMap.initMap();
}
window.initMap = initMap;

class MapComponent extends React.Component
{
    addMarkerListeners() {
        vars.gMap.markers.forEach((marker) => {
            marker.addListener("click", () => {
                this.props.dispatch(usersActions.loadUser(marker));
            });
        });
    }

    componentWillMount() {
        this.props.dispatch(markersActions.loadMarkersJson());
    }

    componentDidMount() {
        const self = this;
        window.addEventListener("load", function (event) {
            (function loadMarkers() {
                vars.gMap.addMarkers(self.props.markersJson.players);
                self.props.dispatch(markersActions.loadMarkersJson());
                self.addMarkerListeners();
                setTimeout(loadMarkers, vars.timeout);
            })();
        });
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.activeUser !== nextProps.activeUser) {
            console.log(this.props.activeUser);
            return true;
        }
        if (JSON.stringify(this.props.markersJson) !== JSON.stringify(nextProps.markersJson)) {
            return true;
        }
        return false;
    }

   render() {
        console.log(this.props);
        return(
            <div id="react-map"></div>
        );
    }
}

MapComponent.propTypes = {
    markersJson: PropTypes.object.isRequired,
    activeUser: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        markersJson: state.markersJson,
        activeUser: state.activeUser
    };
}

export default connect(mapStateToProps)(MapComponent);

