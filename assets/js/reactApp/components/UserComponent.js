import React from 'react';
import {connect} from "react-redux";
import * as markersActions from "../actions/markersActions";
import PropTypes from "prop-types";
import Map from "../classes/Map";
import * as vars from "../common/variables";

class UserComponent extends React.Component
{
    render() {
        return(
            <div class="map-user-wrap">
                <div>
                    <p><i className="fa fa-user-circle" aria-hidden="true"></i>
                        Vladas KO</p>
                    <a href="#">Profilis</a>
                    <span className="map-user-x">&#10005;</span>
                </div>
            </div>
        )
    }
}

MapComponent.propTypes = {
    activeUser: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        activeUser: state.activeUser
    };
}

export default connect(mapStateToProps)(MapComponent);

