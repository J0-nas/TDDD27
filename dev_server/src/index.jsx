import React from 'react';
import ReactDOM from 'react-dom';

import MainView from './views/mainView'

require('style-loader!./css/style.css')
var background = require('url-loader!./images/bg_1.jpg')

ReactDOM.render(

  <MainView bg={background}/>,
  document.getElementById('app')
);

module.hot.accept();
