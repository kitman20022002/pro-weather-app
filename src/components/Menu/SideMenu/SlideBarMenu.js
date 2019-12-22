import React from "react";
import '../../../Animation.css';
import './SlideBarMenu.css';
import Backdrop from "../../Backdrop/Backdrop";
import NavigationItems from "../../Navigation/NavigationItems";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes,faCircle} from "@fortawesome/free-solid-svg-icons/index";
import {connect} from "react-redux";

const SlideBarMenu = (props) => {
    let attachedClass = ['close', 'navigation__items'];
    if (props.open) {
        attachedClass = ['open', 'navigation__items']
    }
    return (
        <div>
            <Backdrop show={props.open} click={props.closed}/>
            <nav className={attachedClass.join(' ')} >
                <div className="nav__profile flex align--center" >
                    <FontAwesomeIcon icon={faCircle} className="profile color--light-blue"/>
                    <h3>{props.profileName}</h3>
                </div>
                <NavigationItems/>
                <FontAwesomeIcon onClick={props.closed} icon={faTimes} className="card__nav-close color--white"/>
            </nav>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        profileName: state.auth.profileName
    };
};

export default connect(mapStateToProps)(SlideBarMenu);
