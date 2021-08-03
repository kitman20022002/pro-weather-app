import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../../img/weather.png';
import Clock from '../Clock';
import SlideBarMenu from '../Menu/SideMenu/SlideBarMenu';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideMenu: false,
    };
  }

  sideMenuHandler = () => {
    this.setState({ showSideMenu: false });
  };

  sideMenuToggle = () => {
    this.setState((prevState) => ({ showSideMenu: !prevState.showSideMenu }));
  };

  render() {
    const { searchPressCallback } = this.props;
    const { showSideMenu } = this.state;
    return (
      <header className="align--center fade-down">
        <div className="flex-1 menu-container">
          <FontAwesomeIcon
            icon={faBars}
            className="color--white menu-icon"
            onClick={this.sideMenuToggle}
          />
          <img src={logo} className="icon" alt="Kitman Yiu Weather" />
        </div>
        <div className="flex-1">
          <Clock />
        </div>
        <div className="flex-1 search-container">
          <div className="search-box-container">
            <input
              onKeyPress={searchPressCallback}
              className="search-box"
              type="text"
              placeholder="Search City. . ."
              required
            />
          </div>
        </div>
        <SlideBarMenu open={showSideMenu} closed={this.sideMenuHandler} />
      </header>
    );
  }
}

export default Header;
