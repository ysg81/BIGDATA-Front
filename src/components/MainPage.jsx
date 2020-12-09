import React, { useEffect, useState } from 'react';

import "./MainPage.css"
import MovieChart from '../MovieChart';
import { useDispatch } from 'react-redux';
import { getMoviePointExpect } from '../appAction';

const MainPage = props => {
  const dispatch = useDispatch()

  // 차트 테스트용 데이터 더미 데이터 호출
  useEffect(()=>{
    dispatch(getMoviePointExpect({data:'some-movie-info'}))
  },[])

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
      <input className='movie-input' onKeyDown={onKeyDown}/>
    </div>
    <style jsx>{`
      .container{
        height: 100vh;  
        width: auto;  
        max-width: 60rem;
        margin: 0 auto;
        padding: 5rem;
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

        border-radius: 20px;
        opacity:0.7;
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

      .movie-input {
        width: 80vw;
        height: 45px;
        max-width: 40rem;
        margin-top: 5rem;
        padding: 0 0.6rem;
        font-size: 1.5rem;

        background: #FFFFFF;
        -webkit-appearance: none;
        box-shadow: 0px 40px 30px rgba(0, 0, 0, 0.03), 0px 25px 20px rgba(0, 0, 0, 0.05), 0px 10px 15px rgba(0, 0, 0, 0.1), 0px 1px 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        border: none;
      }
      @media (max-width:  600px) {
        .movie-input {
          margin-top: 2rem;
        }
      }
    `}</style>
  </>)
}

export default MainPage;