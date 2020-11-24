import React from "react";
import bot from '../img/wave-bot.png';
import mid from '../img/wave-bot.png';
import top from '../img/wave-bot.png';

function BackGround() {
    let Background = bot;
    let Background2 = mid;
    let Background3 = top;

    return (

            <section className="waveWrapper waveAnimation">
                <div className="waveWrapperInner bgTop">
                    <div className="wave waveTop"
                         style={{backgroundImage: `url(${Background2})`}}/>
                </div>
                <div className=" waveWrapperInner bgMiddle">
                    <div className=" wave waveMiddle"
                         style={{backgroundImage: `url(${Background3})`}}/>
                </div>
                <div className=" waveWrapperInner bgBottom">
                    <div className=" wave waveBottom"
                         style={{backgroundImage: `url(${Background})`}}/>
                </div>
            </section>
    );
}

export default BackGround;
