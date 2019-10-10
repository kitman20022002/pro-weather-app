import React from "react";
import Twitter from "./Twitter/Twitter";
import Facebook from "./Faceboook/Facebook";
import "./SocialMedia.css";

let socialMedia = [
    <Twitter/>,
    <Facebook/>
];

class SocialMedia extends React.Component {
    state = {
        show: 0
    };

    switchSocialMedia = () => {
        this.setState((prevState) => {
            return {show: prevState.show < socialMedia.length -1 ? prevState.show += 1 : 0}
        });
    };

    render() {
        return (
            <section className="card__social-media">
                {socialMedia[this.state.show]}
                <div className="center next-container">
                    <button className="next__text" onClick={this.switchSocialMedia}>NEXT</button>
                </div>
            </section>
        );
    }
}

export default SocialMedia;
