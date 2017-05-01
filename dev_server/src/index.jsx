import React from 'react';
import ReactDOM from 'react-dom';

import Page from './views/Page.jsx'

require('style-loader!./css/style.css')
var background = require('url-loader!./images/bg_1.jpg')

ReactDOM.render(

  <Page bg={background}/>,
  document.getElementById('app')
);

//module.hot.accept();
