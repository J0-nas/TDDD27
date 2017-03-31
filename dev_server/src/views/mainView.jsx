import React from 'react';
import ReactDOM from 'react-dom';

import NavBar from './NavBar.jsx';
import Content from './Content.jsx';
import Footer from './Footer.jsx';

export default class MainView extends React.Component {
  

  render() {
    console.log("tesjhbt");
    return  (<div id="MainView">
              <NavBar/>
              <Content/>
              <Footer/>
            </div>);
  }
}

//module.exports = MainView;
