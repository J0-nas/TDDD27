import React from 'react';
import ReactDOM from 'react-dom';

import MainView from './views/mainView'
require('style-loader!./css/style.css')

ReactDOM.render(

  <MainView/>,
  document.getElementById('app')
);

module.hot.accept();
