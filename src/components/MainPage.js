import React, {Component} from 'react';
import MovieContents from './movie/MovieContents';
import MovieMenu from './movie/MovieMenu';

import "./MainPage.css"

class MainPage extends Component {
    render(){
        return(
            <div className="main-page-template">
                <MovieMenu/>
                <div className="main-page-main">
                    <MovieContents/>
                </div>
            </div>
        );
    }
}

export default MainPage;