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
        this.changeMarkersTime = this.changeMarkersTime.bind(this);
        this.markersTimeNow = this.markersTimeNow.bind(this);
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
            showInputs: true,
            minuteStep: 1,
            showMeridian: false,
            snapToStep: true
        });

        const self = this;
        window.addEventListener("load", function(event) {
            (function loadMarkers() {
                self.props.dispatch(markersActions.loadMarkersJson(self.props.timeOfDay));
                var markersTimeout = setTimeout(loadMarkers, vars.timeout);
                self.markersTimeout = markersTimeout;
            })();
        });
    }

    // shouldComponentUpdate(nextProps) {
    //     if (JSON.stringify(this.props.activeUser) !== JSON.stringify(nextProps.activeUser)) {
    //         return true;
    //     }
    //     if (JSON.stringify(this.props.markersJson) !== JSON.stringify(nextProps.markersJson)) {
    //         return true;
    //     }
    //     return false;
    // }

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

    changeMarkersTime() {
        const self = this;
        clearTimeout(this.markersTimeout);
        setTimeout(() => {
            (function loadMarkers() {
                const dateNow = "/" + new Date().toISOString().slice(0,10) + "%20" + document.querySelector("#timepicker").value + ":00";
                self.props.dispatch(markersActions.loadMarkersJson(dateNow));
            })();
        }, 100);
    }

    markersTimeNow(e) {
        document.querySelector(".markers-now-button").setAttribute("disabled", true);
        const self = this;
        clearTimeout(this.markersTimeout);
        setTimeout(() => {
            (function loadMarkers() {
                self.props.dispatch(markersActions.loadMarkersJson(""));
                let markersTimeout = setTimeout(loadMarkers, vars.timeout);
                self.markersTimeout = markersTimeout;
            })();
        }, 100);
        setTimeout(() => {
            console.log(document.querySelector(".markers-now-button"));
            document.querySelector(".markers-now-button").removeAttribute("disabled");
        }, 800);
    }

    render() {
        if (vars.gMap) {
            vars.gMap.addMarkers(this.props.markersJson.players);
            this.addMarkerListeners();
        }

        console.log(this.props);
        const {activeUser} = this.props;
        return(
            <div>
                <div className="map-timer">
                    <div class="dropdown">
                        <button onClick={this.timerDropdown} id="timer-button" class="btn btn-primary map-dropdown-button">Dienos istorija&nbsp;
                            <span class="caret"></span></button>
                        <div class="dropdown-menu timer-menu timer-menu-hidden">
                            <span>Kur žaidėjai buvo </span>
                            <input onBlur={this.changeMarkersTime} id="timepicker" type="text" className="form-control input-small" />
                            <button onClick={this.markersTimeNow} className="btn btn-danger markers-now-button">Dabar</button>
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
    activeUser: PropTypes.object.isRequired,
    timeOfDay: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        markersJson: state.markersJson,
        activeUser: state.activeUser,
        timeOfDay: state.timeOfDay
    };
}

export default connect(mapStateToProps)(MapComponent);

