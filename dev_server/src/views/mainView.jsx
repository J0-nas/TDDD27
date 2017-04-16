import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Content from './Content.jsx';
import Footer from './Footer.jsx';

//var background = require('url-loader?mimetype=image/jpg!./../images/bg_2.jpg')

export default class MainView extends React.Component {


  render() {
    /*
    var s = {
      backgroundImage: 'url(' + background + ')',
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }
    console.log(background);
    //console.log(s, this.props.bg)
    console.log(background.split("\n").length)
    console.log("ds \n sdg".match(/'\n'/))
    */
    return  (
        <div id="MainView">
          <Header/>
    	  <Content/>
    	  <Footer/>  
        </div>
        );
    }
}
