import React from 'react';
import {connect} from "react-redux";
import * as markersActions from "../actions/markersActions";
import * as usersActions from "../actions/usersActions";
import PropTypes from "prop-types";
import Map from "../classes/Map";
import * as vars from "../common/variables";
import UserComponent from "./UserComponent";


function initMap() {
    vars.gMap = new Map();
    vars.gMap.siteURL = vars.url;
    vars.gMap.initMap();
}
window.initMap = initMap;

class MapComponent extends React.Component
{
    constructor(props, context) {
        super(props, context);

        this.closeUser = this.closeUser.bind(this);
    }

    addMarkerListeners() {
        vars.gMap.markers.forEach((marker) => {
            marker.addListener("click", () => {
                this.props.dispatch(usersActions.loadUser(marker, this.props.activeUser));
            });
        });
    }

    componentWillMount() {
        this.props.dispatch(markersActions.loadMarkersJson());
    }

    componentDidMount() {
        $('#timepicker').timepicker({
            showInputs: false,
            minuteStep: 1,
            showMeridian: false,
        });

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
        if (JSON.stringify(this.props.activeUser) !== JSON.stringify(nextProps.activeUser)) {
            return true;
        }
        if (JSON.stringify(this.props.markersJson) !== JSON.stringify(nextProps.markersJson)) {
            return true;
        }
        return false;
    }

    closeUser() {
        this.props.dispatch(usersActions.loadUser({"closeUser": true}, this.props.activeUser));
    }

    timerDropdown() {
        var button = document.querySelector(".timer-menu");
        if (button.getAttribute("class") === "dropdown-menu timer-menu timer-menu-active") {
            button.setAttribute("class", "dropdown-menu timer-menu timer-menu-hidden");
        } else {
            button.setAttribute("class", "dropdown-menu timer-menu timer-menu-active");
        }
    }

    render() {
        const {activeUser} = this.props;
        return(
            <div>
                <div className="map-timer">
                    <div class="dropdown">
                        <button onClick={this.timerDropdown} id="timer-button" class="btn btn-primary map-dropdown-button">Dienos istorija&nbsp;
                            <span class="caret"></span></button>
                        <div class="dropdown-menu timer-menu timer-menu-hidden">
                            <span>Kur žaidėjai buvo </span>
                            <input id="timepicker" type="text" className="form-control input-small" />
                        </div>
                    </div>
                </div>
                <UserComponent activeUser={activeUser} closeUser={this.closeUser} />
                <div id="react-map"></div>
            </div>
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

