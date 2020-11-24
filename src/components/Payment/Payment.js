import React from "react";
import connect from "react-redux/es/connect/connect";
import StripeCheckout from 'react-stripe-checkout';
import {storePayment} from "../../api/payment";


const convertToStripePayment = amount => parseInt(parseInt(amount) + "00");
const CURRENCY = 'AUD';

const successPayment = (data) => {
    data();
};

const errorPayment = (data) => {
    data();
};
const onToken = (amount, description, success, failed, user_id) => token =>
    storePayment({
        description,
        user_id: user_id,
        source: token.id,
        currency: CURRENCY,
        amount: amount,
    }).then(() => {
        successPayment(success)
    }).catch(() => {
        errorPayment(failed)
    });

class Payment extends React.Component {
    render() {
        return (
            <div>
                <StripeCheckout
                    name={"WEATHS"}
                    description={""}
                    amount={convertToStripePayment(10)}
                    token={onToken(10, "as", function () {
                    }, function () {
                    }, this.props.userId)}
                    currency={CURRENCY}
                    stripeKey={'pk_test_V4hYfcXXV57TJlvhg0WISalx00bvZQy7GL'}
                    label="Pay with 💳"
                    image={''}
                    zipCode
                    email
                    allowRememberMe
                />
            </div>
        )
    };
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

export default connect(mapStateToProps, null)(Payment);
