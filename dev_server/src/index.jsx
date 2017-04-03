import React from 'react';
import ReactDOM from 'react-dom';

import MainView from './views/mainView'
require('style-loader!./css/style.css')
//var mainView = require('./views/mainView')
/*class mainView extends React.Component {
  render() {
    console.log("test");
    return <h2>Test234</h2>
  }
}*/

//console.log(MainView.class, "test");
console.log("res");

ReactDOM.render(

  <MainView text="Jonas"/>,
  document.getElementById('app')
);

//module.hot.accept();
