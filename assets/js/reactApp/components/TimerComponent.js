import React from 'react';
import PropTypes from "prop-types";

const TimerComponent = ({timerDropdown, changeMarkersTime, markersTimeNow}) => {
    return(
        <div className="map-timer">
            <div class="dropdown">
                <button onClick={timerDropdown} id="timer-button" class="btn btn-primary map-dropdown-button">Dienos istorija&nbsp;
                    <span class="caret"></span></button>
                <div class="dropdown-menu timer-menu timer-menu-hidden">
                    <span>Kur žaidėjai buvo </span>
                    <input onBlur={changeMarkersTime} id="timepicker" type="text" className="form-control input-small" />
                    <button onClick={markersTimeNow} className="btn btn-danger markers-now-button">Dabar</button>
                </div>
            </div>
        </div>
    );
};

TimerComponent.propTypes = {
    timerDropdown: PropTypes.func.isRequired,
    changeMarkersTime: PropTypes.func.isRequired,
    markersTimeNow: PropTypes.func.isRequired
};

export default TimerComponent;