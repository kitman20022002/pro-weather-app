import React from "react";
import {faTwitter} from "@fortawesome/free-brands-svg-icons/index";
import {faCircle} from "@fortawesome/free-solid-svg-icons/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
const Twitter = (props) => (
    <section>
        <div className="card__social-media-header flex align--bottom flex-warp">
            <FontAwesomeIcon icon={faTwitter} className="color--twitter-blue"/>
            <h2 className="card__social-media-header">Twiiter Feed</h2>
            <a href="http://www.kitmanyiu.com" className="color--blue social-media-link">#Kitman</a>
        </div>
        <div className="card__social-media-post">
            <div className="flex align--left align--center flex-warp">
                <FontAwesomeIcon icon={faCircle} className="profile-post color--light-blue"/>
                <p className="card__social-media-comment">dfsdfdffdfdfsdf fdg fdg dfgfdg dfg dfg dfg dfg dfg dg .</p>
            </div>
        </div>
        <div className="card__social-media-post">
            <div className="flex align--left align--center flex-warp">
                <FontAwesomeIcon icon={faCircle} className="profile-post color--light-blue"/>
                <p className="card__social-media-comment">dfsdfdffdfdfsdf fdg fdg dfgfdg dfg dfg dfg dfg dfg dg .</p>
            </div>
        </div>
    </section>
);
export default Twitter;
