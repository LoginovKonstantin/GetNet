import React, { Component } from 'react';
import { userInfo } from '../redux/actions';
import { connect } from 'react-redux';

class Orders extends Component {
  state = {
    orders: this.props.user.orders,
    email: this.props.user.email,
  }

  render() {
    const orders = (this.state.orders && this.state.orders.length > 0) ?
      (this.state.orders.map((el, i) => {
        const formattedTime = new Date(el.time).toISOString().slice(0, 19).replace('T', ' ');
        return (
          <div className='item' key={i}>
            <div className='time'>{formattedTime}</div>
            <div className='opName'>{el.operationName}</div>
            <div className='price-red'>- {el.price}</div>
          </div>
        )
      })) : []

    return (
      <div className="content-profile">
        <div className="content-orders">Orders</div>
        {orders}
      </div>
    );
  }
}

const mapState = state => { 
  return { user : state.userInfo } 
}
const mapDispatch = dispatch => {
  return {
    userInfo: (info) => dispatch(userInfo(info)),
  }
}

export default connect(
  mapState, 
  mapDispatch
)(Orders);

