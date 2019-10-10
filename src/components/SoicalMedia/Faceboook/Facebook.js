import React from "react";
import {faFacebook} from "@fortawesome/free-brands-svg-icons/index";
import {faCircle} from "@fortawesome/free-solid-svg-icons/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";

const Facebook = (props) => (
    <section>
        <div className="card__social-media-header flex align--bottom flex-warp">
            <FontAwesomeIcon icon={faFacebook} className="color--twitter-blue"/>
            <h2 className="card__social-media-header">Facebook Feed</h2>
            <a href="http://www.kitmanyiu.com" className="color--blue social-media-link">#Kitman</a>
        </div>
        <div className="card__social-media-post">
            <div className="flex align--left align--center flex-warp">
                <FontAwesomeIcon icon={faCircle} className="profile-post color--light-blue"/>
                <p className="card__social-media-comment">dsfsdfdsf sdfsdfs fdg fdg dfgfdg dfg dfg dfg dfg dfg dg .</p>
            </div>
        </div>
        <div className="card__social-media-post">
            <div className="flex align--left align--center flex-warp">
                <FontAwesomeIcon icon={faCircle} className="profile-post color--light-blue"/>
                <p className="card__social-media-comment">vvbc fdfgs fdg fdg dfgfdg dfg dfg dfg dfg dfg dg .</p>
            </div>
        </div>
    </section>
);
export default Facebook;
