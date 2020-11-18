import React from "react";
import Twitter from "./Twitter/Twitter";
import Facebook from "./Faceboook/Facebook";
import "./SocialMedia.css";



class SocialMedia extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: 0
        };
        this.socialMedia = [
            <Twitter searchKey={this.props.searchKey}/>,
            <Facebook searchKey={this.props.searchKey}/>
        ];
    }

    switchSocialMedia = () => {
        this.setState((prevState) => {
            return {show: prevState.show < this.socialMedia.length -1 ? prevState.show += 1 : 0}
        });
    };

    render() {


        return (
            <section className="card__social-media">
                {this.socialMedia[this.state.show]}
                <div className="center next-container">
                    <button className="next__text" onClick={this.switchSocialMedia}>NEXT</button>
                </div>
            </section>
        );
    }
}

export default SocialMedia;
