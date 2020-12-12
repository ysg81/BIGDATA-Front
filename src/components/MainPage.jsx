import React from 'react';

import "./MainPage.css"
import MovieChart from '../MovieChart';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviePointExpect } from '../appAction';
import { matchDataWrap } from '../utils/dataWrap';
import { moviePointExpectSelector } from '../appReducer';

const MainPage = props => {
  const dispatch = useDispatch()

  const dataWrap = useSelector(moviePointExpectSelector);

  const isLoading = matchDataWrap({pending: () => true})(dataWrap) || false

  const onKeyDown = e => {
    if(e.key === 'Enter'){
      const title = e.target.value
      dispatch(getMoviePointExpect({title}))
    }
  }

  return (<>
    <div className="container">
      <div className="title" />
      <MovieChart className="chart" />
      <div className="input-wrapper">
        <input className='movie-input' onKeyDown={onKeyDown}/>
        <div className={`loading ${isLoading ? 'on' : ''}`} />
      </div>
    </div>
    <style jsx>{`
      .container{
        height: 100vh;  
        width: auto;  
        max-width: 60rem;
        margin: 0 auto;
        padding: 2rem;
        
        overflow:hidden;
        display:flex;
        flex-direction: column;
        align-items: center;
      }
      @media (max-width:  600px) {
        .container {
          padding: unset;
          margin: unset;
        }
      }

      .title{
        width:100%;
        height: 20rem;

        background-image: url(/img/movie.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
      @media (max-width:  600px) {
        .title {
          border-radius: unset;
        }
      }
      .chart{
        margin-top: 2rem;
        width:100%;
      }
      @media (max-width:  600px) {
        .chart {
          margin-top: 1.5rem;
        }
      }

      .input-wrapper{
        position: relative;
        margin-top: 5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .movie-input {
        width: 80vw;
        height: 45px;
        max-width: 40rem;
        padding: 0 0.6rem;
        font-size: 1.5rem;

        background: #FFFFFF;
        -webkit-appearance: none;
        box-shadow: 0px 40px 30px rgba(0, 0, 0, 0.03), 0px 25px 20px rgba(0, 0, 0, 0.05), 0px 10px 15px rgba(0, 0, 0, 0.1), 0px 1px 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        border: none;
      }
      @media (max-width:  600px) {
        .input-wrapper {
          margin-top: 2rem;
        }
      }
      .loading{
        position: absolute;
        right: 6px;
        width: 25px;
        height: 25px;
        margin: 0.5rem;
      }
      .loading.on {
        border-radius: 100%;
        border: 3px solid rgb(57, 72, 171);
        border-color: rgb(57, 72, 171) transparent rgb(57, 72, 171) transparent;
        animation: loading 1.5s linear infinite;
      }
      @keyframes loading {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      
      
    `}</style>
  </>)
}

export default MainPage;