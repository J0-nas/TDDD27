import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Content from './Content.jsx';
import Footer from './Footer.jsx';

export default class MainView extends React.Component {


  render() {
    return  (
        <div id="MainView">
            <Header/>
            <Content/>
            <Footer/>
        </div>
        );
    }
}

//module.exports = MainView;
