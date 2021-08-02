import React from 'react';
import './Account.css';
import '../../App.css';
import { connect } from 'react-redux';
import { deleteUser, updateUser, uploadImg } from '../../api/user';
import Modal from '../Modal/Modal';
import { updateUserLocal } from '../../store/actions';
import * as actions from '../../store/actions';
import FileUploader from '../FileUploader/FileUploader';

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: 'coconut',
      lastName: 'dd',
      username: props.profileName,
      password: props.password,
      city: props.city,
      profile_img: props.profileImg,
      modalShow: false,
      modalError: false,
      submitting: false,
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateUser = async (e) => {
    const { firstName, lastName, city, username, password, profile_img } = this.state;
    const { token, userId } = this.props;
    e.preventDefault();
    const data = {
      name: { firstName, lastName },
      username,
      city,
      password,
      profile_img,
      token,
    };
    this.setState({ submitting: true });
    await updateUser(userId, data, token);
    this.props.updateUserLocal({
      profile_img,
      username,
      city,
    });
    this.setState({ submitting: false });
  };

  openModal = async (e) => {
    e.preventDefault();
    this.setState({ modalShow: true });
  };

  deleteUser = async (e) => {
    e.preventDefault();
    const { modalError } = this.state;
    const { userId, token } = this.props;
    if (modalError) {
      this.setState({ modalError: false, modalShow: false });
    } else {
      try {
        await deleteUser(userId, token);
        this.setState({ modalShow: false, modalError: false });
        this.props.onLogout();
      } catch (e) {
        this.setState({ modalError: true });
      }
    }
  };

  closeModal = () => {
    this.setState({ modalShow: false, modalError: false });
  };

  removeProfileImg = async (e) => {
    const { userId, token, updateUserLocal } = this.props;
    const { username, city } = this.state;
    e.preventDefault();
    const data = {
      profile_img: '',
      username,
      city,
    };

    this.setState(data);
    updateUserLocal(data);
    await updateUser(userId, data, token);
  };

  uploadImg = async (selectorFiles) => {
    const { username, city } = this.state;
    const { updateUserLocal } = this.props;

    const res = await uploadImg(selectorFiles);
    this.setState({ profile_img: res.data[0].location });
    updateUserLocal({
      profile_img: res.data[0].location,
      username,
      city,
    });
  };

  render() {
    const {
      modalError,
      modalShow,
      submitForm,
      profile_img,
      username,
      firstName,
      lastName,
      password,
      city,
      submitting,
    } = this.state;
    return (
      <div className="container--main">
        <form className="setting__form" onSubmit={submitForm}>
          <h2>Account</h2>
          <div className="avatar__container">
            <label>Avatar:</label>
            <div className="avatar-details__container">
              <img src={profile_img} alt="profile_img" />
              <FileUploader
                handleFile={(e) => {
                  this.uploadImg(e.target.files);
                }}
              />
              <button type="button" className="grey" onClick={(e) => this.removeProfileImg(e)}>
                Remove
              </button>
            </div>
          </div>
          <label>Display Name:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          <label>FirstName:</label>
          <input type="text" name="firstName" value={firstName} onChange={this.handleChange} />
          <label>LastName:</label>
          <input type="text" name="lastName" value={lastName} onChange={this.handleChange} />

          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <h2>Settings</h2>
          <label>Default City:</label>
          <input type="input" name="city" value={city} onChange={this.handleChange} />
          <div className="full-width extra__container">
            <hr className="full-width" />
            <div className="delete-account__container">
              <div className="delete-account-details__container">
                <h3>Delete Account</h3>
                <p>By deleting your account you will lose all your data</p>
              </div>
              <button className="grey" onClick={this.openModal}>
                Delete account...
              </button>
            </div>
          </div>
          <div className="text--right btn-container">
            <button type="submit" onClick={this.updateUser} disabled={submitting}>
              Save Value
            </button>
            {/* <input type="submit" value="Save Value" onClick={this.updateUser} disabled={this.state.submitting}/> */}
          </div>
        </form>
        <Modal show={modalShow} class="modal--default">
          <div className="content">
            <span className="color--purple">JUST CHECKING</span>
            {!modalError ? (
              <div>
                <h2>Delete your account ?</h2>
                <p>Do you really want to delete your account? This process cannot be undone.</p>
              </div>
            ) : (
              <div>
                <h2>Failed delete account</h2>
                <p>
                  Please try again. If problem still happens please contact weaths@kitmanyiu.com
                </p>
              </div>
            )}
          </div>
          <div className="flex">
            <button onClick={this.deleteUser}>Confirm</button>
            <button onClick={this.closeModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuth: state.auth.token !== null,
  userId: state.auth.userId,
  token: state.auth.token,
  profileImg: state.auth.profileImg,
  profileName: state.auth.profileName,
  city: state.auth.city,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserLocal: (data) => dispatch(updateUserLocal(data)),
  onLogout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
