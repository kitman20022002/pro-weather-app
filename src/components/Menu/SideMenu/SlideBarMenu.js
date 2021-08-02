import React from 'react';
import '../../../Animation.css';
import './SlideBarMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/index';
import { connect } from 'react-redux';
import NavigationItems from '../../Navigation/NavigationItems';
import Backdrop from '../../Backdrop/Backdrop';

const SlideBarMenu = (props) => {
  let attachedClass = ['close', 'navigation__items'];
  if (props.open) {
    attachedClass = ['open', 'navigation__items'];
  }

  return (
    <div>
      <Backdrop show={props.open} click={props.closed} />
      <nav className={attachedClass.join(' ')}>
        <div className="nav__profile flex align--center">
          <img src={props.profileImg} alt="profile-img" />
          <h3>{props.profileName}</h3>
        </div>
        <NavigationItems />
        <FontAwesomeIcon
          onClick={props.closed}
          icon={faTimes}
          className="card__nav-close color--white"
        />
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profileImg: state.auth.profileImg,
  profileName: state.auth.profileName,
});

export default connect(mapStateToProps, null)(SlideBarMenu);
