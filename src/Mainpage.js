import React, {Component} from 'react';
import Navigation from './Navigation';
import Content from './Content';
import './mainpage.css';

class MainPage extends Component{

    render(){
        return(
            <div className = 'mainpage-container'>
                <Navigation />
                <Content />
            </div>

        );
    }

}

export default MainPage;