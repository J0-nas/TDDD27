import React from 'react';
import ReactDOM from 'react-dom';

import Page from './views/Page.jsx'

require('style-loader!./css/style.css')

ReactDOM.render(

  <Page/>,
  document.getElementById('app')
);

// module.hot.accept();
