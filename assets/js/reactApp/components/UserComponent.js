import React from 'react'
import PropTypes from "prop-types";

const UserComponent = ({activeUser, closeUser}) =>
{
    return(
        <div className={"map-user-wrap " + activeUser.open}>
            <div>
                <p><i className="fa fa-user-circle" aria-hidden="true"></i> {activeUser.user}</p>
                <a href={"/profile/" + activeUser.user_id}>Profilis</a>
                <span onClick={closeUser} className="map-user-x">&#10005;</span>
            </div>
        </div>
    );
}

UserComponent.propTypes = {
    activeUser: PropTypes.object.isRequired,
    closeUser: PropTypes.func.isRequired
};

export default UserComponent;

