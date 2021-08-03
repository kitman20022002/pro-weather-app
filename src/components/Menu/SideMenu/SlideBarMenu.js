import React from 'react';
import '../../../Animation.css';
import './SlideBarMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import NavigationItems from '../../Navigation/NavigationItems';
import Backdrop from '../../Backdrop/Backdrop';

const SlideBarMenu = (props) => {
  const { open, closed, profileImg, profileName } = props;
  let attachedClass = ['close', 'navigation__items'];
  if (open) {
    attachedClass = ['open', 'navigation__items'];
  }

  return (
    <div>
      <Backdrop show={open} click={closed} />
      <nav className={attachedClass.join(' ')}>
        <div className="nav__profile flex align--center">
          <img src={profileImg} alt="profile-img" />
          <h3>{profileName}</h3>
        </div>
        <NavigationItems />
        <FontAwesomeIcon onClick={closed} icon={faTimes} className="card__nav-close color--white" />
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profileImg: state.auth.profileImg,
  profileName: state.auth.profileName,
});

export default connect(mapStateToProps, null)(SlideBarMenu);
