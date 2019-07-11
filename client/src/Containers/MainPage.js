import React, { Component } from 'react';
import Profile from './Profile';
import Balance from './Balance';
import Orders from './Orders';

class MainPage extends Component {

  state = {
    page: 'default'
  }
  
  logout() {
    localStorage.clear();
    window.location.href = '/';
  }

  render() {
    const { page } = this.state;
    let content = <Profile />;
    if(page === 'orders') content = <Orders />;
    if(page === 'balance') content = <Balance />;

    return (
      <div className="MainPage">
        <div className='header'>
          <div onClick={() => this.setState({ page: 'profile' })}>Profile</div>
          <div onClick={() => this.setState({ page: 'orders' })}>Orders</div>
          <div onClick={() => this.setState({ page: 'balance' })}>Balance</div>
          <div onClick={() => this.logout()}>Exit</div>
        </div>
        {content}
      </div>
    );
  }
}

export default MainPage;
