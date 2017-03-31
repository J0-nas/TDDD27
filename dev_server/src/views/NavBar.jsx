import React from 'react';
import ReactDOM from 'react-dom';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
        <div className="container">
          <a>NavBar</a>
        </div>
      </nav>);
  }
}
