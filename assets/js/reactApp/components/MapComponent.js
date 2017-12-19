import React from 'react';
import {connect} from "react-redux";
import * as markersActions from "../actions/markersActions";
import * as usersActions from "../actions/usersActions";
import PropTypes from "prop-types";
import Map from "../classes/Map";
import * as vars from "../common/variables";
import UserComponent from "./UserComponent";
import TimerComponent from "./TimerComponent";


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

    closeUser() {
        document.querySelector(".user-events-menu").setAttribute("class", "user-events-menu user-events-menu-hidden");
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

    userEventsDropdown() {
        var button = document.querySelector(".user-events-menu");
        if (button.getAttribute("class") === "user-events-menu user-events-menu-active") {
            button.setAttribute("class", "user-events-menu user-events-menu-hidden");
        } else {
            button.setAttribute("class", "user-events-menu user-events-menu-active");
        }
    }

    changeMarkersTime() {
        const self = this;
        clearTimeout(this.markersTimeout);
        setTimeout(() => {
            (function loadMarkers() {
                let timeValue = document.querySelector("#timepicker").value;
                if (timeValue.length == 4) {
                    timeValue = "0" + timeValue;
                }
                const monthDay = new Date().getDate();
                const yearAndMonth = new Date().toISOString().slice(0,8);

                const dateNow = "/" + yearAndMonth + monthDay + "%20" + timeValue + ":00";
                self.props.dispatch(markersActions.loadMarkersJson(dateNow));
            })();
        }, 100);
    }

    markersTimeNow() {
        document.querySelector(".markers-now-button").setAttribute("disabled", true);
        const self = this;
        clearTimeout(this.markersTimeout);
        setTimeout(() => {
            (function loadMarkers() {
                // reset timepicker
                const date = new Date();
                const time = (date.getHours()<10?'0':'') + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes();
                document.querySelector("#timepicker").value = time;

                self.props.dispatch(markersActions.loadMarkersJson(""));
                let markersTimeout = setTimeout(loadMarkers, vars.timeout);
                self.markersTimeout = markersTimeout;
            })();
        }, 100);
        setTimeout(() => {
            document.querySelector(".markers-now-button").removeAttribute("disabled");
        }, 1200);
    }

    render() {
        if (vars.gMap) {
            vars.gMap.addMarkers(this.props.markersJson.players);
            this.addMarkerListeners();
        }

        const {activeUser} = this.props;
        return(
            <div>
                <TimerComponent
                    timerDropdown={this.timerDropdown}
                    changeMarkersTime={this.changeMarkersTime}
                    markersTimeNow={this.markersTimeNow}
                />
                <UserComponent
                    activeUser={activeUser}
                    closeUser={this.closeUser}
                    userEventsDropdown={this.userEventsDropdown}
                />
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

