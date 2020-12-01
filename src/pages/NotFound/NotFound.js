import React from 'react';
import './NotFound.css';
import {Link} from "react-router-dom";

class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="not-found">
                <div className="cont_principal cont_error_active">
                    <div className="cont_error">
                        <h1>Oops</h1>
                        <p>The Page you're looking for isn't here.</p>
                        <Link to='/' ><button className="button--default">Return</button></Link>
                    </div>
                    <div className="cont_aura_1"></div>
                    <div className="cont_aura_2"></div>

                </div>
            </div>
        );
    }
}



export default NotFound;
