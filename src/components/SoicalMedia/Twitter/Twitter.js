import React from "react";
import {faTwitter} from "@fortawesome/free-brands-svg-icons/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import axios from "axios";
import Loading from "../../Loading/Loading";
import {getTwitter} from "../../../api/twitterapi";


class Twitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: [],
            error: false,
            show: 0
        };
    }

    async componentDidMount() {
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json"
            }
        };

        let result = await getTwitter(this.props.searchKey);
        this.setState({data: result.data, isLoaded: true, error: false});
    }

    render() {
        return (
            <section>
                <div className="card__social-media-header flex align--bottom flex-warp">
                    <FontAwesomeIcon icon={faTwitter} className="color--twitter-blue"/>
                    <h2 className="card__social-media-header">Twiiter Feed</h2>
                    <a href="http://www.kitmanyiu.com" className="color--blue social-media-link">#{this.props.searchKey.replace(/ /g,'')}weather</a>
                </div>
                {!this.state.isLoaded ? <Loading/> :
                    this.state.data.statuses.slice(0, 2).map((status ,id) => {
                        return (
                            <div className="card__social-media-post" key={id}>
                                <div className="flex align--left align--center flex-warp">
                                    <img src={status.user.profile_image_url_https} alt="Avatar" className={"social-media-profile__img"}/>
                                    <p className="card__social-media-comment">{status.text}</p>
                                </div>
                            </div>
                        )
                    })}
            </section>
        );
    }
};


export default Twitter;
