import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrder();
    }

    render() {
        let orders = <Spinner/>;

        if (!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.map(order => (
                        <Order key={order.id}
                               ingredients={order.ingredients}
                               price={+order.price}/>
                    ))}
                </div>
            )
        }

        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: () => {
            dispatch(actions.fetchOrder())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
