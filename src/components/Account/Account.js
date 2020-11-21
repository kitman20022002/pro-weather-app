import React from 'react';
import './Account.css';
import '../../App.css';
import {connect} from "react-redux";
import {updateUser, uploadImg} from '../../api/user';
import Modal from "../../components/Modal/Modal";
import {updateUserLocal} from "../../store/actions/auth";

class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: 'coconut',
            lastName: 'dd',
            username: props.profileName,
            password: props.password,
            city: 'Sydney',
            profile_img: 'https://pbs.twimg.com/profile_images/3128016790/d41f7c7ca1662ea737cc7073e0901706_normal.png',
            modalShow: false
        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    updateUser = async (e) => {
        e.preventDefault();
        let data = {
            'name': {'firstName': this.state.firstName, 'lastName': this.state.lastName},
            'username': this.state.username,
            'city': this.state.city,
            'password': this.state.password,
            'profile_img': this.state.profile_img,
            'token': this.props.token
        };
        this.setState({'modalShow': true});
        let result = await updateUser(this.props.userId, data, this.props.token);
        this.props.updateUserLocal({'profile_img': this.state.profile_img, 'username': this.state.username});
    };

    deleteUser = async (e) => {
        e.preventDefault();
    };

    closeModal = () => {
        this.setState({'modalShow': false});
    };

    uploadImg = () => {
        uploadImg();
    };

    render() {
        return (
            <div className="container--main">
                <form className="setting__form" onSubmit={this.props.submitForm}>
                    <h2>Account</h2>
                    <div className={"avatar__container"}>
                        <label>
                            Avatar:
                        </label>
                        <div className={"avatar-details__container"}>
                            <img src={this.props.profileImg} alt={"profile_img"}/>
                            <input type="file" onChange={uploadImg} name={"Upload"}/>
                            <button className={"grey"}>Remove</button>
                        </div>
                    </div>
                    <label>
                        Display Name:
                    </label>
                    <input type="text" name='username' value={this.state.username}
                           onChange={this.handleChange}/>
                    <label>
                        FirstName:
                    </label>
                    <input type="text" name='firstName' value={this.state.firstName}
                           onChange={this.handleChange}/>
                    <label>
                        LastName:
                    </label>
                    <input type="text" name='lastName' value={this.state.lastName}
                           onChange={this.handleChange}/>

                    <label>
                        Password:
                    </label>
                    <input type="password" name='password' value={this.state.password}
                           onChange={this.handleChange}/>
                    <h2>Settings</h2>
                    <label>
                        Default City:
                    </label>
                    <select name='value' value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                    <div className={'full-width extra__container'}>
                        <hr className={'full-width'}/>
                        <div className={"delete-account__container"}>
                            <div className={"delete-account-details__container"}>
                                <h3>Delete Account</h3>
                                <p>By deleting your account you will lose all your data</p>
                            </div>
                            <button className={"grey"} onClick={this.deleteUser}>Delete account...</button>
                        </div>
                    </div>
                    <div className={"text--right btn-container"}>
                        <input type="submit" value="Save Value" onClick={this.updateUser}/>
                    </div>
                </form>
                <Modal show={this.state.modalShow}>
                    <h2>Updated</h2>
                    <button onClick={this.closeModal}>OK</button>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        userId: state.auth.userId,
        token: state.auth.token,
        profileImg: state.auth.profileImg,
        profileName: state.auth.profileName
    }
};

const mapDispatchToProps = dispatch => ({
    updateUserLocal(data) {
        dispatch(
            updateUserLocal(data)
        )
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
