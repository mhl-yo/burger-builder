import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index'

class Checkout extends Component {
    CheckoutCancelled = () => {
        this.props.history.goBack();
    };

    CheckoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to="/" />;

        if (this.props.ings) {
            const purchasedRiderect = this.props.purchased ? <Redirect to="/"/> : null;

            summary = (
                <div>
                    {purchasedRiderect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.CheckoutCancelled}
                        checkoutContinued={this.CheckoutContinued}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
                </div>
            )
        }

        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        purchased: state.orderReducer.purchased
    }
};

export default connect(mapStateToProps)(Checkout);
