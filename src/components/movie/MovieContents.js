import React, {Component} from 'react';
import "./MovieContents.css";

class MovieContents extends Component {
    render(){
        return(
            
            <div className="movie-contents">
                <img src="/img/movie.jpg" 
                style={{hight:'100%', width:'100%'}}/>
                MovieContents
            </div>
        );
    }
}
export default MovieContents;