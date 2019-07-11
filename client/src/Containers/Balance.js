import React, { Component } from 'react';
import { userInfo } from '../redux/actions';
import { connect } from 'react-redux';

class Balance extends Component {
  state = {
    balance: this.props.user.balance.history,
    email: this.props.user.email,
  }

  render() {
    let sum = 0;
    const balance = (this.state.balance && this.state.balance.length > 0) ?
      (this.state.balance.map((el, i) => {
        const formattedTime = new Date(el.time).toISOString().slice(0, 19).replace('T', ' ');
        const stylePrice = el.sum > 0 ? 'price-green' : 'price-red';
        sum += el.sum;
        return (
          <div className='item' key={i}>
            <div className='time'>{formattedTime}</div>
            <div className='opName'>{el.operationName}</div>
            <div className={stylePrice}>{el.sum}</div>
          </div>
        )
      })) : []

    return (
      <div className="content-profile">
        <div className="content-orders">Balance:  {sum}</div>
        {balance}
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
)(Balance);

